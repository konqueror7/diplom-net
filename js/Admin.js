/**
 * Класс Admin инициализирует на странице 'admin/index.html'
 * DOM-узел имеющий css-селектор '.conf-steps'
 * предоставляет методы, которые инициализируют объекты,
 * свойствами которого являются экземпляры классов,
 * необходимых для модальных окон, форм и виджетов
 *
 */
class Admin {

  /**
   * Конструктор класса Admin вызывает методы
   * инициализирующий объекты модальных окон,
   * форм и виджетов а также проверяет открыл ли
   * пользователь сессию на сервере с учетной записью,
   * имеющей роль 'admin'
   */
  static init() {
    this.element = document.querySelector( '.conf-steps' );
    this.initUser();
    this.initModals();
    this.initForms();
    this.initWidgets();

  }

  /**
   * Проверка открытия пользователем сессии на сервере
   * и установка состояния 'user-logged' в случае наличия
   * авторизованного пользователя, иначе устанавливается
   * состояние 'init'
   */
  static initUser() {
    User.fetch({}, (err, response) => {
      this.setState( User.current() ? 'user-logged' : 'init' )
    });
  }

  /**
   * Создание объекта modals, содержащего в качестве свойств
   * экземпляры класса Modal для всех модальных окон на странице
   */
  static initModals() {
    this.modals = {
      add_hall: new Modal(document.querySelector('#modal-add-hall')),
      delete_hall: new Modal(document.querySelector('#modal-delete-hall')),
      add_movie: new Modal(document.querySelector('#modal-movie-add')),
      add_showtime: new Modal(document.querySelector('#modal-showtime-add')),
      delete_showtime: new Modal(document.querySelector('#modal-showtime-delete'))
    };
  }

  /**
   * Создание объекта forms, содержащего в качестве свойств
   * экземпляры дочерних классов класса AsyncForm для всех форм на странице
   */
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

  /**
   * Создание объекта widgets, содержащего в качестве свойств
   * экземпляры классов виджетов на странице
   */
  static initWidgets() {
    this.widgets = {
      halls: new HallsWidget(document.querySelector('#halls')),
      hall_config: new HallConfigWidget(document.querySelector('#hall-config')),
      price_config: new PriceConfigWidget(document.querySelector('#price-config')),
      sessions_grid_config: new SessionsGridWidget(document.querySelector('#sessions-grid-config'))
    };
  }

  /**
   * Возвращает из объекта modals в качестве
   * значения свойства экземпляр класса
   * для модального окна
   * @param  {String} modalName - название свойства
   * @return {Object}
   */
  static getModal( modalName ) {
    return this.modals[ modalName ];
  }

  /**
   * Возвращает из объекта forms в качестве
   * значения свойства экземпляр класса для формы
   * @param  {String} formName - название свойства
   * @return {Object}
   */
  static getForm( formName ) {
    return this.forms[ formName ];
  }

  /**
   * Возвращает из объекта widgets в качестве
   * значения свойства экземпляр класса для виджета,
   * @param  {String} widgetName - название свойства
   * @return {Object}
   */
  static getWidget( widgetName ) {
    return this.widgets[ widgetName ];
  }

  /**
   * Обновление всего содержимого страницы 'admin/index.html'
   */
  static update() {
    this.updateWidgets();
    this.updateForms();
  }

  /**
   * Обновление виджетов
   */
  static updateWidgets() {
    this.getWidget( 'halls' ).update();
    this.getWidget( 'hall_config' ).update();
    this.getWidget( 'price_config' ).update();
    this.getWidget( 'sessions_grid_config' ).update();
  }

  /**
   * Обновление форм
   */
  static updateForms() {
    this.getForm( 'add_showtime' ).update();
  }

  /**
   * Изменение видимости элемента с css-селектором
   * '.conf-steps' в случае авторизации путем добавления класса
   * 'app_user-logged' и обновление содержимого
   * в противном случае - 'app_init', удаление содержимого
   * и переход на страницу 'client/index.html'
   *
   * @param {[type]} state [description]
   */
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

  /**
   * Стирание HTML-содержимого элемента с css-селектором '.conf-steps'
   * @return {[type]} [description]
   */
  static clear() {
    this.element.innerHTML = '';
  }

}
