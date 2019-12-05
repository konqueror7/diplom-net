class SessionsAddForm extends AsyncForm {

  getData() {
    // let formData = new FormData(this.element);
    const sessionsArray = Array.from(document.getElementsByClassName('conf-step__seances-movie'));
    let data = [];
    for (let session in sessionsArray) {
      let sessionData = {};
      // console.log(sessionsArray[session].closest('.conf-step__seances-hall').dataset.id);
      // console.log(sessionsArray[session].dataset.id);
      if (!sessionsArray[session].dataset.sessionId) {
        sessionData.hall_id = sessionsArray[session].closest('.conf-step__seances-hall').dataset.id;
        sessionData.film_id = sessionsArray[session].dataset.id;
        sessionData.start_time = sessionsArray[session].querySelector('.conf-step__seances-movie-start').innerText;
        data.push(sessionData);
      }
    }

    console.log(data);

    return data;
    // console.log(formData.get('attention'));
  }

  onSubmit(options) {
    for (var index in options.data) {
      console.log(options.data[index]);
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
