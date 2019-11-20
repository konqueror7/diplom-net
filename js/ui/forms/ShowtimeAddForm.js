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
}
