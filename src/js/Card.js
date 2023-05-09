import Fetching from "./Fetching";
import Modal from "./Modal";

class Card {
  constructor(card, container) {
    this.card = card;
    this.cardEl = null;
    this.container = container;
    this.modal = new Modal();

    this.handlerListener = this.handlerListener.bind(this);
    this.getDescription = this.getDescription.bind(this);
  }

  async addCard() {
    this.card = await Fetching.createTicket(this.card);
    this.getCard();
  }

  getCard() {
    this.cardEl = document.createElement("div");
    this.cardEl.className = "helpdesk__item-wrapper";
    this.cardEl.innerHTML = `
      <div class="helpdesk__item">
        <button class="helpdesk__execution">
          ${this.card.status ? "&#10004;" : ""}
        </button>
        <span class="helpdesk__text">
          ${this.card.name}
        </span>
        <span class="helpdesk__date">
          ${new Date(+this.card.created).toLocaleString("ru-RU", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
        <button class="helpdesk__edit">&#9998;</button>
        <button class="helpdesk__delete">&#10006;</button>
      </div>
      <div class="helpdesk__description hidden">
        ${this.card.description || ""}
      </div>
    `;

    this.container.appendChild(this.cardEl);
    this.cardEl.addEventListener("click", this.handlerListener);
  }

  handlerListener(event) {
    const executionEvent = event.target.classList.contains(
      "helpdesk__execution"
    );
    const editEvent = event.target.classList.contains("helpdesk__edit");
    const deleteEvent = event.target.classList.contains("helpdesk__delete");

    if (executionEvent) return this.changeStatus();
    if (editEvent) return this.changeCard();
    if (deleteEvent) return this.deleteCard();
    return this.getDescription();
  }

  async getDescription() {
    const description = this.cardEl.querySelector(".helpdesk__description");
    description.classList.toggle("hidden");

    if (!this.card.description) {
      this.card = await Fetching.getTicket(this.card.id);
      description.innerText = this.card.description || "Добавьте описание";
      return;
    }
  }

  changeStatus() {
    this.card.status = !this.card.status;
    Fetching.changeTicket(this.card);
    this.cardEl.querySelector(".helpdesk__execution").innerHTML = `${
      this.card.status ? "&#10004;" : ""
    }`;
  }

  changeCard() {
    const form = this.modal.getModal({
      type: "change",
      title: "Изменить тикет",
      name: this.card.name,
      description: this.card.description,
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.card = {
        ...this.card,
        created: Date.now() + "",
        name: event.target.name.value,
        description: event.target.description.value,
      };

      this.cardEl.querySelector(".helpdesk__text").textContent = this.card.name;
      this.cardEl.querySelector(".helpdesk__description").textContent =
        this.card.description;
      form.parentElement.remove();

      Fetching.changeTicket(this.card);
    });
  }

  deleteCard() {
    const form = this.modal.getModal({
      type: "delete",
      title: "Удалить тикет",
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      form.parentElement.remove();
      this.cardEl.remove();
      Fetching.deleteTicket(this.card);
    });
  }
}

export default Card;
