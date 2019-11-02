/**
 * Для этого класса необходмио во вкладке
 * "Конфигурация залов" заключить элементы формы в тег 'form'
 */
class HallConfigForm extends AsyncForm {
  // constructor(element, update_id) {
  //   super(element);
  //   this.update_id = update_id;
  //   // console.log(this.element);
  // }

  getData() {
    let formData = new FormData(this.element);
    formData.append('name', formData.get('chairs-hall'));
    // let chairsHall = formData.get('chairs-hall');
    formData.delete('chairs-hall');
    // formData.append('name', chairsHall);
    let entries = formData.entries();
    const data = {};
    for (let item of entries) {
      data[`${item[0]}`] = `${item[1]}`;
    }
    console.log(data);
    return data
  }

  onSubmit( options ) {
    // console.log(options.data);
    // console.log(this.element);
    Hall.update('', options.data, (err, response) => {
    // Hall.update(this.update_id, options.data, (err, response) => {
      if (response && response.success === true) {
        // Admin.getModal('delete_hall').close();
        // this.element.reset();
        Admin.update();
      }
    });
  }
}
