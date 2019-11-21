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
    let currentDroppable = null;
    moviesCollection.addEventListener('mousedown', (event) => {
      let target = event.target;
      if (target.classList.contains('conf-step__movie') || target.closest('.conf-step__movie')) {
        let filmData = new Film(target.closest('.conf-step__movie'));
        let filmDragg = target.closest('.conf-step__movie').cloneNode(true);
        filmDragg.style.position = 'absolute';
        filmDragg.style.zIndex = 1000;
        document.body.append(filmDragg);

        moveAt(event.pageX, event.pageY);

        // document.addEventListener('mousemove', onMouseMove);
        this.element.addEventListener('mousemove', onMouseMove);
        console.log(this.element);

        filmDragg.addEventListener('mouseup', (event) => {
          event.preventDefault();
          console.log(event);
          // document.removeEventListener('mousemove', onMouseMove);
          this.element.removeEventListener('mousemove', onMouseMove);
          filmDragg.remove();
          filmDragg.onmouseup = null;
        });

        function moveAt(pageX, pageY) {
          //// Позиционирование копии элемента со сдвигом относительно указателя мыши
          filmDragg.style.left = pageX - (filmDragg.getBoundingClientRect().right - filmDragg.getBoundingClientRect().left) / 2 + 'px';
          filmDragg.style.top = pageY - (filmDragg.getBoundingClientRect().bottom - filmDragg.getBoundingClientRect().top) / 2 + 'px';
        }

        function onMouseMove(event) {
          // console.log(this);
          moveAt(event.pageX, event.pageY);
          // внутри обработчика события мыши прячем переносимый элемент
          filmDragg.style.display = 'none';
          // elemBelow - возможная цель переноса
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          filmDragg.style.display = 'block';

          // событие mousemove может произойти и когда указатель за пределами окна
          // (элемент перетащили за пределы экрана)
          // если clientX/clientY за пределами окна, elementFromPoint вернёт null
          if (!elemBelow) {
            console.log('Attention!');
            return;
          }
          // потенциальные цели переноса помечены классом 'seances' (может быть и другая логика)
          let droppableBelow = elemBelow.closest('.conf-step__seances');

          if (currentDroppable != droppableBelow) {
            // мы либо залетаем на цель, либо улетаем из неё
            // внимание: оба значения могут быть null
            // currentDroppable=null,
            // если мы были не над droppable/seances до этого события (например, над пустым пространством)
            // droppableBelow=null,
            // если мы не над droppable/seances именно сейчас, во время этого события

            currentDroppable = droppableBelow;

            if (currentDroppable) {
              // console.log(this.element);
              enterDroppable(this);
              // Admin.getModal('add_showtime').open();
              // document.removeEventListener('mousemove', onMouseMove);
              filmDragg.remove();
              console.log('Gool!');
            }

          }

        }

        function enterDroppable(element) {
          // console.log(element);
          element.removeEventListener('mousemove', onMouseMove);
          // this.element.removeEventListener('mousemove', onMouseMove);
          // document.forms.add_movie.elements.name.value = filmData.name;
          // document.forms.add_movie.elements.movie_id.value = filmData.movieId;
          // document.querySelector('.popup').classList.add('active');
          Admin.getForm('add_showtime').renderFilmName(filmData);
          Admin.getModal('add_showtime').open();
        }

      }


        //Отключение обработчиков браузера
        target.ondragstart = function() {
          return false;
        };
    });



  }

  update() {
    if (User.current()) {
      Movie.list({name: '.+'}, (err, response) => {
        if (err || !response ) {
          return undefined;
        }
        this.clearMovies();
        this.renderMovies(response.movies);
        // console.log(response);
      });

      Hall.list({name: '.+'}, (err, response) => {
        if (err || !response ) {
          return undefined;
        }
        console.log(response.halls);
        this.clearHalls();
        this.renderHalls(response.halls);
        // console.log(response);
      });
    } else if (!User.current()) {
      return undefined;
    }
  }

  renderMovies( movies ) {
    for (var key in movies) {
      this.renderMoviesItem(key, movies[key]);
    }
  }

  renderHalls( halls ) {
    for (var key in halls) {
      this.renderHallItem(key, halls[key]);
    }
  }

  clearMovies() {
    const deletableMovies = this.element.querySelector('.conf-step__movies');
    deletableMovies.innerHTML = '';
  }

  clearHalls() {
    const deletableHalls = this.element.querySelector('.conf-step__seances');
    deletableHalls.innerHTML = '';
  }

  renderMoviesItem( key, movie ) {
    // console.log(hall);
    const moviesList = this.element.querySelector('.conf-step__movies');
    let {
      name,
      poster,
      duration
    } = movie,
    id = key;
    moviesList.innerHTML += this.getMovieHTML({id, name, poster, duration});
  }

  renderHallItem( key, hall ) {
    // console.log(hall);
    const hallsList = this.element.querySelector('.conf-step__seances');
    let {
      name
    } = hall,
    id = key;
    hallsList.innerHTML += this.getHallHTML({id, name});
  }

  getMovieHTML(item) {
    return `
    <div class="conf-step__movie" data-id="${item.id}">
      <img class="conf-step__movie-poster" alt="poster" src="/posters/${item.poster}">
      <h3 class="conf-step__movie-title">${item.name}</h3>
      <p class="conf-step__movie-duration">${item.duration} минут</p>
    </div>
    `;
  }

  getHallHTML(item) {
    return `
      <div class="conf-step__seances-hall" data-id="${item.id}">
        <h3 class="conf-step__seances-title">${item.name}</h3>
        <div class="conf-step__seances-timeline">
        </div>
      </div>
    `;
  }

  // static addSession(data) {
  //   console.log(this.element);
  //   this.renderSession(data.hall);
  // }
  //
  // static renderSession(item) {
  //   console.log(item);
  // }
}
