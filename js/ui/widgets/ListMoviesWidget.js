/**
 * Вывод списка фильмов с описанием и постерами
 * вывод списка сеансов, сортированного по времени
 * и сгруппированого по залам.
 * Выбор сеанса осуществляется кликом по кнопке с указанием его времени
 */
class ListMoviesWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * Реестр обработчиков событий
   */
  registerEvents() {
    const moviesCollection = this.element;

    /**
     * Клик по времени сеанса копирует ID сеанса в запись 'session_id' localStorage
     * и совершает переход на страницу cient/hall.html если продажи открыты, в противном случае
     * выкидывается окно с предупреждением о временной блокировке продажи билетов в зал
     */
    moviesCollection.addEventListener('click', () => {
      let target = event.target;
      if (target.classList.contains('movie-seances__time') || target.closest('.movie-seances__time')) {
        if (target.closest('.inactive')) {
          alert('Продажа билетов временно заблокирована');
        } else {
          localStorage.setItem('session_id', target.dataset.sessionId);
          console.log(localStorage.getItem('session_id'));
          document.location.href = Entity.HOST + '/client/hall.html';
        }
      }
    });
  }

  /**
   * Обновление списка фильмов на странице
   */
  update() {
    Movie.list({name: '.+'}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }
      this.clearMovies();
      this.renderMovies(response.movies);
    });
  }

  /**
   * Удаление списка фильмов перед обновлением страницы
   */
  clearMovies() {
    const deletableMovies = this.element;
    deletableMovies.innerHTML = '';
  }

  /**
   * Отрисовка списка фильмов с помощью метода
   * renderMoviesItem() по параметру
   * @param  {Object} movies - объект, содержащий
   * информацию по каждому из фильмов
   * методом renderMoviesItem()
   */
  renderMovies( movies ) {
    for (let key in movies) {
      this.renderMoviesItem(key, movies[key]);
    }
  }

  /**
   * Отрисовка отдельного фильма с помощью
   * this.getMovieHTML() по двум параметрам
   * @param  {String} key   ID фильма
   * @param  {Object} movie - объект с информацией о фильме
   * с последующим добавлением в конец списка фильмов
   */
  renderMoviesItem( key, movie ) {
    const moviesList = this.element;
    let {
      name,
      content,
      poster,
      duration,
      producer
    } = movie,
    id = key;
    moviesList.append(this.getMovieHTML({id, name, content, poster, duration, producer}));
  }

  /**
   * Отрисовка html-элемента 'section'
   * с шаблоном, содержащим информацию о фильме
   * по параметру
   * @param  {Object} item - объект содержащий ID,
   * название, содержание, продолжительность, производителя фильма
   * и имя файла изображения постера
   * сеансы отрисовываются методом this.renderSessionsList()
   */
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
    movieDescription.append(movieData);

    let movieSeances = this.renderSessionsList(item.id);

    movieInfo.append(moviePoster);
    movieInfo.append(movieDescription);

    movieItem.append(movieInfo);
    movieItem.append(movieSeances);

    return movieItem;
  }

  /**
   * Извлечение записей о сеансах из файла sessions.json
   * по одинаковому ID фильма и его отрисовка в html-разметку
   * @param  {String} id - ID фильма в файле 'data/movies.json'
   * @return {Object}    новый узел DOM виде элемента 'div',
   * содержащего сеансы фильма
   */
  renderSessionsList(id) {
    let movieSeances = document.createElement('div');
    movieSeances.classList.add('movie-seances');

    /**
     * Извлечение списка сеансов с одинаковым ID фильма
     * и сортировка по времени начала показа
     */
    Session.list({film_id: id}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }

      if (response.sessions) {
        let filmSessionsList = Object.entries(response.sessions);
        let filmSessionsListSorted = filmSessionsList.sort(function(a, b) {
          console.log(a[1].start_time + ' ' + b[1].start_time);
          const timeStartA = new Date(new Date().toDateString() + ' ' + a[1].start_time);
          const timeLinePosA = timeStartA.getHours() * 60 + timeStartA.getMinutes();
          const timeStartB = new Date(new Date().toDateString() + ' ' + b[1].start_time);
          const timeLinePosB = timeStartB.getHours() * 60 + timeStartB.getMinutes();
          return timeLinePosA - timeLinePosB;
        });

        /**
         * Извлечение списка залов кинотеатра
         * и вывод в информации о фильме только тех
         * где будут его сеансы
         */
        Hall.list({name: '.+'}, (err, response) => {
          if (err || !response ) {
            return undefined;
          }

          /**
           * Информация о залах из hall.json
           * @type {Object}
           */
          let hallsList = response.halls;

          /**
           * ВЫвод списка сеансов одного фильма для кажого из залов
           */
          for (let hallKey in hallsList) {
            /**
             * Отфильтровывание сорттированого списка сеансов
             * в отдельный массив по ID зала
             */
            let hallSessions = filmSessionsListSorted.filter(session => session[1].hall_id === hallKey);
            /**
             * Если массив имеет хотя бы один элемент
             * то есть в этом зале проходит хотя бы один сеанс
             * этого фильма, то создается новый элемент DOM,
             * в котором выводятся сеансы фильма в виде кликабельных ссылок.
             */
            if (hallSessions.length > 0) {

              let movieSeancesHall = document.createElement('div');
              movieSeancesHall.classList.add('movie-seances__hall');
              if (hallsList[hallKey].active === false) {
                movieSeancesHall.classList.add('inactive');
              }
              // hallsList[hallKey].active === false ? movieSeancesHall.classList.add('movie-seances__hall') : movieSeancesHall.classList.add('movie-seances__hall inactive');
              movieSeancesHall.insertAdjacentHTML('beforeend', `<h3 class="movie-seances__hall-title">${hallsList[hallKey].name}</h3>`);

              let moviesHallList = document.createElement('ul');
              moviesHallList.classList.add('movie-seances__list');
              for (let filmSession of hallSessions) {
                moviesHallList.insertAdjacentHTML('beforeend',
                `
                  <li class="movie-seances__time-block"><a class="movie-seances__time" href="#" data-session-id="${filmSession[0]}">${filmSession[1].start_time}</a></li>
                `);
              }
              movieSeancesHall.append(moviesHallList);
              movieSeances.append(movieSeancesHall);
            }
          }
        });
      }
    });
    return movieSeances;
  }

}
