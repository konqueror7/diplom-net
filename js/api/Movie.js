/**
 * наследует методы от Entitiy,
 * отправляет запросы к movie.php
 */

class Movie extends Entity {
  // static create(data, callback = f => f) {
  //   const xhr = createRequest({
  //     url: this.HOST + this.URL,
  //     method: 'POST',
  //     data: Object.assign({ entity_method: 'CREATE'}, data),
  //     responseType: 'json',
  //     callback: callback
  //   });
  //   return xhr;
  // }
}

Movie.URL = '/movie';
