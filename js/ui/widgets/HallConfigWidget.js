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

  registerEvents() {
    this.element.addEventListener('input', (event) => {
      event.preventDefault();
      console.log(event);
      let target = event.target;
      if (target.classList.contains('conf-step__radio')) {
        this.renderHall(target.dataset.id);
      }
    });

    const resetButton = this.element.querySelector('.conf-step__button-regular');
    resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.element.querySelector('#config-hall-form').reset();
      this.update();
    });
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

  render(halls) {
    for (var key in halls) {
      this.renderItem(key, halls[key]);
    }
    const firstRadiocheck = this.element.getElementsByClassName('conf-step__radio').item('0');
    firstRadiocheck.checked = 'checked';
    let inputUpdateId = this.element.getElementsByTagName('input').namedItem('update_id');
    inputUpdateId.value = firstRadiocheck.getAttribute('data-id');
    this.renderHall(firstRadiocheck.getAttribute('data-id'));
  }

  renderHall(hall_id) {
    Hall.get(hall_id, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      let inputUpdateId = this.element.getElementsByTagName('input').namedItem('update_id');
      inputUpdateId.value = hall_id;
      const rowsHall = this.element.querySelector('.conf-step__input-rows');
      const placesHall = this.element.querySelector('.conf-step__input-places');
      rowsHall.value = response.hall['rows'];
      placesHall.value = response.hall['places'];
      this.renderPlaces(rowsHall.value, placesHall.value, response.hall['vip'], response.hall['dis']);
    });
  }

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

  getRowHTML() {
    let rowHTML = document.createElement('div');
    rowHTML.classList.add('conf-step__row');
    return rowHTML;
  }

  getPlaceHTML(row, place) {
    let placeHTML = document.createElement('span');
    placeHTML.classList.add('conf-step__chair', 'conf-step__chair_standart');
    placeHTML.dataset.row=`${row}`;
    placeHTML.dataset.place=`${place}`;
    return placeHTML;

  }

  clear() {
    const deletableHalls = this.element.querySelector('ul.conf-step__selectors-box');
    deletableHalls.innerHTML = '';
    const deletableRows = this.element.querySelector('.conf-step__hall-wrapper');
    deletableRows.innerHTML = '';
  }

  renderItem( key, hall ) {
    const hallsList = this.element.querySelector('.conf-step__selectors-box');
    let {
      name,
    } = hall,
    id = key;
    hallsList.innerHTML += this.getHalltHTML({id, name});
  }

  getHalltHTML( item ) {
    return `
    <li>
      <input type="radio" class="conf-step__radio" name="chairs-hall" value="${item.name}" data-id="${item.id}" form="config-hall-form">
      <span class="conf-step__selector">${item.name}</span>
    </li>
    `;
  }
}
