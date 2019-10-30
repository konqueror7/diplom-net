class Modal {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    // console.log(this);
    // console.log(this.element);
  }

  registerEvents() {
    this.onClose = this.onClose.bind(this);
    const buttonsCancelArray = [...this.element.getElementsByClassName('conf-step__button-regular'), ...this.element.getElementsByClassName('popup__dismiss')];
    for (let button of buttonsCancelArray) {
      button.addEventListener('click', this.onClose);
    }
  }

  onClose(e) {
    e.preventDefault();
    this.close();
  }

  unregisterEvents() {
    const buttonsCancelArray = [...this.element.getElementsByClassName('conf-step__button-regular'), ...this.element.getElementsByClassName('popup__dismiss')];
    for (let button of buttonsCancelArray) {
      button.removeEventListener('click', this.onClose);
    }
  }

  open() {
    console.log('Open Modal object!');
    this.element.classList.toggle('active');
    this.element.style.top = '0';
    // this.element.style.display = 'block';
  }

  close() {
    this.element.classList.toggle('active');
    this.element.style.top = '';
  }
}
