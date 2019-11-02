class HallDeleteForm extends AsyncForm {
  constructor(element, remove_id) {
    super(element);
    this.remove_id = remove_id;
  }
  onSubmit( options ) {
    console.log(options);
    console.log(this.element);
    Hall.remove(this.remove_id, options.data, (err, response) => {
      if (response && response.success === true) {
        Admin.getModal('delete_hall').close();
        this.element.reset();
        Admin.update();
      }
    });
  }
}
