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
    // this.inputUpdateId = this.element.getElementsByTagName('input').namedItem('update_id')
  }
  registerEvents() {
    // const checkedHall = this.element.getElementsByClassName('conf-step__radio');
    // console.log(inputUpdateId);
    this.element.addEventListener('input', (event) => {
      event.preventDefault();
      console.log(event);
      let target = event.target;
      // let inputUpdateId = this.element.getElementsByTagName('input').namedItem('update_id');
      // inputUpdateId.value = target.dataset.id;
      if (target.classList.contains('conf-step__radio')) {
        // console.log(target.value + ' ' + target.name);
        this.renderHall(target.dataset.id);
        // this.renderHall(target.value);
        // Hall.get(target.value, {}, (err, response) => {
        //   if (err || !response) {
        //     return undefined;
        //   }
        //   console.log(response.hall['rows'] + ' x ' + response.hall['places']);
        //   const rowsHall = this.element.querySelector('.conf-step__input-rows');
        //   const placesHall = this.element.querySelector('.conf-step__input-places');
        //   rowsHall.value = response.hall['rows'];
        //   placesHall.value = response.hall['places'];
        // });
      }
      // if (target.classList.contains('conf-step__button-accent')) {
      //   console.log('Pressed!');
      // }
    });

    const resetButton = this.element.querySelector('.conf-step__button-regular');
    resetButton.addEventListener('click', (event) => {
      console.log('Reset!');
      event.preventDefault();
      this.element.querySelector('#config-hall-form').reset();
      this.update();
      // document.forms['config-hall-form'].reset();
    });

    // const submitHallButton = this.element.querySelector('.conf-step__button-accent');
    // submitHallButton.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   console.log('Pressed!');
    // });

    // const submitHallButton = this.element.querySelector('.conf-step__button-accent');
    // console.log(submitHallButton);
    // submitHallButton.addEventListener('submit', (event) => {
    //   console.log('Button pressed!');
    // });
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
    // firstRadiocheck.setAttribute('checked', 'checked');
    // console.log(firstRadiocheck.getAttribute('value
    let inputUpdateId = this.element.getElementsByTagName('input').namedItem('update_id');
    inputUpdateId.value = firstRadiocheck.getAttribute('data-id');
    this.renderHall(firstRadiocheck.getAttribute('data-id'));
    // Hall.get(firstRadiocheck.getAttribute('value'), {}, (err, response) => {
    //   if (err || !response) {
    //     return undefined;
    //   }
    //   // console.log(response.hall['rows'] + ' x ' + response.hall['places']);
    //   const rowsHall = this.element.querySelector('.conf-step__input-rows');
    //   const placesHall = this.element.querySelector('.conf-step__input-places');
    //   rowsHall.value = response.hall['rows'];
    //   placesHall.value = response.hall['places'];
    // });
  }

  renderHall(hall_id) {
    Hall.get(hall_id, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      // console.log(response.hall['rows'] + ' x ' + response.hall['places']);
      let inputUpdateId = this.element.getElementsByTagName('input').namedItem('update_id');
      inputUpdateId.value = hall_id;
      const rowsHall = this.element.querySelector('.conf-step__input-rows');
      const placesHall = this.element.querySelector('.conf-step__input-places');
      rowsHall.value = response.hall['rows'];
      placesHall.value = response.hall['places'];
    });
  }

  clear() {
    const deletableHalls = this.element.querySelector('ul.conf-step__selectors-box');
    // console.log(deletableHalls);
    deletableHalls.innerHTML = '';
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
    // <input type="radio" class="conf-step__radio" name="chairs-hall" value="${item.id}" form="config-hall-form" checked>
    // <li>${item.name}
    //   <button class="conf-step__button conf-step__button-trash" name="remove_id" value="${item.id}" data-id="${item.id}" form="delete-hall-form"></button>
    // </li>
  }

}
