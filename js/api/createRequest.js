/**
 * Асинхронный запрос для передачи и получения данных с сервера
 * @param  {Object}  [options={}] [description]
 * @return {Promise}              [description]
 */
const createRequest = async (options = {}) => {
  let {
    url,
    headers,
    data,
    method,
    callback
  } = options;

  /**
   * Инициализация переменной для храрнения
   * данных, передаваемых из js-скриптов на сервер
   * @type {String}
   */
  let formData = '';
  /**
   * Если метод передачи - POST, то formData наполняется
   * данными типа пар 'ключ: значение' иначе - формируется строка для передачи GET-запроса
   * @param  {String} method переменная содержащая тип метода запроса
   */
  if (method != 'GET') {
    formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
  }
  else {
    let urlOpts = Object.entries(data).map(function (urlOpt) {return `${urlOpt[0]}=${urlOpt[1]}`}).join('&');
    urlOpts ? url += '?' + urlOpts : url;
  }

  /**
   * Объект для храрнения заголовков запросов
   * @type {Object}
   */
  let requestHeaders = {};

  /**
   * Если параметр headers функции не пуст то его содержимое
   * записывается в виде пар 'ключ: значение'
   * @param  {Object} headers содержит заголовки зпросов
   * @return {Object}         объект
   */
  if (headers) {
    for (let header in headers) {
      requestHeaders[header] = headers[header];
    }
  }

  /**
   * Переменная для сохранения результатов запроса к серверу
   * @type {String}
   */
  let result = '';

  /**
   * Конструкция для перехвата ошибок выполнения запроса
   * и передача его результатов в callback, указанный в параметре options
   */
  try {
    let response = await fetch(url, {
      method: method,
      headers: requestHeaders,
      body: formData,
      credentials: 'include',
    });

    if (response.ok && response.status === 200) {
      result = await response.json();
      callback.call(this, null, result);
    }

  } catch (err) {
    const errorXhr = new Error('Ошибка запроса');
    callback.call(this, errorXhr, null);
  }

}
