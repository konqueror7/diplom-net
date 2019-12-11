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

  static getForm( formName ) {
    return this.forms[ formName ];
  }
  
  static getWidget( widgetName ) {
    return this.widgets[ widgetName ];
  }

  static update() {
    this.updateWidgets();
  }

  static updateWidgets() {
    this.getWidget( 'buying_place' ).update();
  }

}
