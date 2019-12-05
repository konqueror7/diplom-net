class BuyingWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    console.log(localStorage.getItem('session_id'));
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const buyingSchemeWrapper = this.element.querySelector('.buying-scheme__wrapper');
    buyingSchemeWrapper.addEventListener('click', (event) => {
      event.preventDefault();
      // console.log(event.target);
      let eventTarget = event.target;
      if (eventTarget.classList.contains('buying-scheme__chair') && !eventTarget.classList.contains('buying-scheme__chair_disabled') && !eventTarget.classList.contains('buying-scheme__chair_taken')) {
        console.log('Yes!');
        eventTarget.classList.toggle('buying-scheme__chair_selected');
      }
    })
  }

  update() {

    const buyingInfo = this.element.querySelector('.buying__info');
    // console.log(buyingInfo);
    const buyingInfoTitle = this.element.querySelector('.buying__info-title');
    // console.log(buyingInfoTitle);
    const buyingInfoStart = this.element.querySelector('.buying__info-start');
    // console.log(buyingInfoStart);
    const buyingInfoHall = this.element.querySelector('.buying__info-hall');
    // console.log(buyingInfoHall);
    // const buyingSchemeWrapper = this.element.querySelector('.buying-scheme__wrapper');
    // console.log(buyingSchemeWrapper);
    const buyingSchemeLegendValueStdPrice = this.element.querySelector('.buying-scheme__legend-value.std-price');
    console.log(buyingSchemeLegendValueStdPrice);
    const buyingSchemeLegendValueVipPrice = this.element.querySelector('.buying-scheme__legend-value.vip-price');
    console.log(buyingSchemeLegendValueVipPrice);
    const sessionId = localStorage.getItem('session_id');

    Session.get(sessionId, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      const sessionData = response.session;
      buyingInfo.dataset.sessionId = localStorage.getItem('session_id');
      buyingInfoStart.innerText = sessionData.start_time;
      buyingInfoTitle.dataset.filmId = sessionData.film_id;
      buyingInfoHall.dataset.hallId = sessionData.hall_id;

      Movie.get(sessionData.film_id, {}, (err, response) => {
        if (err || !response) {
          return undefined;
        }
        const movieData = response.movie;
        console.log(movieData);
        buyingInfoTitle.innerText = movieData.name;
      });

      Hall.get(sessionData.hall_id, {}, (err, response) => {
        if (err || !response) {
          return undefined;
        }
        console.log(response);
        const hallData = response.hall;
        buyingInfoHall.innerText = hallData.name;
        buyingSchemeLegendValueStdPrice.innerText = hallData.std_price + ' ';
        buyingSchemeLegendValueVipPrice.innerText = hallData.vip_price + ' ';
        // console.log(hallData.vip);
        // console.log(hallData.dis);
        Ticket.list({session_id: sessionId}, (err, response) => {
          if (err || !response ) {
            return undefined;
          }
          // console.log(response);
          const hallDatawithTick = Object.assign({ tickets: response.tickets }, hallData)
          this.renderPlaces(hallDatawithTick);
        });
      });
    });
  }

  renderPlaces(hallDatawithTick) {
    let { rows, places, vip, dis, tickets } = hallDatawithTick;
    let takenArray = [];
    for (let ticket in tickets) {
      let placesInTicket = tickets[ticket]['places'];
      for (let place in placesInTicket) {
        // console.log(placesInTicket[place]);
        takenArray.push(placesInTicket[place])
      }
      // console.log(placesInTicket);
      // console.log(tickets[ticket]['places']);
      // takenArray.push(tickets[ticket].places);
      // takenArray = [...Object.values(tickets[ticket].places)];
      // takenArray.push(Object.values(tickets[ticket].places));
    }
    for (let i in takenArray) {
    // for (var i = 0; i < takenArray.length; i++) {
      console.log(takenArray[i].row + ' ' + takenArray[i].place);
    }
    // console.log(tickets);

    const renderRows = this.element.querySelector('.buying-scheme__wrapper');
    renderRows.innerHTML = '';
    for (let i = 1; i <= rows; i++) {
      const rendRow = this.getRowHTML();
      for (let y = 1; y <= places; y++) {
        let rendPlace = this.getPlaceHTML(i, y);
        rendRow.appendChild(rendPlace);
        for (let z = 0; z < vip.length; z++) {
          if (vip[z][0] == i && vip[z][1] == y) {
            rendPlace.classList.add('buying-scheme__chair_vip');
            rendPlace.classList.remove('buying-scheme__chair_standart');
            rendPlace.classList.remove('buying-scheme__chair_disabled');
          }
        }
        for (let x = 0; x < dis.length; x++) {
          if (dis[x][0] == i && dis[x][1] == y) {
            rendPlace.classList.add('buying-scheme__chair_disabled');
            rendPlace.classList.remove('buying-scheme__chair_vip');
            rendPlace.classList.remove('buying-scheme__chair_standart');
          }
        }
      }
      renderRows.appendChild(rendRow);
    }

    // console.log(renderRows);
    const renderRowsPLacesArray = Array.from(renderRows.getElementsByClassName('buying-scheme__chair'));
    // console.log(renderRowsPLacesArray);
    for (let i in takenArray) {
    // for (var i = 0; i < takenArray.length; i++) {
      // console.log(takenArray[i].row + ' ' + takenArray[i].place);
      let takenPlace = renderRowsPLacesArray.find((element) => {
        if (element.dataset.row === takenArray[i].row && element.dataset.place === takenArray[i].place) {
          console.log(element);
          return element;
        }
      });
      // console.log(takenPlace);
      takenPlace.classList.remove('buying-scheme__chair_vip');
      takenPlace.classList.remove('buying-scheme__chair_standart');
      // takenPlace.classList.remove('buying-scheme__chair_disabled');
      takenPlace.classList.add('buying-scheme__chair_taken');
    }

    return renderRows;
  }

  getRowHTML() {
    let rowHTML = document.createElement('div');
    rowHTML.classList.add('buying-scheme__row');
    return rowHTML;
  }

  getPlaceHTML(row, place) {
    let placeHTML = document.createElement('span');
    placeHTML.classList.add('buying-scheme__chair', 'buying-scheme__chair_standart');
    // placeHTML.classList.add('conf-step__chair', 'conf-step__chair_standart');
    placeHTML.dataset.row=`${row}`;
    placeHTML.dataset.place=`${place}`;
    return placeHTML;
  }
}
