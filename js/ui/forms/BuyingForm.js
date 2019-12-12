class BuyingForm extends AsyncForm {

  registerEvents() {
    const submitButton = this.element.querySelector('.acceptin-button');
    submitButton.addEventListener('click', (event) => {
      console.log(event);
      // event.preventDefault();
    });

    this.element.addEventListener('submit', event => {
      console.log(event);
      event.preventDefault();
      const formData = new FormData(this.element);
      console.log(formData.get('some_selected'));
      if (formData.get('some_selected') != 'true') {
        this.element.reset();
        let buyingFormHintDel = this.element.querySelector('.buying__form-hint');
        if (buyingFormHintDel) {
          buyingFormHintDel.remove();
        }
        let buyingFormHintAdd = document.createElement('div');
        buyingFormHintAdd.classList.add('buying__form-hint');
        buyingFormHintAdd.innerHTML = '<p>Пожалуйста, выберите хотя бы одно место</p>';
        this.element.insertAdjacentElement('afterbegin', buyingFormHintAdd);
      } else {
        this.submit();
      }
    });
  }

  placeSomeSelected() {
    const someSelected = this.element.elements.some_selected;
    someSelected.value = true;
  }

  getData() {
    const buyingSchemeWrapper = document.querySelector('.buying-scheme__wrapper');
    const buyingSchemeChairSelected = Array.from(buyingSchemeWrapper.getElementsByClassName('buying-scheme__chair_selected'));
    const data = {};
    data.session_id = localStorage.getItem('session_id');
    let places = {};
    for (let item in buyingSchemeChairSelected) {
      let namePlace = `${item}`;
      places[namePlace] = {};
      places[namePlace]['row'] = buyingSchemeChairSelected[item].dataset.row;
      places[namePlace]['place'] = buyingSchemeChairSelected[item].dataset.place;
      buyingSchemeChairSelected[item].classList.contains('buying-scheme__chair_vip') ? places[namePlace]['vip'] = true : places[namePlace]['vip'] = false;
    }
    data.places = JSON.stringify(places);
    return data;
  }

  onSubmit( options ) {
    console.log(options.data);
    Ticket.create(options.data, (err, response) => {
      if (response && response.success === true) {
        console.log(response);
        localStorage.setItem('ticket_guid', response.ticket);
        SessionHall.update();
        document.location.href = Entity.HOST + '/client/payment.html';
      }
    });
  }
}
