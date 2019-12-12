class PaymentForm extends AsyncForm {

  getData() {
    const data = {};
    const ticketData = JSON.parse(localStorage.getItem('ticket_data'));
    data.qrcode =  `Фильм: ${ticketData.film} | Зал: ${ticketData.hall} | Места: ${ticketData.placesText} | Начало ${ticketData.start_time} | Цена: ${ticketData.cost} рублей`;
    return data;
  }

  onSubmit(options) {
    Ticket.update(localStorage.getItem('ticket_guid'), options.data, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      document.location.href = Entity.HOST + '/client/ticket.html';
    });
  }
}
