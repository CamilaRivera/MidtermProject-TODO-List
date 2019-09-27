$(() => {

  $('.watch-todos').on('click', () => {
    currentViewGlobal = 1;
    rerender();

    const list = getFilteredTodos(1);
    const slider = $('.carousel');
    slider.empty();

    const moviePromise = [];
    list.forEach((todo) => {
      $('.preloader-wrapper').css('display', 'block');
      moviePromise.push($.ajax('api/widgets/movie', {
        method: 'POST',
        data: todo.title
      }));
    });
    Promise.all(moviePromise)
      .then(movies => {
        $('.preloader-wrapper').css('display', 'none');
        if ( currentViewGlobal !== 1 ) {
          return;
        }
        movies.forEach((movie, index) => {
          const todo = list[index];
          let [poster, title] = ["", ""];
          if (!Object.entries(movie).length) {
            poster = 'https://eatatpinkys.com/wp-content/uploads/2019/03/no-image-found.jpg';
            title = 'We can\'t find information about your movie 🙃';
          } else {
            poster = movie.Poster;
            title = movie.Title;
          }
          slider.append(`
          <div class="carousel-item" data-todoid="${todo.id}">
            <div class="card movie">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${poster}">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4" style="text-align: center"><p class="movie-title">${title}</p></span>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                <p class="hidden-card-content">Here is some more information about this product that is only revealed once clicked on.</p>
              </div>
            </div>
          </div>
          `);
        });
        slider.carousel({
          onCycleTo: function (data) {
            const currentMovie = $(data).find('.movie-title').html();
            $.ajax('api/widgets/movieInfo', { method: 'POST', data: currentMovie })
              .then(movieInfo => {
                $('.hidden-card-content').html(`
                    <h5 class="genre" style="font-size: 15px;">Genere: ${movieInfo.Genre}</h5>
                    <h5 class="type" style="font-size: 15px;">Type: ${movieInfo.Type}</h5>
                    <h5 class="plot" style="font-size: 15px;">Plot:</h5>
                    <p class="plot-text" style="font-size: 10px">${movieInfo.Plot}</p>
                    <h5 class="year" style="font-size: 15px;">Year: ${movieInfo.Year}</h5>
                    <h5 class="rating" style="font-size: 15px;">Rating:</h5>
                    <div class="stars">${generateStars(movieInfo.imdbRating, 9)}</div>
                    `);
              });
          }
        });
      });
  });
})
