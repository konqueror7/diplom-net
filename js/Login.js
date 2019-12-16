/**
 * Класс Login инициализирует DOM-узел, имеющий
 * css-селектор '.login' на странице 'client/login.html'
 */
class Login {
  /**
   * Определяет DOM-узел, в котором будут
   * производиться изменения и применяет метод
   * инициализирующий объект в свойстве this.forms
   */
  static init() {
    this.element = document.querySelector( '.login' );
    this.initForms();
  }

  /**
   * Метод инициализирует объект this.forms
   * и создает в нем свойство содержащее экземпляр
   * класса LoginForm (дочернего классу AsyncForm)
   * который обрабатывает события на html-форме входа
   * на страницу 'admin/index.html'
   */
  static initForms() {
    this.forms = {
      login: new LoginForm(this.element.querySelector('.login__form'))
    };
  }
}
