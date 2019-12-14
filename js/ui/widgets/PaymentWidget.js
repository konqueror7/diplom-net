/**
 * Извлекает информацию о билете на сеанс из файлов
 * Выводит ее на экран монитора
 * записывает ее в формате json-строки
 * в элемент 'ticket_data' в localStorage
 */
class PaymentWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.update();
  }

  update() {
    /**
    * Извлечение ID билета из элемента 'ticket_guid' в localStorage
    * @type {String}
    */
    const ticketGuid = localStorage.getItem('ticket_guid');

    /**
     * Определение DOM-элементов, в которые будет выводиться
     * информация о билете
     */
    const ticketTitle = this.element.querySelector('.ticket__title');
    const ticketChairs = this.element.querySelector('.ticket__chairs');
    const ticketHall = this.element.querySelector('.ticket__hall');
    const ticketStart = this.element.querySelector('.ticket__start');
    const ticketCost = this.element.querySelector('.ticket__cost');

    /**
     * Запрос к tickets.json извлекает информацию о билете по ID
     * в переменной ticketGuid
     */

    Ticket.get(ticketGuid, {}, (err, response) => {
      if (err || !response) {
        return undefined;
      }

      /** ticketData - переменная-объект, куда будут записываться
      * значения полей записей и которая потом сохраняется
      * в элемент 'ticket_data' массива 'localStorage'
      * для использования на странице '/client/ticket.html'
      * @type {Object}
      */
      const ticketData = {};
      ticketData.places = [];

      for (let place in response.ticket.places) {
        ticketData.places.push(response.ticket.places[place]);
      }

      /**
       * Запрос к sessions.json извлекает по ID запись о сеансе
       */
      Session.get(response.ticket.session_id, {}, (err, response) => {
        if (err || !response) {
          return undefined;
        }
        ticketData.start_time = response.session.start_time;

        /**
         * Запрос к 'data/halls.json' извлекает по ID запись о зале
         */
        Hall.get(response.session.hall_id, {}, (err, response) => {
          if (err || !response) {
            return undefined;
          }
          ticketData.hall = response.hall.name;
          ticketData.vip_price = response.hall.vip_price;
          ticketData.std_price = response.hall.std_price;

        });

        /**
         * Запрос к 'data/movies.json' извлекает по ID запись о фильме
         */
        Movie.get(response.session.film_id, {}, (err, response) => {
          if (err || !response) {
            return undefined;
          }
          ticketData.film = response.movie.name;
          ticketTitle.innerText = ticketData.film;
          ticketHall.innerText = ticketData.hall;
          ticketStart.innerText = ticketData.start_time;

          const ticketPlaces = ticketData.places;

          /**
           * Подсчет суммарной стоимости выкупаемых мест,
           * @param  {Integer} summ - накопительная переменная
           * @param  {Object} place - объект, содержащий свойства выкупаемого места
           * @return {Integer}       итоговая цена билета
           */
          let ticketPlacesCost = ticketPlaces.reduce(function(summ, place) {
            if (place.vip === true) {
              summ += ticketData.vip_price;
            } else {
              summ += ticketData.std_price;
            }
            return summ;
          }, 0);

          ticketCost.innerText = ticketPlacesCost;

          ticketData.cost = ticketPlacesCost;

          ticketChairs.innerText = ticketPlaces.reduce(function(summString, place) {
            summString += `${place.place} (ряд ${place.row}) `;
            return summString;
          }, '');

          ticketData.placesText = ticketChairs.innerText;

          localStorage.setItem('ticket_data', JSON.stringify(ticketData));
          console.log(localStorage.getItem('ticket_data'));
        });
      });
    });
  }
}
