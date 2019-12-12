class SessionsAddForm extends AsyncForm {

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

  onSubmit(options) {
    for (var index in options.data) {
      Session.create(options.data[index], (err, response) => {
        if (response && response.success === true) {
          console.log(response);
        }
      });
    }
    this.element.reset();
    Admin.update();
  }

}
