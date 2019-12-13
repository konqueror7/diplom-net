/**
 * Создание записи о новом кинозале -
 * закрывает модальное окно формы
 * создания зала, сбрасывает значения полей формы
 * обновляет страницу Admin
 * @extends AsyncForm
 */
class HallAddForm extends AsyncForm {

  onSubmit( options ) {
    Hall.create(options.data, (err, response) => {
      if (response && response.success === true) {
        Admin.getModal('add_hall').close();
        this.element.reset();
        Admin.update();
      }
    });
  }
}
