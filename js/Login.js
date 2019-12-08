class Login {
  static init() {
    this.element = document.querySelector( '.login' );
    this.initForms();
  }

  static initForms() {
    this.forms = {
      login: new LoginForm(document.querySelector('.login__form'))
    };
  }
}
