class TicketPrintWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    console.log(this.element);
    // console.log(localStorage.getItem('session_id'));
    this.registerEvents();
    this.update();
  }

  registerEvents() {

  }

  update() {
    const ticketData = JSON.parse(localStorage.getItem('ticket_data'));
    // console.log(ticketData);

    const ticketTitle = this.element.querySelector('.ticket__title').innerText = ticketData.film;
    const ticketChairs = this.element.querySelector('.ticket__chairs').innerText = ticketData.placesText;
    const ticketHall = this.element.querySelector('.ticket__hall').innerText = ticketData.hall;
    const ticketStart = this.element.querySelector('.ticket__start').innerText = ticketData.start_time;
    // const ticketCost = this.element.querySelector('.ticket__cost').innerText = ticketData.cost;

    const ticketInfoQr = this.element.querySelector('.ticket__info-qr');
    // console.log(ticketInfoQr.src);
    const ticketGuid = localStorage.getItem('ticket_guid');
    // console.log(ticketGuid);
    Ticket.get(ticketGuid, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      console.log(response);
      ticketInfoQr.src = `/qrpng/${response.ticket.qrcode}`;
    });

  }
}
