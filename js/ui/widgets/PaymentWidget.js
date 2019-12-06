class PaymentWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    console.log(this.element);
    // console.log(localStorage.getItem('session_id'));
    this.registerEvents();
    this.update();
  }

  registerEvents() {

  }

  update() {
    const ticketTitle = this.element.querySelector('.ticket__title');
    const ticketChairs = this.element.querySelector('.ticket__chairs');
    const ticketHall = this.element.querySelector('.ticket__hall');
    const ticketStart = this.element.querySelector('.ticket__start');
    console.log(ticketStart.innerText);
  }

}
