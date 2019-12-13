/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Метод устанавливает обработчики событий для html-элемента,
   * указанного в this.element. Запрещает стандартное поведение -
   * отправку данных формы и вызвает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener('submit', event => {
      console.log(event);
      /**
       * Условие проверяющее правильность ввода данных в поля формы
       * скорее всего оно не работает и бесполезно, так как проверку
       * форм не делает
       */
      if (this.element.checkValidity() === false) {
        this.element.reset();
        return;
      }
      event.preventDefault();
      this.submit();
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * и возвращает его
   * */
  getData() {
    let formData = new FormData(this.element);
    let entries = formData.entries();
    const data = {};
    for (let item of entries) {
      data[`${item[0]}`] = `${item[1]}`;
    }
    return data;
  }

  /**
   * "Пустой метод", который имеет разную реализацию
   * в классах для форм, используемых в проекте. Он использует классы
   * User, Hall, Movie, Session, Ticket основанные на Entity
   * @param  {Object} options параметр, содержащий параметры fetch-запроса
   */
  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit({
      'url': this.element.getAttribute('action'),
      'method': this.element.getAttribute('method'),
      'data': this.getData()
    });
  }
}

/**
 * Хост для запросов устанавливается равным Entity.HOST
 */
AsyncForm.HOST = Entity.HOST;
