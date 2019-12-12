class LoginWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
  }
  clear() {
    this.element.innerHTML = ''
  }
}
