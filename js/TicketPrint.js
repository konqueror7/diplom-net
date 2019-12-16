/**
 * Класс SessionHall инициализирует DOM-узел, имеющий
 * css-селектор '.ticket' на странице 'client/ticket.html'
 */
class TicketPrint {
  /**
   * Метод init() Определяет DOM-узел, в котором будут производиться изменения и применяет
   * методы инициализации для виджета, выводящего QR-код билета
   */
  static init() {
    this.element = document.querySelector( '.ticket' );
    this.initWidgets();
  }

  /**
   * Инициализация объекта this.widgets, содержащего в качестве свойства экземпляр
   * класса TicketPrintWidget, который управляет выводом содержимого билета
   * и его QR-кода
   */
  static initWidgets() {
    this.widgets = {
      ticket_print: new TicketPrintWidget(this.element.querySelector('.ticket__info-wrapper'))
    }
  }
}
