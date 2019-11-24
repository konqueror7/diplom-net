class ShowtimeAddForm extends AsyncForm {
  constructor( element ) {
    super(element);
    this.renderHallsList();
  }

  update() {
    this.renderHallsList();
  }

  renderFilmName(filmData) {
    const filmNameInput = this.element.elements.name;
    const filmIdInput = this.element.elements.film_id;
    const filmDurationInput = this.element.elements.duration_film;
    console.log(filmData);
    filmNameInput.value = filmData.name;
    filmIdInput.value = filmData.movieId;
    filmDurationInput.value = filmData.duration;
  }

  renderHallsList() {
    const selectHall = this.element.querySelector('select');
    console.log(selectHall);
    Hall.list({name: '.+'}, (err, response) => {
        if (err || !response.halls ) {
          return undefined;
        }
        selectHall.innerHTML = '';
        for (let optionSelect in response.halls) {
          console.log(optionSelect);
          selectHall.innerHTML += `<option value="${optionSelect}">${response.halls[optionSelect].name}</option>`;
          // selectHall.innerHTML += `<option value="${optionSelect}">${optionSelect.name}</option>`;
        }
    });
  }

  renderFilm(item) {
    return `
    <div class="conf-step__seances-movie" data-id="${item.film_id}" data-duration="${item.duration_film}" style="width: ${this.renderDuration(item.duration_film)}px; background-color: rgb(133, 255, 137); left: ${this.renderTimelinePos(item.start_time)}px;">
      <p class="conf-step__seances-movie-title">${item.name}</p>
      <p class="conf-step__seances-movie-start">${item.start_time}</p>
    </div>
    `;
    // <div class="conf-step__seances-movie" data-id="${item.film_id}" style="${this.timelinePos(item.start_time)}">
  }

  //Вычисление значения свойства left из времени начала сеанса
  renderTimelinePos(time) {
    const timeStart = new Date(new Date().toDateString() + ' ' + time);
    let timelinePos = timeStart.getHours() * 60 + timeStart.getMinutes();
    // console.log(timeStart);
    // console.log(timeStart.getHours());
    return timelinePos * 0.5;
  }
  //Вычисление значения свойства width из продолжительности сеанса
  renderDuration(duration) {
    return duration*0.5;
  }

  onSubmit(options) {
    console.log(options.data);
    const halls = document.getElementsByClassName('conf-step__seances-hall');
    const hallsArray = Array.from(halls);
    const hall = hallsArray.find(function(item) {
      if (item.dataset.id === options.data.hall) {
        return item;
      }
    });
    // console.log(hall);
    const timeline = hall.querySelector('.conf-step__seances-timeline');
    console.log(timeline);
    timeline.innerHTML += this.renderFilm(options.data);
    // const film = document.createElement('div');
    // film.classList.add('');

    // console.log(SessionsGridWidget.element);
    // SessionsGridWidget.addSession(options.data);
    // console.log(document.querySelector('.conf-step__seances-hall'));
    this.element.reset();
    Admin.getModal('add_showtime').close();
    // return options.data;
  }
}
