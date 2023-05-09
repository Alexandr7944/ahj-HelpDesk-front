class Fetching {
  static async getAllTickets() {
    try {
      const response = await fetch(`http://localhost:7071/?method=allTickets`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  static async getTicket(id) {
    const response = await fetch(
      `http://localhost:7071/?method=ticketById&id=${id}`
    );
    const json = await response.json();
    return json[0];
  }

  static async createTicket(card) {
    const body = JSON.stringify(card);
    const response = await fetch(
      `http://localhost:7071/?method=createTicket`, {
        body,
        method: 'POST'
      }
    );
    const json = await response.json();
    return json;
  }

  static async changeTicket(card) {
    const body = JSON.stringify(card);
    const response = await fetch(
      `http://localhost:7071/?id=${card.id}`, {
        body,
        method: 'PUT'
      }
    );
    const json = await response.json();
    return json;
  }

  static async deleteTicket({ id }) {
    const body = JSON.stringify(id);
    const response = await fetch(
      `http://localhost:7071/?method=deleteTicket`, {
        body,
        method: 'POST'
      }
    );
    const json = await response.json();
    return json;
  }
}

export default Fetching;
