/**
 * Класс User управляет авторизацией и
 * пользователя для входа и совершения действий на странице admin
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user.php'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.getItem('user'));
    }
    else {
      return;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    const xhr = createRequest({
      url: this.HOST + this.URL,
      data: Object.assign({ user_method: 'FETCH' }, data),
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success === true && response.user) {
          console.log(response);
          this.setCurrent(response.user);
        } else if (response && response.success === false && !response.user) {
          console.log(response);
          this.unsetCurrent();
        }
        callback.call(this, err, response);
      }
    });
    return xhr;
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    const xhr = createRequest({
      url: this.HOST + this.URL,
      data: Object.assign({ user_method: 'LOGIN' }, data),
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success === true && response.user) {
          this.setCurrent(response.user);
        } else if (response && response.success === false && response.user === null) {
          console.log(response);
        }
        callback.call(this, err, response);
      }
    });
    return xhr;
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    const xhr = createRequest({
      url: this.HOST + this.URL,
      data: Object.assign({ user_method: 'REGISTER' }, data),
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success === true && response.user) {
          this.setCurrent(response.user);
        } else if (response && response.success === false && response.error) {
          console.log(response);
        }
        callback.call(this, err, response);
      }
    });
    return xhr;
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    const xhr = createRequest({
      url: this.HOST + this.URL,
      data: Object.assign({ user_method: 'LOGOUT' }, data),
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success === true && response.user === undefined) {
          this.unsetCurrent();
        }
        callback.call(this, err, response);
      }
    });
    return xhr;
  }
}

User.URL = '/php/user.php';
User.HOST = Entity.HOST;
