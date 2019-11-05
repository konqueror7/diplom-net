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

  // mapHTML(item) {
  //   return [item.dataset.row, item.dataset.place];
  // }

  mapHTML(arrHTML) {
    return arrHTML.map((item) => [item.dataset.row, item.dataset.place]);
  }

  getData() {
    let formData = new FormData(this.element);
    formData.append('name', formData.get('chairs-hall'));
    // let chairsHall = formData.get('chairs-hall');
    formData.delete('chairs-hall');
    // let stdHTML = document.querySelector('.conf-step__hall-wrapper').getElementsByClassName('conf-step__chair_standart');
    // let vipHTML = document.querySelector('.conf-step__hall-wrapper').getElementsByClassName('conf-step__chair_vip');
    // let disHTML = document.querySelector('.conf-step__hall-wrapper').getElementsByClassName('conf-step__chair_disabled');
    // let stdHTML = Array.from(document.querySelector('.conf-step__hall-wrapper').getElementsByClassName('conf-step__chair_standart'));
    let vipHTML = Array.from(document.querySelector('.conf-step__hall-wrapper').getElementsByClassName('conf-step__chair_vip'));
    let disHTML = Array.from(document.querySelector('.conf-step__hall-wrapper').getElementsByClassName('conf-step__chair_disabled'));
    // console.log(stdHTML);
    // console.log(vipHTML);
    // console.log(disHTML);
    // let placesHTML = document.querySelector('.conf-step__hall-wrapper').getElementsByClassName('conf-step__chair');
    // let seats_arrow = ["Яблоко", "Апельсин", "Слива"];
    // let seats_arrow = {
    //   1: {
    //     row: 1,
    //     place: 2
    //   }
    // };

    let vip = this.mapHTML(vipHTML);

    // let vip = vipHTML.map(function(item) {
    //   return [item.dataset.row, item.dataset.place];
    // });

    // let vip = [
    //   // [1,1],
    //   // [1,2]
    //   // {row: 1, place: 1},
    //   // {row: 2, place: 1}
    // ];

    let dis = this.mapHTML(disHTML);

    // let dis = disHTML.map(function(item) {
    //   return [item.dataset.row, item.dataset.place];
    // });

    // let dis = [
    //   // [2,1],
    //   // [2,2]
    //   // {row: 2, place: 2}
    // ];
    // formData.append('seats_arrow', JSON.stringify(seats_arrow));
    formData.append('vip', JSON.stringify(vip));
    formData.append('dis', JSON.stringify(dis));
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
