/**
 * Класс применяется для создания объекта Film классом SessionsGridWidget
 * при нажатии событии mousedown над HNML-элементом, имеющим css-класс 'conf-step__movie'
 */
class Film {
  /**
   * Создание объекта Film и заполнение его свойства
   * с помощью методов
   * @param {[type]} element - HTML-элемент, содержащий информацию о фильме
   */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.name = this.getName();
    this.duration = this.getDuration();
    this.movieId = this.getMovieId();
  }
  /**
   * Извлечение названия фильма
   * @return {String} возвращает содержимое свойства innerText
   * элемента с классом 'conf-step__movie-title'
   */
  getName() {
    return this.element.querySelector('.conf-step__movie-title').innerText;
  }
  /**
   * Извлечение продолжительности фильма
   * @return {String} возвращает содержимое свойства innerText
   * элемента с классом 'conf-step__movie-duration_value'
   */
  getDuration() {
    return this.element.querySelector('.conf-step__movie-duration_value').innerText;
  }
  /**
   * Извлечение ID фильма из dataset-атрибута 'data-id'
   * @return {[type]} Возвращает значение атрибута data-id элемента в this.element
   */
  getMovieId() {
    return this.element.dataset.id;
  }
}
