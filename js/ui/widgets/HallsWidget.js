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
      // console.log(target);
      if (target.classList.contains('conf-step__button-accent')) {
        Admin.getModal('add_hall').open();
        // console.log('Yes!');
      }

      if (target.classList.contains('conf-step__button-trash')) {
        event.preventDefault();
        console.log(event.target.closest('li').textContent);
        const target = event.target;
        // console.log('Yes!');
        Admin.getForm('delete_hall').renderHallName(target);
        Admin.getForm('delete_hall').getTarget(target);
        Admin.getModal('delete_hall').open();
        // console.log(Admin.getModal('delete_hall'));
        // this.onSelectAccount(target.closest('.account'));
        // removeHallForm;
      }

      // if (target.classList.contains('conf-step__button-trash')) {
      //   event.preventDefault();
      //   console.log(event.target);
      //   // console.log('Yes!');
      //   Admin.getModal('delete_hall').open();
      //   // console.log(Admin.getModal('delete_hall'));
      //   const removeHallForm = new HallDeleteForm(document.querySelector('#delete-hall-form'), event.target.value);
      //   // this.onSelectAccount(target.closest('.account'));
      //   removeHallForm;
      // }
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
        // console.log(response);
      });
    } else if (!User.current()) {
      return undefined;
    }
  }
  
  render( halls ) {
    // console.log(halls);
    for (var key in halls) {
      this.renderItem(key, halls[key]);
    }
    // halls.forEach(hall => this.renderItem(hall));
  }

  clear() {
    const deletableHalls = this.element.querySelector('ul.conf-step__list');
    // console.log(deletableHalls);
    deletableHalls.innerHTML = '';
  }

  // clear() {
  //   const deletableHalls = this.element.querySelector('ul.conf-step__list').querySelector('li');
  //   console.log(deletableHalls);
  //   // const deletableHallsArray = Array.from(deletableHalls);
  //   // if (deletableHallsArray.length > 0) {
  //   //   deletableHallsArray.forEach(hall => hall.remove());
  //   // } else {
  //   //   return;
  //   // }
  // }

  renderItem( key, hall ) {
    // console.log(hall);
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
    // <button class="conf-step__button conf-step__button-trash" data-id="${item.id}"></button>
    // <button class="conf-step__button conf-step__button-trash" form="delete-hall-form" data-id="${item.id}"></button>
  }
}
