class TicketPrint {

  static init() {
    this.element = document.querySelector( '.ticket' );
    this.initWidgets();
  }

  static initWidgets() {
    this.widgets = {
      ticket_print: new TicketPrintWidget(document.querySelector('.ticket__info-wrapper'))
    }
  }
}
