/**
 * Обслуживает форму удаления сеанса из сетки сеансов
 *
 * @extends AsyncForm
 */
class SessionsDeleteForm extends AsyncForm {
  constructor( element ) {
    super(element);
    this.target;
  }
  /**
   * Выводит имя удаляемого фильма в теге 'span' с селектором '.delete-sessions-film'
   * в форме с селектором '#delete-sessions-form'
   * @param  {[type]} target - цель клика по сеансу фильма, выбранного для удаления в элементе '.conf-step__seances-movie'
   * полученная в обработчике события класса SessionsGridWidget
   */
  renderFilmName(target) {
    const deletableSessionsFilm = this.element.querySelector('.delete-sessions-film');
    const filmName = target.querySelector('.conf-step__seances-movie-title');
    deletableSessionsFilm.textContent = `"${filmName.textContent}"`;
  }

  /**
   * Выводит в скрытое поле session_id формы ID-сеанса для удаления.
   * @param  {[type]} target [description]
   * @return {[type]}        [description]
   */
  renderSessionId(target) {
    const deletableSessionsInput = this.element.elements.session_id;
    deletableSessionsInput.textContent = target.dataset.sessionId;
  }

  getTarget(target) {
    this.target = target;
  }

/**
 * Удаляет сеанс из sessions.json обновляет виджет сетки сеансов.
 */
  onSubmit(options) {
    if (this.target.dataset.sessionId) {
      console.log(this.target.dataset.sessionId);
      Session.remove(this.target.dataset.sessionId, options.data, (err, response) => {
        if (response && response.success === true) {
          Admin.getModal('delete_showtime').close();
          // Admin.getModal('delete_hall').close();
          this.element.reset();
          Admin.getWidget('sessions_grid_config').updateConfStepSeances();
        }
      });
    }
    this.target.remove();
    this.element.reset();
    Admin.getModal('delete_showtime').close();
  }
}
