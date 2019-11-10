class MovieAddForm extends AsyncForm {

  getData() {
    let formData = new FormData(this.element);
    let image = this.element.getElementsByTagName('input').namedItem('image').files[0];
    let imageName = image.name;
    let imblob = new Blob([image]);
    // let imblob = new Blob([image], {type: 'img/png'});
    // console.log(image);
    // formData.delete('image');
    // formData.append('image', image);
    // formData.append('Content-Type', 'false');
    // formData.append('process-Data', 'false');
    let entries = formData.entries();
    const data = {};
    for (let item of entries) {
      if (item[0] === 'image') {
        data[`${item[0]}`] = imblob;
        data['image_name'] = imageName;
      } else {
        data[`${item[0]}`] = `${item[1]}`;
      }
      console.log(item);
    }
    // for (let item of entries) {
    //   data[`${item[0]}`] = `${item[1]}`;
    // }
    console.log(data);
    return data
  }

  onSubmit( options ) {
    Movie.create(options.data, (err, response) => {
      if (response && response.success === true) {
        Admin.getModal('add_movie').close();
        this.element.reset();
        Admin.update();
      }
    });
  }
}
