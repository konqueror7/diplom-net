/**
 * Класс Payment инициализирует DOM-узел, имеющий
 * css-селектор '.ticket' на странице 'client/payment.html'
 */
class Payment {
  /**
   * Определяет DOM-узел, в котором будут
   * производиться изменения и применяет
   * методы инициализации для виджета просмотра
   * содержимого билета на киносеанс
   * и формы получения QR-кода бронирования
   */
  static init() {
    this.element = document.querySelector( '.ticket' );
    this.initWidgets();
    this.initForms();
  }

  /**
   * Инициализация объекта this.widgets,
   * содержащий в качестве свойства экземпляр
   * класса PaymentWidget, который отображает
   * информацию о билете в DOM-узле с css-селектором
   * '.ticket__info-wrapper'
   */
  static initWidgets() {
    this.widgets = {
      payment_ticket: new PaymentWidget(document.querySelector('.ticket__info-wrapper'))
    }
  }

  /**
   * Инициализация объекта this.widgets,
   * выполняющего обработку и отправку данных
   * из html-формы с css-селектором '#payment-form'
   */
  static initForms() {
    this.forms = {
      payment_form: new PaymentForm(document.querySelector('#payment-form'))
    }
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
   * Обновление всего содержимого страницы 'client/payment.html'
   */
  static update() {
    this.updateWidgets();
  }

  /**
   * Обновление виджетов
   */
  static updateWidgets() {
    this.getWidget( 'payment_ticket' ).update();
  }

}
