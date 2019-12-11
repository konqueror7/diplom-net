class BuyingForm extends AsyncForm {

  registerEvents() {
    this.element.addEventListener('submit', event => {
      console.log(event);
      if (this.element.checkValidity() === false) {
        this.element.reset();
        return;
      }
      // console.log(this.getData().places);
      // if (Object.keys(this.getData().places === {})) {
      //   alert('Выберите место!');
      //   this.element.reset();
      //   return;
      // }
      // else {
      // }
      event.preventDefault();
      this.submit();
      // console.log('Yes');
    });
  }

  getData() {
    const buyingSchemeWrapper = document.querySelector('.buying-scheme__wrapper');
    const buyingSchemeChairSelected = Array.from(buyingSchemeWrapper.getElementsByClassName('buying-scheme__chair_selected'));
    // console.log(buyingSchemeChairSelected);
    const data = {};
    data.session_id = localStorage.getItem('session_id');
    // let places;
    let places = {};
    for (let item in buyingSchemeChairSelected) {
      // console.log(item);
      // console.log(buyingSchemeChairSelected[item].dataset.row);
      let namePlace = `${item}`;
      // console.log(namePlace);
      // data['places'] = {};
      places[namePlace] = {};

      places[namePlace]['row'] = buyingSchemeChairSelected[item].dataset.row;
      places[namePlace]['place'] = buyingSchemeChairSelected[item].dataset.place;
      buyingSchemeChairSelected[item].classList.contains('buying-scheme__chair_vip') ? places[namePlace]['vip'] = true : places[namePlace]['vip'] = false;

      // if (buyingSchemeChairSelected[item].classList.contains('buying-scheme__chair_vip')) {
      //   places[namePlace]['vip'] = true;
      // } else {
      //   places[namePlace]['vip'] = false;
      // }
      // console.log(item.dataset.place);
      // console.log(item.classList);
      // data.places[] += {row: buyingSchemeChairSelected[item].dataset.row};
      // data.places[] += {place: buyingSchemeChairSelected[item].dataset.place};
    }

    data.places = JSON.stringify(places);

    // data['session_id'] = localStorage.getItem('session_id');
    console.log(data);
    return data;
  }

  onSubmit( options ) {
    console.log(options.data);


    Ticket.create(options.data, (err, response) => {
      if (response && response.success === true) {
        console.log(response);
        localStorage.setItem('ticket_guid', response.ticket);
        // console.log(localStorage.getItem('ticket_guid'));
        SessionHall.update();
        document.location.href = Entity.HOST + '/client/payment.html';

        // document.location.href = AsyncForm.HOST + '/client/payment';
        // document.location.href = 'http://diplom-net/client/payment';
        // Admin.getModal('add_hall').close();
        // this.element.reset();
        // Admin.update();
      }
    });
  }
}
