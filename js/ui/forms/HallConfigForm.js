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
    // let placesHTML = document.querySelector('.conf-step__hall-wrapper').getElementsByClassName('conf-step__chair');
    // let seats_arrow = ["Яблоко", "Апельсин", "Слива"];
    let seats_arrow = {
      1: {
        row: 1,
        place: 2
      }
    };
    formData.append('seats_arrow', JSON.stringify(seats_arrow));
    // console.log(placesHTML);
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
