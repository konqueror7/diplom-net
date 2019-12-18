/**
 * Выводит список фильмов, отображает сеансы и обрабатывает
 * события во вкладке "Сетка сеансов"
 * страницы 'admin/index.html'
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

  /**
   * Реестр обработчиков событий
   */
  registerEvents() {
    /**
    * Клик по кнопке "Добавить фильм"
    * открывает модальное окно формы
    * с селектором '#modal-movie-add'
    * для добавления нового фильма
    */
    const addMovieButton = this.element.querySelector('.conf-step__button-accent');
    addMovieButton.addEventListener('click', (event) => {
      event.preventDefault();
      Admin.getModal('add_movie').open();
    });

    /**
     * Нажатие левой кнопки мыши по выбраному HTML-элементу,
     * содержащему информацию о фильме (постер, название и продолжительность)
     * создает его копию, которую можно перетаскивать не отпуская кнопки
     */
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

        /**
         * Обработчик реагирует на перемещение курсора
         * при нажатой левой кнопке мыши
         * методом onMouseMove()
         */
        this.element.addEventListener('mousemove', onMouseMove);

        /**
        * Отпускание левой кнопки на копии
        * перетаскиваемого HTML-элемента
        * приводит к ее удалению
        */
        filmDragg.addEventListener('mouseup', (event) => {
          event.preventDefault();
          this.element.removeEventListener('mousemove', onMouseMove);
          filmDragg.remove();
          filmDragg.onmouseup = null;
        });

        /**
         * Изменяет позицию элемента относительно
         * части страницы, видимой на экране
         * @param  {double float} pageX положение элемента по горизонтали
         * относительно всей HTML-страницы
         * @param  {double float} pageY положение элемента по вертикали
         * относительно всей HTML-страницы
         */
        function moveAt(pageX, pageY) {
          //// Позиционирование копии элемента со сдвигом относительно указателя мыши
          filmDragg.style.left = pageX - (filmDragg.getBoundingClientRect().right - filmDragg.getBoundingClientRect().left) / 2 + 'px';
          filmDragg.style.top = pageY - (filmDragg.getBoundingClientRect().bottom - filmDragg.getBoundingClientRect().top) / 2 + 'px';
        }

        /**
         * Метод отсеживает попадание под перемещаемый элемент
         * HTML-элемента с селектором '.conf-step__seances'
         * в котором размещаются сеансы фильмов
         * @param  {Object} event - событие 'mousemove'
         * если при перемещении мышью отпустить ее левую кнопку
         * то в случае нахождения курсора мыши над искомым элементом произойдет
         * открытие модального окна формы добавления сеанса,
         * в противном случае ничего не произойдет
         */
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

            /**
            * Если положение элемента соответствует положению цели
            * то включается метод enterDroppable()
            */
            if (currentDroppable) {
              enterDroppable(this);
              filmDragg.remove();
            }
          }
        }

        /**
         * Удаляет обработчик события 'mousemove'
         * и открывает окно формы добавления сеанса
         * @param  {Object} element перемещаемый элемент
         */
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

    /**
     * Клик по кнопке "Отмена" отменяет все несохранненные сеансы
     * и перезагружает данные о существующих сеансах
     */
    const resetButton = this.element.querySelector('.conf-step__button-regular');
    resetButton.addEventListener('click', (event) => {
      console.log('Reset!');
      event.preventDefault();
      this.element.querySelector('#add-sessions-form').reset();
      this.update();
    });

    /**
     * Клик по сеансу фильма на временной шкале
     * вызывает модальное окно формы удаления сеанса
     * @type {[type]}
     */
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

  /**
   * Обновление содержимого
   * виджета "Сетка сеансов"
   * списка фильмов и сетки сеанов
   */
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

  /**
   * Обновление сетки сеанов
   */
  updateConfStepMovies() {
    Movie.list({name: '.+'}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }
      this.clearMovies();
      this.renderMovies(response.movies);
    });
  }

  /**
   * Обновление списка фильмов
   */
  updateConfStepSeances() {
    Hall.list({name: '.+'}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }
      this.clearHalls();
      this.renderHalls(response.halls);
    });
  }

  /**
   * Вывод списка фильмов c параметром movies
   * @param  {Object} movies - объект с перечисляемыми свойствами
   * каждое из которых которые содержит информацию об отдельном фильме
   */
  renderMovies( movies ) {
    for (let key in movies) {
      this.renderMoviesItem(key, movies[key]);
    }
  }

  /**
   * Вывод списка фильмов c параметром movies
   * @param  {Object} halls - объект с перечисляемыми свойствами
   * каждое из которых которые содержит информацию об отдельном зале
   */
  renderHalls( halls ) {
    for (let key in halls) {
      this.renderHallItem(key, halls[key]);
    }
  }

  /**
   * Очистка HTML-содержимого в блочном
   * элементе с css-селектором '.conf-step__movies',
   * отображающим список фильмов
   */
  clearMovies() {
    const deletableMovies = this.element.querySelector('.conf-step__movies');
    deletableMovies.innerHTML = '';
  }

  /**
   * Очистка HTML-содержимого в блочном
   * элементе с css-селектором '.conf-step__seances',
   * отображающим сеансы по залам
   */
  clearHalls() {
    const deletableHalls = this.element.querySelector('.conf-step__seances');
    deletableHalls.innerHTML = '';
  }

  /**
   * Вывод сеанса фильма в виде блока
   * с названием фильма и временем начала
   * по двум параметрам
   * @param  {String} key - ID фильма
   * @param  {Object} movie - объект, содержащий информацию о фильме
   */
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

  /**
   * Вывод залов без сетки сеансов
   * по двум параметрам
   * @param  {String} key - ID зала
   * @param  {Object} hall - объект, содержащий информацию о зале
   */
  renderHallItem( key, hall ) {
    const hallsList = this.element.querySelector('.conf-step__seances');
    let {
      name
    } = hall,
    id = key;
    hallsList.append(this.getHallHTML({id, name}));
  }

  /**
   * Возвращает HTML-содержимое блока
   * с информацией о фильме в списке фильмов
   * @param  {Object} item - объект, содержащий информацию о фильме
   * @return {String}      HTML-макет с информацией о фильме
   */
  getMovieHTML(item) {
    return `
    <div class="conf-step__movie" data-id="${item.id}">
      <img class="conf-step__movie-poster" alt="poster" src="/posters/${item.poster}">
      <h3 class="conf-step__movie-title">${item.name}</h3>
      <p class="conf-step__movie-duration"><span class="conf-step__movie-duration_value">${item.duration}</span> минут</p>
    </div>
    `;
  }

  /**
   * Создает новый элемент DOM
   * с информацией о зале и временной шкалой
   * для сеансов фильмов с парметром
   * @param  {Object} item - объект с информацией о зале
   * @return {Object}      новый объект DOM
   */
  getHallHTML(item) {
    let hallItem = document.createElement('div');
    hallItem.classList.add('conf-step__seances-hall');
    hallItem.dataset.id = item.id;
    hallItem.insertAdjacentHTML('beforeend', `<h3 class="conf-step__seances-title">${item.name}</h3>`);
    hallItem.insertAdjacentHTML('beforeend', '<div class="conf-step__seances-timeline"></div>');
    this.renderSessions(item.id, hallItem);
    return hallItem;
  }

  /**
   * Вывод сеансов фильмов в сетку сеансов зала
   * @param  {String} hall_id  - ID зала
   * @param  {Object} hallItem - DOM элемент с HTML-макетом зала
   * который получается из функции this.getHallHTML()
   */
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

  /**
   * Создает новый элемент DOM
   * для отображения сеанса на временной шкале
   * @param  {Object} item    объект с информацией о сеансе
   * @param  {[type]} session ID сеанса
   */
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

  /**
   * Вычисление значения свойства left из времени начала сеанса
   * @param  {String} time - текстовая строка о времени начала в формате ЧЧ:ММ
   * @return {integer}      отображение времени начала фильма на временной шкале
   */
  renderTimelinePos(time) {
    const timeStart = new Date(new Date().toDateString() + ' ' + time);
    let timelinePos = timeStart.getHours() * 60 + timeStart.getMinutes();
    return timelinePos * 0.5;
  }
  /**
   * Вычисление значения свойства width из продолжительности сеанса
   * @param  {integer} duration - продолжительность фильма в минутах
   * @return {integer}          отображение продолжительности на временной шкале
   */
  renderDuration(duration) {
    return duration*0.5;
  }
}
