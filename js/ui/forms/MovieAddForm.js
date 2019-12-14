/**
 * Форма добавления фильма в список фильмов в виджете
 * 'Сетка сеансов'
 * @extends AsyncForm
 */
class MovieAddForm extends AsyncForm {

  /**
   * Устанавливает два обработчика
   * события отправки формы
   * и клика по кнопке 'Отмена' -
   * класс 'conf-step__button-regular'
   * @return {[type]} [description]
   */
  registerEvents() {
    this.element.addEventListener('submit', event => {
      console.log(event);
      if (this.element.checkValidity() === false) {
        this.element.reset();
        return;
      }
      event.preventDefault();
      this.submit();
    });
    const butttonReset = this.element.querySelector('.conf-step__button-regular');
    butttonReset.addEventListener('click', event => {
      this.element.reset();
    });
  }

  /**
   * Подготавливает объект, содержащий информацию о фильме
   * подготавливает изображение постера для отправки в виде объекта класса File
   * @return {[type]} [description]
   */
  getData() {
    let formData = new FormData(this.element);
    let image = this.element.getElementsByTagName('input').namedItem('poster').files[0];
    let imageName = image.name;
    let imblob = new File([image], imageName);
    let entries = formData.entries();
    const data = {};
    for (let item of entries) {
      if (item[0] === 'poster') {
        data[`${item[0]}`] = imblob;
      } else {
        data[`${item[0]}`] = `${item[1]}`;
      }
      console.log(item);
    }
    console.log(data);
    return data
  }

  /**
   * Отправляет запрос на создание записи о фильме
   * закрывает модальное окно формы
   * сбрасывает значения полей
   * и обновляет виджет сетки сеансов на странице 'admin'
   */
  onSubmit( options ) {
    Movie.create(options.data, (err, response) => {
      if (response && response.success === true) {
        Admin.getModal('add_movie').close();
        this.element.reset();
        Admin.getWidget('sessions_grid_config').updateConfStepMovies();
      }
    });
  }
}
