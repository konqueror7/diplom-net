class LogoutForm extends AsyncForm{
  /**
   * Инициирует объект FormData который
   * перехватывает значение полей формы 'logout-form'
   * в него добавляется свойство 'active: true'
   * этот объект преобразуется в объект data
   * @return {Object} - объект data состоит из одного свойства,
   * указанного выше
   */
  getData() {
    let formData = new FormData(this.element);
    formData.append('active', true);
    let entries = formData.entries();
    const data = {};
    for (let item of entries) {
      data[`${item[0]}`] = `${item[1]}`;
    }
    console.log(data);
    return data;
  }

  /**
   * Метод изменяет значение свойства 'active' в объектах залов на 'true',
   * получая ключи нужных объектов из элемента localStorage.inactive_halls_keys
   * @param  {Object} options - содержит настройки запроса и данные для передачи
   *
   */
  onSubmit(options) {
    /**
     * Получение массива ключей для активации залов из localStorage.inactive_halls_keys
     */
    const inactiveHallsKeys = JSON.parse(localStorage.inactive_halls_keys);
    /**
     * Для каждого объекта указанного в inactiveHallsKeys
     * производится изменение свойства 'active' на 'true'
     */
    for (let key in inactiveHallsKeys) {
      Hall.update(inactiveHallsKeys[key], options.data, (err, response) => {
        if (err || !response.success) {
          return undefined;
        }
        console.log(response);
      });
    }
    /**
     * Изменение надписи на нопке формы 'logout-form'
     */
    const logoutButton = document.querySelector('#logout .conf-step__button-accent');
    logoutButton.innerText = 'Приостановить продажу билетов';

    /**
     * Предложение пользователю уйти со страницы admin
     * @type {Boolean}
     */
    let isLogout = confirm('Завершить работу на странице администрирования');

    if (isLogout) {
      /**
       * В случае соглашения завершение php-сессии с удалением данных пользователя
       */
      User.logout(options.data, (err, response) => {
        if (err || !response.success) {
          return undefined;
        }
        User.unsetCurrent();
        document.location.href = Entity.HOST + '/client';
      });
    } else {
      /**
       * Иначе обновление страницы 'admin'
       */
      Admin.update();
    }
  }
}
