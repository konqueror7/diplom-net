class ListMoviesWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {

  }

  update() {
    Movie.list({name: '.+'}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }
      this.clearMovies();
      this.renderMovies(response.movies);
    });
  }

  clearMovies() {
    const deletableMovies = this.element;
    deletableMovies.innerHTML = '';
  }

  renderMovies( movies ) {
    for (let key in movies) {
      console.log(key);
      this.renderMoviesItem(key, movies[key]);
    }
  }

  renderMoviesItem( key, movie ) {
    // console.log(hall);
    const moviesList = this.element;
    // moviesList.innerHTML = '';
    let {
      name,
      content,
      poster,
      duration,
      producer
    } = movie,
    id = key;
    moviesList.append(this.getMovieHTML({id, name, content, poster, duration, producer}));
    // moviesList.innerHTML += this.getMovieHTML({id, name, content, poster, duration, producer});
  }

  getMovieHTML(item) {
    let movieItem = document.createElement('section');
    movieItem.classList.add('movie');

    let movieInfo = document.createElement('div')
    movieInfo.classList.add('movie__info');
    movieInfo.dataset.filmId = item.id;

    let moviePoster = document.createElement('div')
    moviePoster.classList.add('movie__poster');
    moviePoster.insertAdjacentHTML('beforeend', `<img class="movie__poster-image" alt="${item.name} постер" src="/posters/${item.poster}">`);

    let movieData = document.createElement('p');
    movieData.classList.add('movie__data');
    movieData.insertAdjacentHTML('beforeend', `<span class="movie__data-duration">${item.duration} минут</span>`);
    movieData.insertAdjacentHTML('beforeend', `<span class="movie__data-origin"> ${item.producer}</span>`);

    let movieDescription = document.createElement('div');
    movieDescription.classList.add('movie__description');
    movieDescription.insertAdjacentHTML('beforeend', `<h2 class="movie__title">${item.name}</h2>`);
    movieDescription.insertAdjacentHTML('beforeend', `<p class="movie__synopsis">${item.content}</p>`);
    // movieDescription.insertAdjacentHTML('beforeend', movieData);
    movieDescription.append(movieData);

    let movieSeances = this.renderSessionsList(item.id);
    // movieSeances.classList.add('movie-seances__hall');

    movieInfo.append(moviePoster);
    movieInfo.append(movieDescription);
    // movieInfo.append(movieData);

    movieItem.append(movieInfo);
    movieItem.append(movieSeances);

    return movieItem;
  }

  renderSessionsList(id) {
    let movieSeances = document.createElement('div');
    movieSeances.classList.add('movie-seances');

    Session.list({film_id: id}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }
      // this.clearMovies();
      // this.renderMovies(response.movies);
      console.log(response);
    });

    movieSeances.innerText = id;
    return movieSeances;
  }

}
