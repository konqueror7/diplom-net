class BuyingWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    // console.log(localStorage.getItem('session_id'));
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const buyingSchemeWrapper = this.element.querySelector('.buying-scheme__wrapper');
    buyingSchemeWrapper.addEventListener('click', (event) => {
      event.preventDefault();
      SessionHall.getForm('buying_form').placeSomeSelected();
      let eventTarget = event.target;
      if (eventTarget.classList.contains('buying-scheme__chair') && !eventTarget.classList.contains('buying-scheme__chair_disabled') && !eventTarget.classList.contains('buying-scheme__chair_taken')) {
        eventTarget.classList.toggle('buying-scheme__chair_selected');
      }
    })
  }

  update() {

    const buyingInfo = this.element.querySelector('.buying__info');
    const buyingInfoTitle = this.element.querySelector('.buying__info-title');
    const buyingInfoStart = this.element.querySelector('.buying__info-start');
    const buyingInfoHall = this.element.querySelector('.buying__info-hall');
    const buyingSchemeLegendValueStdPrice = this.element.querySelector('.buying-scheme__legend-value.std-price');
    const buyingSchemeLegendValueVipPrice = this.element.querySelector('.buying-scheme__legend-value.vip-price');
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
        Ticket.list({session_id: sessionId}, (err, response) => {
          if (err || !response ) {
            return undefined;
          }
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
        takenArray.push(placesInTicket[place])
      }
    }
    for (let i in takenArray) {
      console.log(takenArray[i].row + ' ' + takenArray[i].place);
    }

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

    const renderRowsPLacesArray = Array.from(renderRows.getElementsByClassName('buying-scheme__chair'));
    for (let i in takenArray) {
      let takenPlace = renderRowsPLacesArray.find((element) => {
        if (element.dataset.row === takenArray[i].row && element.dataset.place === takenArray[i].place) {
          console.log(element);
          return element;
        }
      });
      takenPlace.classList.remove('buying-scheme__chair_vip');
      takenPlace.classList.remove('buying-scheme__chair_standart');
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
    placeHTML.dataset.row=`${row}`;
    placeHTML.dataset.place=`${place}`;
    return placeHTML;
  }
}
