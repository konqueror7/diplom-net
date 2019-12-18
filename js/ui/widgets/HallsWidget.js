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

  /**
   * Реестр ообработчиков событий
   */
  registerEvents() {

    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      // Клик по элементу "Создать зал" вызывает
      // открытие модального окна для формы добавления зала
      if (target.classList.contains('conf-step__button-accent')) {
        Admin.getModal('add_hall').open();
      }

      // Клик по элементу, содержащему значок в виде мусорной корзины
      // открытие модального окна для формы удаления зала
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


  /**
   * Обновление содержимого виджета "Управление залами"
   */
  update() {
    if (User.current()) {
      Hall.list({name: '.+'}, (err, response) => {
        if (err || !response ) {
          return undefined;
        }

        /**
         * Создание массива ключей объектов неактивных залов
         * @type {Array}
         */
        let inactiveHallsKeys = [];
        for (let key in response.halls) {
          if (response.halls[key].active != true) {
            inactiveHallsKeys.push(key);
          }
        }
        /**
         * Запись этого массива в виде json-строки в localStorage.inactive_halls_keys
         * для последующего использования в форме LogoutForm на последнем этапе
         */
        localStorage.setItem('inactive_halls_keys', JSON.stringify(inactiveHallsKeys));

        this.clear();
        this.render(response.halls);
      });
    } else if (!User.current()) {
      return undefined;
    }
  }

  /**
   * Отрисовка списка залов
   */
  render( halls ) {
    for (var key in halls) {
      this.renderItem(key, halls[key]);
    }
  }

  /**
   * Очистка содержимого виджета перед его обновлением
   */
  clear() {
    const deletableHalls = this.element.querySelector('ul.conf-step__list');
    deletableHalls.innerHTML = '';
  }
  /**
   * Отрисовка каждого пункта списка залов по двум параметрам
   * @param  {String} key - ID зала
   * @param  {Object} hall - сведения о зале
   */
  renderItem( key, hall ) {
    const hallsList = this.element.querySelector('.conf-step__list');
    let {
      name,
    } = hall,
    id = key;
    hallsList.innerHTML += this.getHalltHTML({id, name});
  }

  /**
   * Шаблон записи в HTML-списке о зале по параметрам из объекта, содержащего ID и имя зала
   */
  getHalltHTML( item ) {
    return `
    <li>${item.name}
      <button class="conf-step__button conf-step__button-trash" name="remove_id" value="${item.id}" data-id="${item.id}" form="delete-hall-form"></button>
    </li>
    `;
  }
}
