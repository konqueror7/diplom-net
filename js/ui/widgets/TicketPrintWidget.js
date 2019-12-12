class TicketPrintWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {

  }

  update() {
    const ticketData = JSON.parse(localStorage.getItem('ticket_data'));
    const ticketTitle = this.element.querySelector('.ticket__title').innerText = ticketData.film;
    const ticketChairs = this.element.querySelector('.ticket__chairs').innerText = ticketData.placesText;
    const ticketHall = this.element.querySelector('.ticket__hall').innerText = ticketData.hall;
    const ticketStart = this.element.querySelector('.ticket__start').innerText = ticketData.start_time;
    const ticketInfoQr = this.element.querySelector('.ticket__info-qr');
    const ticketGuid = localStorage.getItem('ticket_guid');
    Ticket.get(ticketGuid, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      ticketInfoQr.src = `/qrpng/${response.ticket.qrcode}`;
    });

  }
}
