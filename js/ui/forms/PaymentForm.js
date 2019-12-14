/**
 * Обслуживает форму с css-селектором '#payment-form'
 * на странице payment
 * @extends AsyncForm
 */
class PaymentForm extends AsyncForm {
  /**
   * Из записи 'ticket_data' в localStorage извлекает данные о сеансе
   * формирует текст, на основе которого будет сгенерирован QR-код билета
   */
  getData() {
    const data = {};
    const ticketData = JSON.parse(localStorage.getItem('ticket_data'));
    data.qrcode =  `Фильм: ${ticketData.film} | Зал: ${ticketData.hall} | Места: ${ticketData.placesText} | Начало ${ticketData.start_time} | Цена: ${ticketData.cost} рублей`;
    return data;
  }
  /**
   * Делает запрос на обновление записи о сеансе по его id и передает данные
   * для QR-кода
   */
  onSubmit(options) {
    Ticket.update(localStorage.getItem('ticket_guid'), options.data, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      document.location.href = Entity.HOST + '/client/ticket.html';
    });
  }
}
