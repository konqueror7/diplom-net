/**
 * Выводит список залов и обрабатывает
 * события во вкладке "Управление залами"
 * страницы 'admin'
 */

class HallsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      if (target.classList.contains('conf-step__button-accent')) {
        Admin.getModal('add_hall').open();
      }

      if (target.classList.contains('conf-step__button-trash')) {
        event.preventDefault();
        console.log(event.target.closest('li').textContent);
        const target = event.target;
        Admin.getForm('delete_hall').renderHallName(target);
        Admin.getForm('delete_hall').getTarget(target);
        Admin.getModal('delete_hall').open();
      }
    });
  }

  update() {
    if (User.current()) {
      Hall.list({name: '.+'}, (err, response) => {
        if (err || !response ) {
          return undefined;
        }
        this.clear();
        this.render(response.halls);
      });
    } else if (!User.current()) {
      return undefined;
    }
  }

  render( halls ) {
    for (var key in halls) {
      this.renderItem(key, halls[key]);
    }
  }

  clear() {
    const deletableHalls = this.element.querySelector('ul.conf-step__list');
    deletableHalls.innerHTML = '';
  }

  renderItem( key, hall ) {
    const hallsList = this.element.querySelector('.conf-step__list');
    let {
      name,
    } = hall,
    id = key;
    hallsList.innerHTML += this.getHalltHTML({id, name});
  }

  getHalltHTML( item ) {
    return `
    <li>${item.name}
      <button class="conf-step__button conf-step__button-trash" name="remove_id" value="${item.id}" data-id="${item.id}" form="delete-hall-form"></button>
    </li>
    `;
  }
}
