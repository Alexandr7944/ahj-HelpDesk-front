class Modal {
  constructor() {
    this.modal = null;
  }

  getModal({ type, title, name = "", description = "" }) {
    this.modal = document.createElement("div");
    this.modal.className = "modal";
    this.modal.innerHTML =
      type === "delete"
        ? this.deleteTicket(title)
        : this.addChangeTicket(title, name, description);

    document.body.appendChild(this.modal);

    this.modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal__btn-reset")) {
        return this.modal.remove();
      }
    });

    return document.forms[0];
  }

  addChangeTicket(title, name, description) {
    return `
      <form class="modal__form name="form">
        <h3 class="modal__title">${title}</h3>
        <label class="modal__row">
          <span class="modal__text">Краткое описание</span>
          <input name="name" type="text" class="modal__input" value="${name}">
        </label>
        <label class="modal__row">
          <span class="modal__text">Полное описание</span>
          <textarea name="description" class="modal__input">${description}</textarea>
        </label>
        <div class="modal__row modal__row-btn">
          <input class="modal__btn modal__btn-reset" type="reset" value="Отмена">
          <input class="modal__btn modal__btn-submit" type="submit" value="Ok">
        </div>
      </form>
    `;
  }

  deleteTicket(title) {
    return `
      <form class="modal__form name="form">
        <h3 class="modal__title">${title}</h3>
        <div class="modal__row">
          Вы уверены, что хотите удалить тикет? Это действие необратимо.
        </div>
        <div class="modal__row modal__row-btn">
          <input class="modal__btn modal__btn-reset" type="reset" value="Отмена">
          <input class="modal__btn modal__btn-submit" type="submit" value="Ok">
        </div>
      </form>
    `;
  }
}

export default Modal;
