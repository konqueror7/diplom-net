class Admin {

  static init() {
    this.element = document.querySelector( '.conf-steps' );
    this.initUser();
    this.initModals();
    this.initForms();
    this.initWidgets();

  }

  static initUser() {
    User.fetch({}, (err, response) => {
      this.setState( User.current() ? 'user-logged' : 'init' )
    });
  }

  static initModals() {
    this.modals = {
      add_hall: new Modal(document.querySelector('#modal-add-hall')),
      delete_hall: new Modal(document.querySelector('#modal-delete-hall')),
      add_movie: new Modal(document.querySelector('#modal-movie-add')),
      add_showtime: new Modal(document.querySelector('#modal-showtime-add')),
      delete_showtime: new Modal(document.querySelector('#modal-showtime-delete'))
    };
  }

  static initForms() {
    this.forms = {
      add_hall: new HallAddForm(document.querySelector('#add-hall-form')),
      config_hall: new HallConfigForm(document.querySelector('#config-hall-form')),
      delete_hall: new HallDeleteForm(document.querySelector('#delete-hall-form')),
      config_price: new PriceConfigForm(document.querySelector('#config-price-form')),
      add_movie: new MovieAddForm(document.querySelector('#add-movie-form')),
      add_showtime: new ShowtimeAddForm(document.querySelector('#add-showtime-form')),
      add_sessions: new SessionsAddForm(document.querySelector('#add-sessions-form')),
      delete_sessions: new SessionsDeleteForm(document.querySelector('#delete-sessions-form')),
      logout: new LogoutForm(document.querySelector('#logout-form'))
    };
  }

  static initWidgets() {
    this.widgets = {
      halls: new HallsWidget(document.querySelector('#halls')),
      hall_config: new HallConfigWidget(document.querySelector('#hall-config')),
      price_config: new PriceConfigWidget(document.querySelector('#price-config')),
      sessions_grid_config: new SessionsGridWidget(document.querySelector('#sessions-grid-config'))
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
    this.updateForms();
  }

  static updateWidgets() {
    this.getWidget( 'halls' ).update();
    this.getWidget( 'hall_config' ).update();
    this.getWidget( 'price_config' ).update();
    this.getWidget( 'sessions_grid_config' ).update();
  }

  static updateForms() {
    this.getForm( 'add_showtime' ).update();
  }

  static setState( state ) {
    if (this.state) {
      this.element.classList.remove( `app_${this.state}` );
    }
    this.element.classList.add( `app_${state}` );
    this.state = state;

    if ( state === 'user-logged' ) {
      this.update();
    }
    if ( state === 'init' ) {
      this.clear();
      document.location.href = Entity.HOST + '/client';
    }
  }

  static clear() {
    this.element.innerHTML = '';
  }

}
