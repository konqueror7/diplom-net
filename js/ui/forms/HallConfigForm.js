/**
 * Класс обслуживает форму в виджете 'Конфигурация залов'
 * Для этого класса необходимо во вкладке
 * "Конфигурация залов" заключить элементы формы в тег 'form'
 */
class HallConfigForm extends AsyncForm {

  /**
   * Извлекает в новый массив значения data-set-атрибуты HTML-элементов
   * из другого массива
   * @param  {Array} arrHTML массив HTML-элементов
   */
  mapHTML(arrHTML) {
    return arrHTML.map((item) => [item.dataset.row, item.dataset.place]);
  }

  /**
   * Создание массива vip с координатами VIP-мест
   * Создание массива dis с координатами недоступных мест
   * перевод их в json-формат
   * @return {Object} возвращает объект с данными в виде json-строк
   */
  getData() {
    let formData = new FormData(this.element);
    formData.append('name', formData.get('chairs-hall'));
    formData.delete('chairs-hall');
    let vipHTML = Array.from(document.querySelector('.conf-step__hall-wrapper').getElementsByClassName('conf-step__chair_vip'));
    let disHTML = Array.from(document.querySelector('.conf-step__hall-wrapper').getElementsByClassName('conf-step__chair_disabled'));
    let vip = this.mapHTML(vipHTML);
    let dis = this.mapHTML(disHTML);
    formData.append('vip', JSON.stringify(vip));
    formData.append('dis', JSON.stringify(dis));
    let entries = formData.entries();
    const data = {};
    for (let item of entries) {
      data[`${item[0]}`] = `${item[1]}`;
    }
    console.log(data);
    return data;
  }

  /**
   * Обновляет запись о зале в halls.json
   * обновляет содержимое страницы admin
   */
  onSubmit( options ) {
    Hall.update(localStorage.getItem('hallconfig_update_id'), options.data, (err, response) => {
    // Hall.update('', options.data, (err, response) => {
      console.log(options.data);
      if (response && response.success === true) {
        Admin.getWidget('hall_config').renderHall(localStorage.getItem('hallconfig_update_id'));
        // Admin.getWidget('hall_config').renderHall(options.data.update_id);
        // Admin.getWidget('hall_config').update();
      }
    });
  }
}
