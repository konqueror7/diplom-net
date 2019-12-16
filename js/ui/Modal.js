/**
 * Предоставляет методы работы и обработчики
 * событий для модальных окон, в которых
 * открываются HTML-формы сайта
 */
class Modal {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Реестр обработчиков событий
   */
  registerEvents() {
    /**
     * Установка в качестве контекста выполнения
     * метода this.onClose объект класса Modal
     * а не событие, вызывающее этот метод
     */
    this.onClose = this.onClose.bind(this);
    /**
     * Создание массива DOM-элементов, закрывающих модальное окно
     * @type {Array}
     */
    const buttonsCancelArray = [...this.element.getElementsByClassName('conf-step__button-regular'), ...this.element.getElementsByClassName('popup__dismiss')];
    /**
     * Назначение для каждого элемента массива buttonsCancelArray
     * в качестве обработчика метода this.onClose у которого в качестве контекста
     * выступает объект класса Modal
     */
    for (let button of buttonsCancelArray) {
      button.addEventListener('click', this.onClose);
    }
  }

  /**
   * Метод отключает стандартную реакцию
   * на событие и вызывает метод this.close
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  onClose(e) {
    e.preventDefault();
    this.close();
  }

  unregisterEvents() {
    const buttonsCancelArray = [...this.element.getElementsByClassName('conf-step__button-regular'), ...this.element.getElementsByClassName('popup__dismiss')];
    for (let button of buttonsCancelArray) {
      button.removeEventListener('click', this.onClose);
    }
  }

  /**
   * Метод проверяет наличие у модального окна
   * css-класса 'active', который делает его видимым
   * для пользователя
   */
  open() {
    console.log('Open Modal object!');
    this.element.classList.toggle('active');
    this.element.style.top = '0';
    // this.element.style.display = 'block';
  }

  /**
   * Метод удаляет у модального окна
   * css-класс 'active', который делает его видимым
   * для пользователя
   */
  close() {
    this.element.classList.toggle('active');
    this.element.style.top = '';
  }
}
