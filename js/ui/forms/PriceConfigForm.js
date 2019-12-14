/**
 * Обслуживает форму с css-селектором '#config-price-form'
 * в виджете 'Конфигурация цен' на странице admin
 */

class PriceConfigForm extends AsyncForm {
  /**
   * Собирает данные для отправки,
   * копирует свойство 'prices-hall'
   * в 'name'
   */
  getData() {
    let formData = new FormData(this.element);
    formData.append('name', formData.get('prices-hall'));
    formData.delete('prices-hall');
    let entries = formData.entries();
    const data = {};
    for (let item of entries) {
      data[`${item[0]}`] = `${item[1]}`;
    }
    console.log(data);
    return data
  }

  /**
   * Обновляет цены в записи о зале а также виджет
   * 'Конфигурация цен'
   */
  onSubmit(options) {
    Hall.update(localStorage.getItem('price_config_update_id'), options.data, (err, response) => {
    // Hall.update('', options.data, (err, response) => {
      if (response && response.success === true) {
        Admin.getWidget('price_config').renderHall(localStorage.getItem('price_config_update_id'));
        // Admin.getWidget('price_config').renderHall(options.data.update_id);
        // Admin.getWidget('price_config').update();
      }
    });
  }
}
