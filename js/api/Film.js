class Film {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.name = this.getName();
    this.duration = this.getDuration();
    this.movieId = this.getMovieId();
  }
  getName() {
    return this.element.querySelector('.conf-step__movie-title').innerText;
  }
  getDuration() {
    return this.element.querySelector('.conf-step__movie-duration').innerText;
  }
  getMovieId() {
    return this.element.dataset.movieId;
  }
}
