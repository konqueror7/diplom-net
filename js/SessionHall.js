class SessionHall {

  static init() {
    this.element = document.querySelector( '.buying' );
    // console.log(this.element);
    this.initWidgets();
  }

  static initWidgets() {
    this.widgets = {
      buying_place: new BuyingWidget(this.element)
    }
  }
}
