/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку форму и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    // const inputs = this.element.getElementsByTagName('input');
    // const idElement = this.element.getAttribute('id');
    // const submitButton = document.querySelector(`button[form="${idElement}"]`);
    // // console.log(submitButton);
    // console.log(submitButton);

    // for (let input of inputs) {
    //   if (input.getAttribute('name') === 'name') {
    //     //console.log(input);
    //     input.pattern = '[А-Яа-яA-Za-z0-9 -]{4,}';
    //     input.placeholder += ' (не менее 4-х букв или цифр с пробелом)';
    //     submitButton.addEventListener('click', function (event) {
    //       console.log(input.validity);
    //       if (input.validity.patternMismatch) {
    //         //event.preventDefault();
    //         input.setCustomValidity('Введите имя не менее 4-х букв или цифр с пробелом!');
    //       }
    //       else {
    //         input.setCustomValidity('');
    //       }
    //     });
    //   }
    //   if (input.getAttribute('name') === 'email') {
    //     //console.log(input);
    //     input.pattern = '[a-z0-9._%+\-]+@[a-z0-9\-]{1,}\.[a-z]{2,}$';
    //     input.placeholder += ' (адрес вида address@service.ru)';
    //     submitButton.addEventListener('click', function (event) {
    //       console.log(input.validity);
    //       if (input.validity.patternMismatch) {
    //         //event.preventDefault();
    //         input.setCustomValidity('Введите адрес вида address@service.ru');
    //       }
    //       else {
    //         input.setCustomValidity('');
    //       }
    //     });
    //   }
    //
    //   // if (input.getAttribute('name') === 'sum') {
    //   //   //console.log(input);
    //   //   input.pattern = '[0-9]{1,}';
    //   //   input.placeholder += ' (Только цифры без пробелов и дробной части)';
    //   //   submitButton.addEventListener('click', function (event) {
    //   //     console.log(input.validity);
    //   //     if (input.validity.patternMismatch) {
    //   //       //event.preventDefault();
    //   //       input.setCustomValidity('Введите только цифры без пробелов и дробной части');
    //   //     }
    //   //     else {
    //   //       input.setCustomValidity('');
    //   //     }
    //   //   });
    //   // }
    //
    //   if (input.getAttribute('name') === 'pwd') {
    //     input.pattern = '[^а-яА-Я ]{8,}';
    //     input.placeholder += ' (Любые символы кроме кириллицы и пробела)';
    //     submitButton.addEventListener('click', function (event) {
    //       console.log(input.validity);
    //       if (input.validity.patternMismatch) {
    //         event.preventDefault();
    //         input.setCustomValidity('Введите любые символы кроме кириллицы и пробела');
    //       }
    //       else {
    //         input.setCustomValidity('');
    //       }
    //     });
    //   }
    // }
    this.element.addEventListener('submit', event => {
      if (this.element.checkValidity() === false) {
        console.log(event);
        this.element.reset();
        return;
      }
      event.preventDefault();
      this.submit();
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    let formData = new FormData(this.element);
    let entries = formData.entries();
    const data = {};
    for (let item of entries) {
      data[`${item[0]}`] = `${item[1]}`;
    }
    // console.log(data);
    return data
  }

  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit({
      'url': this.element.getAttribute('action'),
      'method': this.element.getAttribute('method'),
      'data': this.getData()
    });
  }
}
