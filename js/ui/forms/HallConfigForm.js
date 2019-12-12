/**
 * Для этого класса необходмио во вкладке
 * "Конфигурация залов" заключить элементы формы в тег 'form'
 */
class HallConfigForm extends AsyncForm {

  mapHTML(arrHTML) {
    return arrHTML.map((item) => [item.dataset.row, item.dataset.place]);
  }

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
    return data
  }

  onSubmit( options ) {
    Hall.update('', options.data, (err, response) => {
      console.log(options.data);
      if (response && response.success === true) {
        Admin.update();
      }
    });
  }
}
