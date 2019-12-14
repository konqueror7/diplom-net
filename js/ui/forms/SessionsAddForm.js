/**
 * Обслуживает форму с css-селектором '#add-sessions-form'
 * сохраняющую сетку сеансов в файл 'sessions.json'
 * @extends AsyncForm
 */
class SessionsAddForm extends AsyncForm {

  /**
   * Сохраняет и возвращает в объекте data информацию о сеансах по залам
   * @return {[type]} [description]
   */
  getData() {
    const sessionsArray = Array.from(document.getElementsByClassName('conf-step__seances-movie'));
    let data = [];
    for (let session in sessionsArray) {
      let sessionData = {};
      if (!sessionsArray[session].dataset.sessionId) {
        sessionData.hall_id = sessionsArray[session].closest('.conf-step__seances-hall').dataset.id;
        sessionData.film_id = sessionsArray[session].dataset.id;
        sessionData.start_time = sessionsArray[session].querySelector('.conf-step__seances-movie-start').innerText;
        data.push(sessionData);
      }
    }
    return data;
  }

  /**
   *   Сохраняет каждый из сеансов в виде записи в sessions.json,
   *   обновляет содержимое виджета 'Сетка сеансов' на странице 'admin'.
   */
  onSubmit(options) {
    for (let index in options.data) {
      Session.create(options.data[index], (err, response) => {
        if (response && response.success === true) {
          console.log(response);
        }
      });
    }
    this.element.reset();
    Admin.getWidget('sessions_grid_config').updateConfStepSeances();
  }

}
