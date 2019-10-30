class HallAddForm extends AsyncForm {

  onSubmit( options ) {
    Hall.create(options.data, (err, response) => {
      if (response && response.success === true) {
        Admin.getModal('add_hall').close();
        this.element.reset();
        Admin.update();
      }
    });
  }
}
