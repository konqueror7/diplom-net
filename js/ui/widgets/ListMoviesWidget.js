class ListMoviesWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const moviesCollection = this.element;
    moviesCollection.addEventListener('click', () => {
      let target = event.target;
      if (target.classList.contains('movie-seances__time') || target.closest('.movie-seances__time')) {
        localStorage.setItem('session_id', target.dataset.sessionId);
        console.log(localStorage.getItem('session_id'));
        document.location.href = 'http://diplom-net/client/hall';
      }
    });
  }

  update() {
    Movie.list({name: '.+'}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }
      // this.movies = response;
      // console.log(this.movies);
      this.clearMovies();
      this.renderMovies(response.movies);
    });
  }


  clearMovies() {
    const deletableMovies = this.element;
    deletableMovies.innerHTML = '';
  }

  renderMovies( movies ) {
    for (let key in movies) {
      console.log(key);
      this.renderMoviesItem(key, movies[key]);
    }
  }

  renderMoviesItem( key, movie ) {
    // console.log(hall);
    const moviesList = this.element;
    // moviesList.innerHTML = '';
    let {
      name,
      content,
      poster,
      duration,
      producer
    } = movie,
    id = key;
    moviesList.append(this.getMovieHTML({id, name, content, poster, duration, producer}));
    // moviesList.innerHTML += this.getMovieHTML({id, name, content, poster, duration, producer});
  }

  getMovieHTML(item) {
    let movieItem = document.createElement('section');
    movieItem.classList.add('movie');

    let movieInfo = document.createElement('div')
    movieInfo.classList.add('movie__info');
    movieInfo.dataset.filmId = item.id;

    let moviePoster = document.createElement('div')
    moviePoster.classList.add('movie__poster');
    moviePoster.insertAdjacentHTML('beforeend', `<img class="movie__poster-image" alt="${item.name} постер" src="/posters/${item.poster}">`);

    let movieData = document.createElement('p');
    movieData.classList.add('movie__data');
    movieData.insertAdjacentHTML('beforeend', `<span class="movie__data-duration">${item.duration} минут</span>`);
    movieData.insertAdjacentHTML('beforeend', `<span class="movie__data-origin"> ${item.producer}</span>`);

    let movieDescription = document.createElement('div');
    movieDescription.classList.add('movie__description');
    movieDescription.insertAdjacentHTML('beforeend', `<h2 class="movie__title">${item.name}</h2>`);
    movieDescription.insertAdjacentHTML('beforeend', `<p class="movie__synopsis">${item.content}</p>`);
    // movieDescription.insertAdjacentHTML('beforeend', movieData);
    movieDescription.append(movieData);

    let movieSeances = this.renderSessionsList(item.id);
    // movieSeances.classList.add('movie-seances__hall');

    movieInfo.append(moviePoster);
    movieInfo.append(movieDescription);
    // movieInfo.append(movieData);

    movieItem.append(movieInfo);
    movieItem.append(movieSeances);

    return movieItem;
  }

  renderSessionsList(id) {
    let movieSeances = document.createElement('div');
    movieSeances.classList.add('movie-seances');

    Session.list({film_id: id}, (err, response) => {
      if (err || !response ) {
        return undefined;
      }

      if (response.sessions) {
        let filmSessionsList = Object.entries(response.sessions);
        let filmSessionsListSorted = filmSessionsList.sort(function(a, b) {
          console.log(a[1].start_time + ' ' + b[1].start_time);
          const timeStartA = new Date(new Date().toDateString() + ' ' + a[1].start_time);
          const timeLinePosA = timeStartA.getHours() * 60 + timeStartA.getMinutes();
          const timeStartB = new Date(new Date().toDateString() + ' ' + b[1].start_time);
          const timeLinePosB = timeStartB.getHours() * 60 + timeStartB.getMinutes();
          console.log(timeLinePosA + ' ' + timeLinePosB);
          return timeLinePosA - timeLinePosB;
        });
        console.log(filmSessionsListSorted);
        Hall.list({name: '.+'}, (err, response) => {
          if (err || !response ) {
            return undefined;
          }
          let hallsList = response.halls;
          for (let hallKey in hallsList) {
            let hallSessions = filmSessionsListSorted.filter(session => session[1].hall_id === hallKey);
            // let hallSessions = filmSessionsList.filter(session => session[1].hall_id === hallKey);
            if (hallSessions.length > 0) {
              let movieSeancesHall = document.createElement('div');
              movieSeancesHall.classList.add('movie-seances__hall');
              movieSeancesHall.insertAdjacentHTML('beforeend', `<h3 class="movie-seances__hall-title">${hallsList[hallKey].name}</h3>`);

              let moviesHallList = document.createElement('ul');
              moviesHallList.classList.add('movie-seances__list');
              for (let filmSession of hallSessions) {
                console.log(filmSession);
                moviesHallList.insertAdjacentHTML('beforeend',
                `
                  <li class="movie-seances__time-block"><a class="movie-seances__time" href="#" data-session-id="${filmSession[0]}">${filmSession[1].start_time}</a></li>
                `);
              }
              movieSeancesHall.append(moviesHallList);
              movieSeances.append(movieSeancesHall);
              // console.log(hallSessions);
            }
          }
        });
      }


    });

    // Hall.list({name: '.+'}, (err, response) => {
    //   if (err || !response ) {
    //     return undefined;
    //   }
    //   // console.log(hallsList);
    //   let hallsList = response.halls;
    //   for (let key in hallsList) {
    //     console.log(key);
    //     // let movieSeancesHall = document.createElement('div');
    //     // movieSeancesHall.classList.add('movie-seances__hall');
    //     // movieSeancesHall.dataset.hallId = key;
    //     // movieSeancesHall.insertAdjacentHTML('beforeend', `<h3 class="movie-seances__hall-title">${response.halls[key].name}</h3>`);
    //     // movieSeances.append(movieSeancesHall);
    //     Session.list({hall_id: key}, (err, response) => {
    //       if (err || !response) {
    //         return undefined;
    //       }
    //       if (response.success && response.sessions) {
    //         console.log('----');
    //         for (let keySess in response.sessions) {
    //           if (response.sessions[keySess].film_id === id) {
    //             console.log(response.sessions[keySess].hall_id + ' - ' + response.sessions[keySess].film_id + ' - ' + response.sessions[keySess].start_time);
    //           }
    //         }
    //       }
    //       // console.log(response.sessions);
    //     });
    //   }
    //   // console.log(response.halls);
    //   // this.clearHalls();
    //   // this.renderHalls(response.halls);
    //   // console.log(response);
    // });


    // Session.list({film_id: id}, (err, response) => {
    //   if (err || !response ) {
    //     return undefined;
    //   }
    //   // this.clearMovies();
    //   // this.renderMovies(response.movies);
    //   console.log(response);
    // });

    // movieSeances.innerText = id;
    return movieSeances;
  }

}
