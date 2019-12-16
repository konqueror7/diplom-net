/**
 * Класс Client инициализирует DOM-узел, имеющий
 * css-селектор '.movies' на странице 'client/index.html'
 *
 */
class Client {

/**
 * Определяет DOM-узел, в котором будут
 * производиться изменения и применяет метод
 * создающий виджет просмотра сеансов
 */
  static init() {
    this.element = document.querySelector( '.movies' );
    console.log(this.element);
    this.initWidgets();
  }

  /**
   * Метод инициализирует объект widgets
   * содержащий в качестве свойства
   * экземпляр класса ListMoviesWidget -
   * выводящего расписание киносеансов
   */
  static initWidgets() {
    this.widgets = {
      list_movies: new ListMoviesWidget(this.element.querySelector('.list-movies'))
    }
  }

}
