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

  let result = '';

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
