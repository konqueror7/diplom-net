/**
 * Выводит цены и обрабатывает
 * события во вкладке "Конфигурация цен"
 * страницы '/admin' в асинхронном режиме
 */

class PriceConfigWidget {
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
     * Событие ввода в поле формы типа 'radio',
     * стилизованное под кнопку с названием зала
     * вызывает метод renderHall(), в который передается
     * ID зала, указанный в атрибуте поля data-id
     */
    this.element.addEventListener('input', (event) => {
      event.preventDefault();
      let target = event.target;
      if (target.classList.contains('conf-step__radio')) {
        this.renderHall(target.dataset.id);
      }
    });

    /**
     * Клик по кнопке 'Отмена' формы '#config-price-form'
     * вызывает сброс веденных значений в поля формы
     * и обновление содержимого вкладки 'Конфигурация цен'
     * @type {[type]}
     */
    const resetButton = this.element.querySelector('.conf-step__button-regular');
    resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.element.querySelector('#config-price-form').reset();

      // const selectedHall = this.element.querySelector('#config-price-form').elements.update_id.value;

      const selectedHall = localStorage.getItem('price_config_update_id');


      const hallButtonsArr = Array.from(this.element.getElementsByClassName('conf-step__radio'));
      const selectedHallButton = hallButtonsArr.find((hallButton) => hallButton.dataset.id === selectedHall);
      selectedHallButton.checked = true;
      this.renderHall(selectedHall);
    });
  }

  update() {
    if (User.current()) {
      Hall.list({name: '.+'}, (err, response) => {
        if (err || !response) {
          return undefined;
        }
        this.clear();
        this.render(response.halls)
      });
    } else if (!User.current()) {
      return undefined;
    }
  }

  clear() {
    const deletablePrices = this.element.querySelector('ul.conf-step__selectors-box');
    deletablePrices.innerHTML = '';
  }

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

  /*
   * вызывает запрос к halls.json с извлечением
   * записи о зале по его ID
   */
  renderHall(hall_id) {
    Hall.get(hall_id, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }

      localStorage.setItem('price_config_update_id', hall_id);
      console.log(localStorage.getItem('price_config_update_id'));

      // let inputUpdateId = this.element.getElementsByTagName('input').namedItem('update_id');
      // inputUpdateId.value = hall_id;

      const stdPrice = this.element.querySelector('.conf-step__input-std-price');
      const vipPrice = this.element.querySelector('.conf-step__input-vip-price');
      stdPrice.value = response.hall['std_price'];
      vipPrice.value = response.hall['vip_price'];
    });
  }

  renderItem( key, hall ) {
    const hallsList = this.element.querySelector('.conf-step__selectors-box');
    let {
      name,
    } = hall,
    id = key;
    hallsList.innerHTML += this.getHalltHTML({id, name});
  }

  getHalltHTML(item) {
    return `
      <li>
        <input type="radio" class="conf-step__radio" name="prices-hall" value="${item.name}" data-id="${item.id}" form="config-price-form"><span class="conf-step__selector">${item.name}</span>
      </li>
    `;
  }

}
