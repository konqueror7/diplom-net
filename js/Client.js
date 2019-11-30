class Client {

  static init() {
    this.element = document.querySelector( '.movies' );
    console.log(this.element);
    this.initWidgets();
  }

  static initWidgets() {
    this.widgets = {
      list_movies: new ListMoviesWidget(document.querySelector('.list-movies'))
    }
  }

}
