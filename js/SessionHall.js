/**
 * Класс SessionHall инициализирует DOM-узел, имеющий
 * css-селектор '.buying' на странице 'client/hall.html'
 */
class SessionHall {

  /**
   * Определяет DOM-узел, в котором будут
   * производиться изменения и применяет
   * методы инициализации для виджета выбора места
   * в кинозале и формы бронирования билета
   */
  static init() {
    this.element = document.querySelector( '.buying' );
    this.initWidgets();
    this.initForms();
  }

  /**
   * Инициализация объекта this.widgets,
   * содержащего в качестве свойства экземпляр
   * класса BuyingWidget, который управляет отображением
   * и выбором мест в кинозале
   */
  static initWidgets() {
    this.widgets = {
      buying_place: new BuyingWidget(this.element)
    }
  }

  /**
   * Инициализация объекта this.forms,
   * содержащего в качестве свойства экземпляр
   * класса BuyingForm (дочернего от AsyncForm),
   * который создает билет на сеанс и сохраняет в него
   * забронированные клиентом места
   */
  static initForms() {
    this.forms = {
      buying_form: new BuyingForm(this.element.querySelector('#buying-form'))
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
