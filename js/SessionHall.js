class SessionHall {

  static init() {
    this.element = document.querySelector( '.buying' );
    // console.log(this.element);
    this.initWidgets();
    this.initForms();
  }

  static initWidgets() {
    this.widgets = {
      buying_place: new BuyingWidget(this.element)
    }
  }

  static initForms() {
    this.forms = {
      buying_form: new BuyingForm(document.querySelector('#buying-form'))
    }
  }

}
