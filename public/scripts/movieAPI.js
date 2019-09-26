$(() => {

  $('.watch-todos').on('click', () => {
    $('.list-title').html('Watch List');
    console.log($('.brand-logo'));
    const list = todos.filter(todo => todo.category_id === 1);
    renderTodos(list);
    console.log(list);
    const slider = $('.carousel');
    slider.empty();
    const moviePromise = [];
    list.forEach((task) => {
      moviePromise.push($.ajax('api/widgets/movie', {
        method: 'POST',
        data: task.title,
        beforeSend: function() {
          $('.preloader-wrapper').css('display', 'block');
        },
        complete: function() {
          $('.preloader-wrapper').css('display', 'none');
        }
      }));
    });
    Promise.all(moviePromise)
      .then(movies => {
        movies.forEach(movie => {
          slider.append(`
          <div class="row carousel-item">
          <div class="col s12 m12">
          <div class="card movie">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${movie.Poster}">
          </div>
          <div class="card-content">
        <span class="card-title activator grey-text text-darken-4" style="text-align: center"><p class="movie-title">${movie.Title}</p></span>
          </div>
          <div class="card-reveal">
          <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
          <p class="hidden-card-content">Here is some more information about this product that is only revealed once clicked on.</p>
          </div>
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
                    <h5 class="genre">Genere: ${movieInfo.Genre}</h5>
                    <h5 class="type">Type: ${movieInfo.Type}</h5>
                    <h5 class="plot">Plot:</h5>
                    <p class="plot-text" style="font-size: 18px">${movieInfo.Plot}</p>
                    <h5 class="year">Year: ${movieInfo.Year}</h5>
                    <h5 class="rating">Rating:</h5>
                    <div class="stars">${generateStars(movieInfo.imdbRating, 9)}</div>
                    `);
              });
          }
        });
      });
  });
});



