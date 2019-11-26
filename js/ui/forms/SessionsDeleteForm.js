class SessionsDeleteForm extends AsyncForm {
  constructor( element ) {
    super(element);
    this.target;
  }

  renderFilmName(target) {
    const deletableSessionsFilm = this.element.querySelector('.delete-sessions-film');
    const filmName = target.querySelector('.conf-step__seances-movie-title');
    deletableSessionsFilm.textContent = `"${filmName.textContent}"`;
    // deletableSessionsFilm.textContent = '';
    // console.log(filmName.textContent);
    // deletableSessionsFilm.insertAdjacentHTML('beforeend', `"${filmName.textContent}"`);
  }

  renderSessionId(target) {
    console.log(target.dataset.sessionId);
    const deletableSessionsInput = this.element.elements.session_id;
    deletableSessionsInput.textContent = target.dataset.sessionId;
  }

  getTarget(target) {
    this.target = target;
    console.log(this.target);
  }

  onSubmit(options) {
    if (this.target.dataset.sessionId) {
      console.log(this.target.dataset.sessionId);
      Session.remove(this.target.dataset.sessionId, options.data, (err, response) => {
        if (response && response.success === true) {
          Admin.getModal('delete_hall').close();
          this.element.reset();
          Admin.update();
        }
      });
    }
    this.target.remove();
    this.element.reset();
    Admin.getModal('delete_showtime').close();
  }
}
