class HallDeleteForm extends AsyncForm {
  constructor( element ) {
    super(element);
    this.target;
  }

  // constructor(element, remove_id) {
  //   super(element);
  //   this.remove_id = remove_id;
  // }

  getTarget(target) {
    this.target = target;
    console.log(this.target);
  }

  renderHallName(target) {
    const deletableHallName = this.element.querySelector('.conf-step__delete-hall');
    const HallName = target.closest('li').textContent;
    deletableHallName.textContent = `"${HallName}"`;
  }

  onSubmit( options ) {
    console.log(options);
    console.log(this.target.value);
    Hall.remove(this.target.value, options.data, (err, response) => {
      if (response && response.success === true) {
        Admin.getModal('delete_hall').close();
        this.element.reset();
        Admin.update();
      }
    });
  }

  // onSubmit( options ) {
  //   console.log(options);
  //   console.log(this.element);
  //   Hall.remove(this.remove_id, options.data, (err, response) => {
  //     if (response && response.success === true) {
  //       Admin.getModal('delete_hall').close();
  //       this.element.reset();
  //       Admin.update();
  //     }
  //   });
  // }
}
