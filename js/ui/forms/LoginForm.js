/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * и совершает переход на страницу 'admin'
   * при неудаче - на страницу 'client'
   * */
  onSubmit( options ) {
    User.login(options.data, (err, response) => {
      if (response && response.success === true) {
        console.log(response.user['role']);
        this.element.reset();
        if (response.user) {
          document.location.href = Entity.HOST + '/admin';
        }

      } else {
        document.location.href = Entity.HOST + '/client';
      }
    });
  }
}
