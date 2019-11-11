/**
 * Выводит список фильмов, отображает сеансы и обрабатывает
 * события во вкладке "Сетка сеансов"
 * страницы 'admin'
 */
class SessionsGridWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      // console.log(target);
      if (target.classList.contains('conf-step__button-accent')) {
        Admin.getModal('add_movie').open();
        // console.log('Yes!');
      }
    });
  }

  update() {
    if (User.current()) {
      Movie.list({name: '.+'}, (err, response) => {
        if (err || !response ) {
          return undefined;
        }
        this.clear();
        this.render(response.movies);
        // console.log(response);
      });
    } else if (!User.current()) {
      return undefined;
    }
  }

  render( movies ) {
    for (var key in movies) {
      this.renderItem(key, movies[key]);
    }
  }

  clear() {
    const deletableMovies = this.element.querySelector('.conf-step__movies');
    deletableMovies.innerHTML = '';
  }

  renderItem( key, movie ) {
    // console.log(hall);
    const moviesList = this.element.querySelector('.conf-step__movies');
    let {
      name,
      poster,
      duration
    } = movie,
    id = key;
    moviesList.innerHTML += this.getHalltHTML({id, name, poster, duration});
  }

  getHalltHTML(item) {
    return `
    <div class="conf-step__movie" data-id="${item.id}">
      <img class="conf-step__movie-poster" alt="poster" src="/posters/${item.poster}">
      <h3 class="conf-step__movie-title">${item.name}</h3>
      <p class="conf-step__movie-duration">${item.duration} минут</p>
    </div>
    `;
  }
}
