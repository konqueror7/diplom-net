/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let {
    url,
    headers,
    data,
    responseType,
    method,
    callback
  } = options;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  responseType ? xhr.responseType = responseType : xhr.responseType = 'text';

  let formData;

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

  try {
    xhr.open(method, url, true);
    if (headers) {
      for (let header in headers) {
        xhr.setRequestHeader(header, headers[header]);
      }
    }

    xhr.send(formData);
  }
  catch (err) {
    callback.call(this, err, null);
    return xhr;
  }

  xhr.onload = () => {
   if (xhr.readyState === 4 && xhr.status === 200) {
      callback.call(this, null, xhr.response);
    }
  };

  xhr.onerror = (event) => {
    const errorXhr = new Error('Ошибка запроса');
    callback.call(this, errorXhr, null);
  };

  return xhr;
};
