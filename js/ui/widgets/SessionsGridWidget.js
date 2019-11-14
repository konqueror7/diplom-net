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
    const addMovieButton = this.element.querySelector('.conf-step__button-accent');

    addMovieButton.addEventListener('click', (event) => {
      event.preventDefault();
      Admin.getModal('add_movie').open();
    });

    const moviesCollection = this.element.querySelector('.conf-step__movies');
    moviesCollection.addEventListener('mousedown', (event) => {
      event.preventDefault();
      // dragObject = this;
      // let target = event.target;
      // if (target.classList.contains('conf-step__movie')) {
      //   console.log('Drag-n-drop!');
      //   target.style.position = 'absolute';
      //   target.style.zIndex = 1000;
      //   target.cloneNode();
      //   document.body.append(target);
      // }
      // if (target.closest('.conf-step__movie')) {
      //   console.log('Drag-n-drop!');
      //   target.parentElement.style.position = 'absolute';
      //   target.parentElement.style.zIndex = 1000;
      //   target.parentElement.cloneNode();
      //   document.body.append(target.parentElement);
      // }
      // if (target.classList.contains('conf-step__movie') || target.closest('.conf-step__movie')) {
        // console.log('Drag-n-drop!');
        // target.style.position = 'absolute';
        // target.style.zIndex = 1000;
        // target.cloneNode();
        // document.body.append(target);
      // }

      // moveAt(event.pageX, event.pageY);
      //
      // function moveAt(pageX, pageY) {
      //   target.style.left = pageX - target.offsetWidth / 2 + 'px';
      //   target.style.top = pageY - target.offsetHeight / 2 + 'px';
      // }
      // function onMouseMove(event) {
      // moveAt(event.pageX, event.pageY);
      // }
      // document.addEventListener('mousemove', onMouseMove);
      // target.onmouseup = function() {
      // document.removeEventListener('mousemove', onMouseMove);
      // target.onmouseup = null;
      // };
      // console.log(target);
      // if (target.closest('.conf-step__movie')) {
      // // if (target.classList.contains('conf-step__movie')) {
      //   // Admin.getModal('add_movie').open();
      //   console.log('Yes!');
      //   target.parentElement.style.position = 'absolute';
      //   target.parentElement.style.zIndex = 1000;
      //   document.body.append(target.parentElement);
      //   moveAt(event.pageX, event.pageY);
      //
      //   // передвинуть мяч под координаты курсора
      //   // и сдвинуть на половину ширины/высоты для центрирования
      //   function moveAt(pageX, pageY) {
      //     target.parentElement.style.left = pageX - target.parentElement.offsetWidth / 2 + 'px';
      //     target.parentElement.style.top = pageY - target.parentElement.offsetHeight / 2 + 'px';
      //   }
      //
      //   function onMouseMove(event) {
      //     moveAt(event.pageX, event.pageY);
      //   }
      //   // (3) перемещать по экрану
      //   document.addEventListener('mousemove', onMouseMove);
      //
      //   // (4) положить мяч, удалить более ненужные обработчики событий
      //   target.parentElement.onmouseup = function() {
      //     document.removeEventListener('mousemove', onMouseMove);
      //     target.parentElement.onmouseup = null;
      //   };
      // }
    });

    // if (target.classList.contains('conf-step__movie')) {
    //   console.log('Drag-n-drop!');
    // }
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
