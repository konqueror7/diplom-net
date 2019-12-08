class PaymentForm extends AsyncForm {

  getData() {
    const data = {};
    const ticketData = JSON.parse(localStorage.getItem('ticket_data'));
    data.qrcode =  `Фильм: ${ticketData.film} | Зал: ${ticketData.hall} | Места: ${ticketData.placesText} | Начало ${ticketData.start_time} | Цена: ${ticketData.cost} рублей`;
    // data.qrtext =  `Фильм: ${ticketData.film} | Зал: ${ticketData.hall} | Места: ${ticketData.placesText} | Начало ${ticketData.start_time} | Цена: ${ticketData.cost} рублей`;
    // console.log(localStorage.getItem('ticket_guid'));
    // console.log(data);
    return data;
  }

  onSubmit(options) {
    Ticket.update(localStorage.getItem('ticket_guid'), options.data, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      // localStorage.setItem('qrpng', response.qrpng);
      console.log(JSON.parse(localStorage.getItem('ticket_data')));
      console.log(localStorage.getItem('ticket_guid'));
      // console.log(localStorage.getItem('qrpng'));
      document.location.href = Entity.HOST + '/client/ticket.html';
      // document.location.href = 'http://diplom-net/client/ticket';
    });
  }
}
