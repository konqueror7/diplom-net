/**
 * Используется классом SessionHall
 * для управления виджетом выбора мест
 * в кинозале
 */
class BuyingWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * создает обработчики событий для виджета
   * @return {[type]} [description]
   */
  registerEvents() {
    const buyingSchemeWrapper = this.element.querySelector('.buying-scheme__wrapper');
    /**
     * Обработчик клика по элементу класса 'buying-scheme__chair',
     * который добавляет/удаляет ему класс 'buying-scheme__chair_selected'
     * клики возможны только по элементам не имеющим классов 'buying-scheme__chair_disabled' и 'buying-scheme__chair_taken'
     */
    buyingSchemeWrapper.addEventListener('click', (event) => {
      event.preventDefault();
      let eventTarget = event.target;
      if (eventTarget.classList.contains('buying-scheme__chair') && !eventTarget.classList.contains('buying-scheme__chair_disabled') && !eventTarget.classList.contains('buying-scheme__chair_taken')) {
        eventTarget.classList.toggle('buying-scheme__chair_selected');
      }
      SessionHall.getForm('buying_form').placeSomeSelected(buyingSchemeWrapper);
    })
  }

  /**
   * обновление содержимого виджета выбора мест в зале
   */
  update() {
    // Вsбор элементов DOM в которых будет отображаться информация о сеансе
    const buyingInfo = this.element.querySelector('.buying__info');
    const buyingInfoTitle = this.element.querySelector('.buying__info-title');
    const buyingInfoStart = this.element.querySelector('.buying__info-start');
    const buyingInfoHall = this.element.querySelector('.buying__info-hall');

    // ВЫбор элментов для отображения цен на стандартные и VIP-места
    const buyingSchemeLegendValueStdPrice = this.element.querySelector('.buying-scheme__legend-value.std-price');
    const buyingSchemeLegendValueVipPrice = this.element.querySelector('.buying-scheme__legend-value.vip-price');
    const sessionId = localStorage.getItem('session_id');

    /**
     * Получение информации о сеансе из файлов sessions.json,
     * movies.json, halls.json, tickets.json
     */
    Session.get(sessionId, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      const sessionData = response.session;

      //Вывод информации о сеансе в ранее выбранные элементы
      buyingInfo.dataset.sessionId = localStorage.getItem('session_id');
      buyingInfoStart.innerText = sessionData.start_time;
      buyingInfoTitle.dataset.filmId = sessionData.film_id;
      buyingInfoHall.dataset.hallId = sessionData.hall_id;

      Movie.get(sessionData.film_id, {}, (err, response) => {
        if (err || !response) {
          return undefined;
        }
        const movieData = response.movie;

        // Вывод названия фильма
        buyingInfoTitle.innerText = movieData.name;
      });

      Hall.get(sessionData.hall_id, {}, (err, response) => {
        if (err || !response) {
          return undefined;
        }
        console.log(response);
        const hallData = response.hall;

        // Вывод информации о зале
        buyingInfoHall.innerText = hallData.name;
        buyingSchemeLegendValueStdPrice.innerText = hallData.std_price + ' ';
        buyingSchemeLegendValueVipPrice.innerText = hallData.vip_price + ' ';
        Ticket.list({session_id: sessionId}, (err, response) => {
          if (err || !response ) {
            return undefined;
          }
          // Создание объекта, содержащего данные о зале и билетах
          const hallDatawithTick = Object.assign({ tickets: response.tickets }, hallData)
          // Вывод расположения свободных, занятых и заблокированных мест
          this.renderPlaces(hallDatawithTick);
        });
      });
    });
  }

  /**
   * Отрисовка схемы зала со всеми типами мест
   */
  renderPlaces(hallDatawithTick) {
    let { rows, places, vip, dis, tickets } = hallDatawithTick;
    let takenArray = [];
    for (let ticket in tickets) {
      let placesInTicket = tickets[ticket]['places'];
      for (let place in placesInTicket) {
        takenArray.push(placesInTicket[place])
      }
    }

    const renderRows = this.element.querySelector('.buying-scheme__wrapper');
    renderRows.innerHTML = '';
    for (let i = 1; i <= rows; i++) {
      const rendRow = this.getRowHTML();
      for (let y = 1; y <= places; y++) {
        let rendPlace = this.getPlaceHTML(i, y);
        rendRow.appendChild(rendPlace);
        for (let z = 0; z < vip.length; z++) {
          if (vip[z][0] == i && vip[z][1] == y) {
            rendPlace.classList.add('buying-scheme__chair_vip');
            rendPlace.classList.remove('buying-scheme__chair_standart');
            rendPlace.classList.remove('buying-scheme__chair_disabled');
          }
        }
        for (let x = 0; x < dis.length; x++) {
          if (dis[x][0] == i && dis[x][1] == y) {
            rendPlace.classList.add('buying-scheme__chair_disabled');
            rendPlace.classList.remove('buying-scheme__chair_vip');
            rendPlace.classList.remove('buying-scheme__chair_standart');
          }
        }
      }
      renderRows.appendChild(rendRow);
    }

    const renderRowsPLacesArray = Array.from(renderRows.getElementsByClassName('buying-scheme__chair'));
    for (let i in takenArray) {
      let takenPlace = renderRowsPLacesArray.find((element) => {
        if (element.dataset.row === takenArray[i].row && element.dataset.place === takenArray[i].place) {
          console.log(element);
          return element;
        }
      });
      takenPlace.classList.remove('buying-scheme__chair_vip');
      takenPlace.classList.remove('buying-scheme__chair_standart');
      takenPlace.classList.add('buying-scheme__chair_taken');
    }

    return renderRows;
  }

  /**
   * Создание и возвращение элемента ряда в зале
   */
  getRowHTML() {
    let rowHTML = document.createElement('div');
    rowHTML.classList.add('buying-scheme__row');
    return rowHTML;
  }

  /**
  * Создание и возвращение элемента места в зале
  */
  getPlaceHTML(row, place) {
    let placeHTML = document.createElement('span');
    placeHTML.classList.add('buying-scheme__chair', 'buying-scheme__chair_standart');
    placeHTML.dataset.row=`${row}`;
    placeHTML.dataset.place=`${place}`;
    return placeHTML;
  }
}
