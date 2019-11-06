/**
 * Выводит цены и обрабатывает
 * события во вкладке "Конфигурация цен"
 * страницы 'admin'
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

  registerEvents() {
    this.element.addEventListener('input', (event) => {
      event.preventDefault();
      let target = event.target;
      if (target.classList.contains('conf-step__radio')) {
        this.renderHall(target.dataset.id);
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
