const createRequest = async (options = {}) => {
  let {
    url,
    headers,
    data,
    method,
    callback
  } = options;

  let formData = '';

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

  let requestHeaders = {};

  if (headers) {
    for (let header in headers) {
      requestHeaders[header] = headers[header];
    }
  }

  // let film = new FormData();
  // film.append('name', '.+');
  // film.append('entity_method', 'LIST');


  let result = '';
  // console.log(response.headers.get('Content-Type'));
  try {

    let response = await fetch(url, {
      method: method,
      headers: requestHeaders,
      // body: data,
      body: formData,
      credentials: 'include',
    });

    // console.log(result);
    // callback.call(this, null, result);
    if (response.ok && response.status === 200) {
      // for (let [key, value] of response.headers) {
      //   console.log(`${key} = ${value}`);
      // }
      result = await response.json();
      callback.call(this, null, result);
    }
    // else {
    //   console.log(response.status);
    // }

    // return result;

  } catch (err) {
    // console.log(err);
    const errorXhr = new Error('Ошибка запроса');
    callback.call(this, errorXhr, null);
    // return result;
    // console.log(err);
  }
  // return result
}


/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
// const createRequest = (options = {}) => {
//   let {
//     url,
//     headers,
//     data,
//     responseType,
//     method,
//     callback
//   } = options;
//
//   const xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;
//   responseType ? xhr.responseType = responseType : xhr.responseType = 'text';
//
//   let formData;
//
//   if (method != 'GET') {
//     formData = new FormData();
//     for (let key in data) {
//       formData.append(key, data[key]);
//     }
//   }
//   else {
//     let urlOpts = Object.entries(data).map(function (urlOpt) {return `${urlOpt[0]}=${urlOpt[1]}`}).join('&');
//     urlOpts ? url += '?' + urlOpts : url;
//   }
//
//   try {
//     xhr.open(method, url, true);
//     if (headers) {
//       for (let header in headers) {
//         xhr.setRequestHeader(header, headers[header]);
//       }
//     }
//
//     xhr.send(formData);
//   }
//   catch (err) {
//     callback.call(this, err, null);
//     return xhr;
//   }
//
//   xhr.onload = () => {
//    if (xhr.readyState === 4 && xhr.status === 200) {
//       callback.call(this, null, xhr.response);
//     }
//   };
//
//   xhr.onerror = (event) => {
//     const errorXhr = new Error('Ошибка запроса');
//     callback.call(this, errorXhr, null);
//   };
//
//   return xhr;
// };
