import Card from "./Card";
import Fetching from "./Fetching";
import Modal from "./Modal";

const container = document.querySelector('.helpdesk__list');
const addTicketBtn = document.querySelector('.helpdesk__add-ticket');

Fetching.getAllTickets()
  .then((tickets) => {
    tickets.map((ticket) => 
      new Card(ticket, container).getCard()
    );
  });

addTicketBtn.addEventListener('click', () => {
  const form = new Modal().getModal({
    type: 'add',
    title: 'Добавить тикет',
    name: '',
    description: '',
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    new Card({
      name: event.target.name.value,
      description: event.target.description.value
    }, container)
    .addCard();
    form.parentElement.remove();
  })
})