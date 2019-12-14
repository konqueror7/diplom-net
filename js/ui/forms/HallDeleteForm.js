/**
 * Обслуживает форму удаления зала на странице 'admin'
 * в виджете
 * @extends AsyncForm
 */
class HallDeleteForm extends AsyncForm {

  /**
   * Конструктор создает объект со свойствами наслеуемыми у AsyncForm
   * и добавляет к нему свойство target цель клика из его обработчика
   * @param {[type]} element - html-элемент с cs-селtктором #halls
   */
  constructor( element ) {
    super(element);
    this.target;
  }

  /**
   * Передает в класс HallDeleteForm цель события клика по иконке удаления зала
   * в виджете "Управление залами" используется в классе HallsWidget
   * в обработчике клика по элементу с классом 'conf-step__button-trash'
   * @param  {[type]} target - цель события из обработчика
   */
  getTarget(target) {
    this.target = target;
    console.log(this.target);
  }

  /**
   * Добавляет в форму удаления зала его название
   * @param  {[type]} target - цель события из обработчика
   */
  renderHallName(target) {
    const deletableHallName = this.element.querySelector('.conf-step__delete-hall');
    const HallName = target.closest('li').textContent;
    deletableHallName.textContent = `"${HallName}"`;
  }

/**
 * Отправляет запрос об удалении записи зала из halls.json
 * @param  {[type]} options - настройки запроса
 */
  onSubmit( options ) {
    console.log(options);
    console.log(this.target.value);
    Hall.remove(this.target.value, options.data, (err, response) => {
      if (response && response.success === true) {
        Admin.getModal('delete_hall').close();
        this.element.reset();
        Admin.update();
      }
    });
  }

}
