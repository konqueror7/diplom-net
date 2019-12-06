class Payment {

  static init() {
    this.element = document.querySelector( '.ticket' );
    // console.log(this.element);
    this.initWidgets();
    this.initForms();
  }

  static initWidgets() {
    this.widgets = {
      payment_ticket: new PaymentWidget(document.querySelector('.ticket__info-wrapper'))
    }
  }

  static initForms() {
    this.forms = {
      payment_form: new PaymentForm(document.querySelector('#payment-form'))
    }
  }

  static getWidget( widgetName ) {
    return this.widgets[ widgetName ];
  }

  static update() {
    this.updateWidgets();
  }

  static updateWidgets() {
    this.getWidget( 'payment_ticket' ).update();
  }

}
