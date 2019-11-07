/**
 * Выводит список фильмов, отображает сеансы и обрабатывает
 * события во вкладке "Сетка сеансов"
 * страницы 'admin'
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

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      // console.log(target);
      if (target.classList.contains('conf-step__button-accent')) {
        Admin.getModal('add_movie').open();
        // console.log('Yes!');
      }
    });
  }

  update() {

  }
}
