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
    console.log(filmData);
    filmNameInput.value = filmData.name;
    filmIdInput.value = filmData.movieId;
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
    <div class="conf-step__seances-movie" data-id="${item.film_id}">
      <p class="conf-step__seances-movie-title">${item.name}</p>
      <p class="conf-step__seances-movie-start">${item.start_time}</p>
    </div>
    `;
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
    Admin.getModal('add_showtime').close();
    // return options.data;
  }
}
