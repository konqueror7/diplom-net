/**
 * Класс Entity предоставляет методы для работы
 * с json-файлами для дочерних классов - Hall, Movie, Session, Ticket.
 * Осуществляет XMLHttpRequest-запросы через функцию createRequest()
 * Для обработки ответа сервера использует коллбек
 * Класс Entity задает пустой параметр url
 * а дочерние классы имеют разные url, то есть обращаются
 * к разным php-скриптам.
 * Дочерние классы используются в формах, виджетах и других элементах
 * фронтэнда для выполнения запросов на получение или изменение json-данных
 * параметр-объект data содержит данные для массивов $_GET и $_POST
 */

class Entity {
  /**
   * Запрос к PHP-скрипту на получение списка объектов
   * из json-файла
   * @return {XMLHttpRequest} [description]
   */
  static list(data, callback = f => f) {
    const xhr = createRequest({
      url: this.HOST + this.URL,
      method: 'POST',
      data: Object.assign({ entity_method: 'LIST' }, data),
      callback: callback
    });
    return xhr;
  }

  /**
   * Запрос на создание нового объекта
   * и его запись в json-файл
   *
   */
  static create(data, callback = f => f) {
    const xhr = createRequest({
      url: this.HOST + this.URL,
      method: 'POST',
      data: Object.assign({ entity_method: 'CREATE' }, data),
      callback: callback
    });
    return xhr;
  }
  /**
   * Запрос на получение содержимого одного из объектов
   * из json-файла
   */
  static get(id = '', data, callback = f => f) {
    const xhr = createRequest({
      url: this.HOST + this.URL,
      method: 'POST',
      data: Object.assign({ get_id: id, entity_method: 'GETID' }, data),
      callback: callback
    });
    return xhr;
  }
  /**
   * Запрос на обновление объекта с определенным id
   * в json-файле
   */
  static update(id = '', data, callback = f => f) {
    const xhr = createRequest({
      url: this.HOST + this.URL,
      method: 'POST',
      data: Object.assign({ update_id: id, entity_method: 'UPDATEID' }, data),
      callback: callback
    });
    return xhr;
  }

  /**
   * Запрос на удаление объекта с определенным id
   * из json-файла
   */
  static remove(id = '', data, callback = f => f) {
    const xhr = createRequest({
      url: this.HOST + this.URL,
      method: 'POST',
      data: Object.assign({ remove_id: id, entity_method: 'REMOVEID' }, data),
      callback: callback
    });
    return xhr;
  }
}

Entity.URL = '';
Entity.HOST = 'http://diplom-net';
