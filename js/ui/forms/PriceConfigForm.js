/**
 * Для этого класса необходмио во вкладке
 * "Конфигурация цен" заключить элементы формы в тег 'form'
 */

class PriceConfigForm extends AsyncForm {

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

  onSubmit(options) {
    Hall.update('', options.data, (err, response) => {
      if (response && response.success === true) {
        Admin.update();
      }
    });
  }
}
