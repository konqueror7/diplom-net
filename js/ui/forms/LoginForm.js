/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   *
   *
   * */
  onSubmit( options ) {
    User.login(options.data, (err, response) => {
      if (response && response.success === true) {
        console.log(response.user['role']);
        this.element.reset();
        if (response.user) {
          document.location.href = Entity.HOST + '/admin';
          // document.location.href = AsyncForm.HOST + '/admin';
          // document.location.href = 'http://diplom-net/admin';
        }

        // if (response.user['role'] === 'admin') {
        //   document.location.href = 'http://diplom-net/admin';
        // }

        // } else if (response.user['role'] === 'user') {
        //   document.location.href = 'http://diplom-net/client';
        // }
      } else {
        document.location.href = Entity.HOST + '/client';
        // document.location.href = AsyncForm.HOST + '/client';
        // document.location.href = 'http://diplom-net/client';
      }
    });
  }
}
