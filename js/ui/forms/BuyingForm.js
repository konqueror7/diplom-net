/**
 * Форма для отправки данных о выбранных пользователем мест
 * в кинозале на выбранный сеанс
 * @extends AsyncForm
 */

class BuyingForm extends AsyncForm {

  /**
   * Метод устанавливает обработчики событий для html-элемента,
   * указанного в this.element
   */
  registerEvents() {
    /**
     * Обработчик события отправки данных формы с ID 'buying-form'
     */
    this.element.addEventListener('submit', event => {
      console.log(event);
      event.preventDefault();
      /**
       * Объект formData содержит данные скрытого поля 'some_selected'
       * @type {FormData}
       */
      const formData = new FormData(this.element);

      /**
       * Проверяет выбор хотя бы одного места в зале
       * отменяет отправку формы и вставляет в макет формы
       * просьбу о выборе мест.
       * Если места выбраны, то происходит отправка формы
       * @param  {FormData} formData [description]
       */
      if (localStorage.getItem('some_selected') != 'true') {
      // if (formData.get('some_selected') != 'true') {
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

  /**
   * Метод, который устанавливает параметр value
   * скрытого поля 'some_selected' формы 'buying-form'
   * в состояние 'true' или 'false', если есть хотя бы одного
   * выбранное место в кинозале
   * Используется в реестре событий класса BuyingWidget
   */
  placeSomeSelected(chairsWrapper) {
    const chairsArr = Array.from(chairsWrapper.getElementsByClassName('buying-scheme__chair'));
    // console.log(chairsArr);
    // const someSelected = this.element.elements.some_selected;
    localStorage.setItem('some_selected', false);
    console.log(localStorage.getItem('some_selected'));
    const selectedChairs = (chair) => chair.classList.contains('buying-scheme__chair_selected');
    chairsArr.some(selectedChairs) ? localStorage.setItem('some_selected', true) : localStorage.setItem('some_selected', false);
  }

  /**
   * Собирает в объект data данные о сеансе - его ID и список выбранных мест
   * @return {JSON} возвращает данные в JSON-формате
   */
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

  /**
   * Отправка данных формы для создания записи о билете на сеанс,
   * сохрарение в локальное хранилище localStorage ID билета,
   * обновление содержимого страницы 'client/hall'
   * @param  {Object} options настройки для запроса
   */
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
