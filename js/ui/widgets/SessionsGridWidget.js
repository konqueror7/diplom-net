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
        this.element.addEventListener('mousemove', onMouseMove);

        filmDragg.addEventListener('mouseup', (event) => {
          event.preventDefault();
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
              enterDroppable(this);
              filmDragg.remove();
            }
          }
        }

        function enterDroppable(element) {
          element.removeEventListener('mousemove', onMouseMove);
          Admin.getForm('add_showtime').renderFilmName(filmData);
          Admin.getModal('add_showtime').open();
        }
      }

        //Отключение обработчиков браузера
        target.ondragstart = function() {
          return false;
        };
    });

    const resetButton = this.element.querySelector('.conf-step__button-regular');
    resetButton.addEventListener('click', (event) => {
      console.log('Reset!');
      event.preventDefault();
      this.element.querySelector('#add-sessions-form').reset();
      this.update();
    });

    const deletableSessions = this.element.querySelector('.conf-step__seances');
    deletableSessions.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      if (target.classList.contains('conf-step__seances-movie') || target.closest('.conf-step__seances-movie')) {
        Admin.getForm('delete_sessions').renderFilmName(target.closest('.conf-step__seances-movie'));
        Admin.getForm('delete_sessions').renderSessionId(target.closest('.conf-step__seances-movie'));
        Admin.getForm('delete_sessions').getTarget(target.closest('.conf-step__seances-movie'));
        Admin.getModal('delete_showtime').open();
      }
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
      });

      Hall.list({name: '.+'}, (err, response) => {
        if (err || !response ) {
          return undefined;
        }
        this.clearHalls();
        this.renderHalls(response.halls);
      });
    } else if (!User.current()) {
      return undefined;
    }
  }

  updateConfStepMovies() {
    Movie.list({name: '.+'}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }
      this.clearMovies();
      this.renderMovies(response.movies);
    });
  }

  updateConfStepSeances() {
    Hall.list({name: '.+'}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }
      this.clearHalls();
      this.renderHalls(response.halls);
    });
  }

  renderMovies( movies ) {
    for (let key in movies) {
      this.renderMoviesItem(key, movies[key]);
    }
  }

  renderHalls( halls ) {
    for (let key in halls) {
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
    const hallsList = this.element.querySelector('.conf-step__seances');
    let {
      name
    } = hall,
    id = key;
    hallsList.append(this.getHallHTML({id, name}));
  }

  getMovieHTML(item) {
    return `
    <div class="conf-step__movie" data-id="${item.id}">
      <img class="conf-step__movie-poster" alt="poster" src="/posters/${item.poster}">
      <h3 class="conf-step__movie-title">${item.name}</h3>
      <p class="conf-step__movie-duration"><span class="conf-step__movie-duration_value">${item.duration}</span> минут</p>
    </div>
    `;
  }

  getHallHTML(item) {
    let hallItem = document.createElement('div');
    hallItem.classList.add('conf-step__seances-hall');
    hallItem.dataset.id = item.id;
    hallItem.insertAdjacentHTML('beforeend', `<h3 class="conf-step__seances-title">${item.name}</h3>`);
    hallItem.insertAdjacentHTML('beforeend', '<div class="conf-step__seances-timeline"></div>');
    this.renderSessions(item.id, hallItem);
    return hallItem;
  }

  renderSessions(hall_id, hallItem) {
    Session.list({hall_id: hall_id}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }
      for (let session in response.sessions) {
        hallItem.querySelector('.conf-step__seances-timeline').append(this.getSessionHTML(response.sessions[session], session));
      }
    });
  }

  getSessionHTML(item, session) {
    let movieData;
    let sessionItem = document.createElement('div');
    sessionItem.dataset.sessionId = session;
    sessionItem.style.left = `${this.renderTimelinePos(item.start_time)}px`;
    sessionItem.classList.add('conf-step__seances-movie');
    sessionItem.insertAdjacentHTML('beforeend', '<p class="conf-step__seances-movie-title"></p>');
    sessionItem.insertAdjacentHTML('beforeend', `<p class="conf-step__seances-movie-start">${item.start_time}</p>`);

    Movie.get(item.film_id, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      movieData = response.movie;
      sessionItem.querySelector('.conf-step__seances-movie-title').innerText += movieData.name;
      sessionItem.style.width = `${this.renderDuration(movieData.duration)}px`;

    });
    sessionItem.style.backgroundColor = 'rgb(133, 255, 137)';
    return sessionItem;
  }

  //Вычисление значения свойства left из времени начала сеанса
  renderTimelinePos(time) {
    const timeStart = new Date(new Date().toDateString() + ' ' + time);
    let timelinePos = timeStart.getHours() * 60 + timeStart.getMinutes();
    return timelinePos * 0.5;
  }
  //Вычисление значения свойства width из продолжительности сеанса
  renderDuration(duration) {
    return duration*0.5;
  }
}
