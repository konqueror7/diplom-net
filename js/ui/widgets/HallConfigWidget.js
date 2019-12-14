/**
 * Выводит конфигурацию залов и обрабатывает
 * события во вкладке "Конфигурация залов"
 * страницы 'admin'
 */
class HallConfigWidget {

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
     * Обработчик события ввода в поле ввода типа 'radio'
     * который соответствует отдельному кинозалу
     * вызывает метод renderHall(), который отображает
     * настройки конфигурации зала
     */
    this.element.addEventListener('input', (event) => {
      event.preventDefault();
      let target = event.target;
      if (target.classList.contains('conf-step__radio')) {
        this.renderHall(target.dataset.id);
      }
    });

    /**
     * Клик по кнопке 'Отмена' виджета 'Конфигурация залов'
     * сбрасывает введенные значения и обновляет содержимое виджета
     */
    const resetButton = this.element.querySelector('.conf-step__button-regular');
    resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.element.querySelector('#config-hall-form').reset();

      // const selectedHall = this.element.querySelector('#config-hall-form').elements.update_id.value;

      const selectedHall = localStorage.getItem('hallconfig_update_id');
      console.log(selectedHall);

      const hallButtonsArr = Array.from(this.element.getElementsByClassName('conf-step__radio'));
      const selectedHallButton = hallButtonsArr.find((hallButton) => hallButton.dataset.id === selectedHall);
      selectedHallButton.checked = true;
      this.renderHall(selectedHall);
      // this.update();
    });

    /**
     * Обработчик кликов по элементам, обозначающим места в кинозале
     * производит переключение состояния мест в одно из трех значений
     * стандартное - 'conf-step__chair_standart'
     * VIP - 'conf-step__chair_vip'
     * недоступное - 'conf-step__chair_disabled'
     */
    const chairs = this.element.querySelector('.conf-step__hall-wrapper');
    chairs.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(event.target);
      let eventTarget = event.target;
      if (eventTarget.classList.contains('conf-step__chair_standart')) {
        eventTarget.classList.remove('conf-step__chair_standart');
        eventTarget.classList.add('conf-step__chair_vip');
      } else if (eventTarget.classList.contains('conf-step__chair_vip')) {
        eventTarget.classList.remove('conf-step__chair_vip');
        eventTarget.classList.add('conf-step__chair_disabled');
      } else if (eventTarget.classList.contains('conf-step__chair_disabled')) {
        eventTarget.classList.remove('conf-step__chair_disabled');
        eventTarget.classList.add('conf-step__chair_standart');
      }
    });
  }

  /**
   * Обновление содержимого виджета
   * используется в конструкторе этого класса
   * а так же в Admin.updateWidgets()
   * Запрос данные о зале возможен при наличии авторизации
   */
  update() {
    if (User.current()) {
      Hall.list({name: '.+'}, (err, response) => {
        if (err || !response) {
          return undefined;
        }
        this.clear();
        this.render(response.halls);
      });
    } else if (!User.current()) {
      return undefined;
    }
  }

  /**
   * Вывод горизонтального ряда кнопок,
   * переключающих на определнные залы
   * и вызывающих загрузку в окне конфигурации
   * информацию о зале
   * Переключение на первый - "нулевой" зал
   * отрисовка в окне виджета конфигурации первого зала
   */
  render(halls) {
    for (var key in halls) {
      this.renderItem(key, halls[key]);
    }
    const firstRadiocheck = this.element.getElementsByClassName('conf-step__radio').item('0');
    firstRadiocheck.checked = 'checked';

    // let inputUpdateId = this.element.getElementsByTagName('input').namedItem('update_id');
    // inputUpdateId.value = firstRadiocheck.getAttribute('data-id');

    this.renderHall(firstRadiocheck.getAttribute('data-id'));
  }

  /**
   * Отрисовка информации о зале согласно его ID, переданному в метод
   */
  renderHall(hall_id) {
    Hall.get(hall_id, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }

      localStorage.setItem('hallconfig_update_id', hall_id);
      console.log(localStorage.getItem('hallconfig_update_id'));

      // let inputUpdateId = this.element.getElementsByTagName('input').namedItem('update_id');
      // inputUpdateId.value = hall_id;

      const rowsHall = this.element.querySelector('.conf-step__input-rows');
      const placesHall = this.element.querySelector('.conf-step__input-places');
      rowsHall.value = response.hall['rows'];
      placesHall.value = response.hall['places'];
      this.renderPlaces(rowsHall.value, placesHall.value, response.hall['vip'], response.hall['dis']);
    });
  }

  /**
   * Отрисовка мест согласно переданным параметрам
   * @param  {integer} rows   - количество рядов
   * @param  {integer} places - количество мест в ряду
   * @param  {array} vip - число VIP-мест
   * @param  {[type]} dis - число недоступных мест
   */
  renderPlaces(rows, places, vip, dis) {
    const renderRows = this.element.querySelector('.conf-step__hall-wrapper');
    renderRows.innerHTML = '';
    for (let i = 1; i <= rows; i++) {
      const rendRow = this.getRowHTML();
      for (let y = 1; y <= places; y++) {
        let rendPlace = this.getPlaceHTML(i, y);
        for (let z = 0; z < vip.length; z++) {
          if (vip[z][0] == i && vip[z][1] == y) {
            rendPlace.classList.add('conf-step__chair_vip');
            rendPlace.classList.remove('conf-step__chair_standart');
            rendPlace.classList.remove('conf-step__chair_disabled');
          }
        }
        for (let x = 0; x < dis.length; x++) {
          if (dis[x][0] == i && dis[x][1] == y) {
            rendPlace.classList.add('conf-step__chair_disabled');
            rendPlace.classList.remove('conf-step__chair_vip');
            rendPlace.classList.remove('conf-step__chair_standart');
          }
        }
        rendRow.appendChild(rendPlace);
      }
      renderRows.appendChild(rendRow);
    }
  }

  /**
   * Отрисовка ряда
   */
  getRowHTML() {
    let rowHTML = document.createElement('div');
    rowHTML.classList.add('conf-step__row');
    return rowHTML;
  }

  /**
   * Отрисовка мест в ряду
   */
  getPlaceHTML(row, place) {
    let placeHTML = document.createElement('span');
    placeHTML.classList.add('conf-step__chair', 'conf-step__chair_standart');
    placeHTML.dataset.row=`${row}`;
    placeHTML.dataset.place=`${place}`;
    return placeHTML;

  }

  /**
   * Очистка содержимого виджета перед наполнением обновленной информацией
   */
  clear() {
    const deletableHalls = this.element.querySelector('ul.conf-step__selectors-box');
    deletableHalls.innerHTML = '';
    const deletableRows = this.element.querySelector('.conf-step__hall-wrapper');
    deletableRows.innerHTML = '';
  }

  /**
   * Добавление "кнопки перключения " на конфигурацию зала,
   * указанного в ее названии
   * @param  {String} key  - ID зала
   * @param  {Object} hall - сведения о зале
   */
  renderItem( key, hall ) {
    const hallsList = this.element.querySelector('.conf-step__selectors-box');
    let {
      name,
    } = hall,
    id = key;
    hallsList.innerHTML += this.getHalltHTML({id, name});
  }

  /**
   * Шаблон кнопки
   * @param  {Object} item - объект, содержащий ID и название зала.
   * @return {String} возвращает html-разметку с данными
   */
  getHalltHTML( item ) {
    return `
    <li>
      <input type="radio" class="conf-step__radio" name="chairs-hall" value="${item.name}" data-id="${item.id}" form="config-hall-form">
      <span class="conf-step__selector">${item.name}</span>
    </li>
    `;
  }
}
