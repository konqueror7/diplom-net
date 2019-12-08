class TicketPrint {

  static init() {
    this.element = document.querySelector( '.ticket' );
    // console.log(this.element);
    // console.log(localStorage.getItem('ticket_guid'));
    this.initWidgets();
  }

  static initWidgets() {
    this.widgets = {
      ticket_print: new TicketPrintWidget(document.querySelector('.ticket__info-wrapper'))
    }
  }
}
