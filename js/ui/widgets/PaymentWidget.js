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
    const ticketCost = this.element.querySelector('.ticket__cost');
    const ticketGuid = localStorage.getItem('ticket_guid');
    console.log(ticketGuid);
    Ticket.get(ticketGuid, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }
      const ticketData = {};
      ticketData.places = [];
      for (let place in response.ticket.places) {
        ticketData.places.push(response.ticket.places[place]);
      }
      // console.log(ticketData.places);
      // console.log(response.ticket.places);
      Session.get(response.ticket.session_id, {}, (err, response) => {
        if (err || !response) {
          return undefined;
        }
        ticketData.start_time = response.session.start_time;

        Hall.get(response.session.hall_id, {}, (err, response) => {
          if (err || !response) {
            return undefined;
          }
          ticketData.hall = response.hall.name;
          ticketData.vip_price = response.hall.vip_price;
          ticketData.std_price = response.hall.std_price;

        });

        Movie.get(response.session.film_id, {}, (err, response) => {
          if (err || !response) {
            return undefined;
          }
          ticketData.film = response.movie.name;
          ticketTitle.innerText = ticketData.film;
          ticketHall.innerText = ticketData.hall;
          ticketStart.innerText = ticketData.start_time;

          // console.log(ticketData.vip_price);
          const ticketPlaces = ticketData.places;
          let ticketPlacesCost = ticketPlaces.reduce(function(summ, place) {
            // console.log(place);
            if (place.vip === true) {
              summ += ticketData.vip_price;
            } else {
              summ += ticketData.std_price;
            }
            // console.log(summ);
            return summ;
          }, 0);
          ticketCost.innerText = ticketPlacesCost;
          ticketData.cost = ticketPlacesCost;
          ticketChairs.innerText = ticketPlaces.reduce(function(summString, place) {
            summString += `${place.place} (ряд ${place.row}) `;
            return summString;
          }, '');
          ticketData.placesText = ticketChairs.innerText;
          // for (let i in ticketPlaces) {
          //   console.log(ticketPlaces[i]);
          // }
          // console.log(ticketPlacesCost);
          // console.log(ticketData);
          localStorage.setItem('ticket_data', JSON.stringify(ticketData));
          console.log(localStorage.getItem('ticket_data'));
          // console.log(JSON.parse(localStorage.getItem('ticket_data')));
        });
      });
    });
  }

}