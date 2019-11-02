class Admin {

  static init() {
    this.element = document.querySelector( '.conf-steps' );
    // this.initPages();
    this.initModals();
    this.initForms();
    this.initWidgets();
    // this.initUser();

  }

  static initUser() {

  }

  // static initPages() {
  //
  // }



  static initModals() {
    this.modals = {
      add_hall: new Modal(document.querySelector('#modal-add-hall')),
      delete_hall: new Modal(document.querySelector('#modal-delete-hall'))
    };
  }

  static initForms() {
    this.forms = {
      add_hall: new HallAddForm(document.querySelector('#add-hall-form')),
      config_hall: new HallConfigForm(document.querySelector('#config-hall-form'))
      // add_hall: new HallAddForm(document.querySelector('#add-hall-form')),
      // delete_hall: new HallDeleteForm(document.querySelector('#delete-hall-form'))
    };
  }

  static initWidgets() {
    this.widgets = {
      // halls: new HallsWidget(document.querySelector('.conf-step__list'))
      halls: new HallsWidget(document.querySelector('#halls')),
      hall_config: new HallConfigWidget(document.querySelector('#hall-config'))
    };
  }

  static getModal( modalName ) {
    return this.modals[ modalName ];
  }

  static getForm( formName ) {
    return this.forms[ formName ];
  }

  static getWidget( widgetName ) {
    return this.widgets[ widgetName ];
  }

  static update() {
    this.updateWidgets();
    // this.updatePages();
    // this.updateForms();
  }

  static updateWidgets() {
    this.getWidget( 'halls' ).update();
    this.getWidget( 'hall_config' ).update();
  }

  // static updateForms() {
    // this.getForm( 'createIncome' ).update();
    // this.getForm( 'createExpense' ).update();
  // }

}
