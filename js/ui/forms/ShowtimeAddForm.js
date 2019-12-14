/**
 * Обслуживает форму с css-селектором '#add-showtime-form'
 * в модальном окне '#modal-showtime-add' на странице 'admin'
 * @extends AsyncForm
 */
class ShowtimeAddForm extends AsyncForm {
  constructor( element ) {
    super(element);
    this.renderHallsList();
  }

  /**
   * Обновляет список залов в поле 'Название зала'
   * с помощью метода renderHallsList()
   * через метод updateForms() при применении метода 'init()' класса Admin
   */
  update() {
    this.renderHallsList();
  }

  /**
   * Устанвливает значения
   * для поля 'name' ('Название фильма')
   * для скрытых полей 'Продолжительность' ('duration_film')
   * и 'film_id' ('ID фильма')
   * @param  {Object} filmData - объект класса Film, используемый в классе SessionsGridWidget
   */
  renderFilmName(filmData) {
    const filmNameInput = this.element.elements.name;
    const filmIdInput = this.element.elements.film_id;
    const filmDurationInput = this.element.elements.duration_film;
    console.log(filmData);
    filmNameInput.value = filmData.name;
    filmIdInput.value = filmData.movieId;
    filmDurationInput.value = filmData.duration;
  }
  /**
   * Создает опции в поле со списком 'Название зала'
   * где значение - ID зала а текст тега 'option' -
   * собственно название зала
   *
   */
  renderHallsList() {
    const selectHall = this.element.querySelector('select');
    Hall.list({name: '.+'}, (err, response) => {
        if (err || !response.halls ) {
          return undefined;
        }
        selectHall.innerHTML = '';
        for (let optionSelect in response.halls) {
          selectHall.innerHTML += `<option value="${optionSelect}">${response.halls[optionSelect].name}</option>`;
        }
    });
  }

  /**
   * Метод создает блочный элемент 'div' содержащий информацию о сеансе фильма
   * который вставляется в элемент класса 'conf-step__seances-timeline' виджета
   * 'Сетка сеансов'. Используется в методе onSubmit() этого класса
   * @param  {object} dataFilm - объект, содержащий сведения о фильме,
   * возвращаемый методом this.getData() из данных формы
   * @return {String} - возвращает шаблон блочного элемента
   */
  renderFilm(dataFilm) {
    let {
      film_id,
      duration_film,
      start_time,
      name
    } = dataFilm;
    return `
    <div class="conf-step__seances-movie" data-id="${film_id}" data-duration="${duration_film}" style="width: ${this.renderDuration(duration_film)}px; background-color: rgb(202, 255, 133); left: ${this.renderTimelinePos(start_time)}px;">
      <p class="conf-step__seances-movie-title">${name}</p>
      <p class="conf-step__seances-movie-start">${start_time}</p>
    </div>
    `;
  }

  /**
   *Вычисление значения свойства left из времени начала сеанса
   */
  renderTimelinePos(time) {
    const timeStart = new Date(new Date().toDateString() + ' ' + time);
    let timelinePos = timeStart.getHours() * 60 + timeStart.getMinutes();
    return timelinePos * 0.5;
  }
  /**
   * Вычисление значения свойства width из продолжительности сеанса
   */
  renderDuration(duration) {
    return duration*0.5;
  }

  /**
   * Вставляет в блочный элемент с селектором 'conf-step__seances-timeline'
   * результат возвращаемый функцией this.renderFilm() - блок с информацией о сеансе фильма
   * класса 'conf-step__seances-movie'
   * сбрасывает значения полей ввода формы и закрывает модальное окно формы.
   */
  onSubmit(options) {
    console.log(options.data);
    const halls = document.getElementsByClassName('conf-step__seances-hall');
    const hallsArray = Array.from(halls);
    const hall = hallsArray.find(function(item) {
      if (item.dataset.id === options.data.hall) {
        return item;
      }
    });
    const timeline = hall.querySelector('.conf-step__seances-timeline');
    console.log(timeline);
    timeline.innerHTML += this.renderFilm(options.data);
    this.element.reset();
    Admin.getModal('add_showtime').close();
  }
}
