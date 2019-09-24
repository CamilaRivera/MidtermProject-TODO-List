// $(() => {

  $('.watch-task').on('click', () => {
    $.ajax('api/categories/1', { method: 'GET' }) //where 1 is has to be dynamic
      .then(list => {
        const mainConatiner = $('main');
        mainConatiner.css('padding-left', '25vw');
        mainConatiner.css('transform', 'translateY(-30vh)');
        mainConatiner.html(`<div class="carousel" style="
          width: 100vw;
          height: 100vh;
          overflow: visible !important;
        "></div>
          <p class="movie-info">
          </p>
        `);
        const slider = $('.carousel');
        const movieInfo = $('.movie-info');
        const slideItem = $('.carousel-item');
        const { data } = list;
        const moviePromise = [];
        data.forEach((task) => {
          moviePromise.push($.ajax('api/widgets/movie', { method: 'POST', data: task.title }));
        });
        Promise.all(moviePromise)
          .then(movies => {
            console.log(movies);
            movies.forEach(movie => {
              slider.append(`
          <div class="row carousel-item">
          <div class="col s12 m12">
          <div class="card" style="
              width:20vw;
          ">
          <div class="card-image waves-effect waves-block waves-light" style="
              width: 20vw;
          ">
            <img class="activator" src="${movie.Poster}">
          </div>
          <div class="card-content">
        <span class="card-title activator grey-text text-darken-4" style="text-align: center"><p class="movie-title">${movie.Title}</p><i class="material-icons left" style="transform: translateY(-100%);">check_circle</i><i class="material-icons right" style="transform: translateY(-100%);">cancel</i></span>
          </div>
          </div>
          </div>
        </div>
          `);
            //   movieInfo.html(`
            //   ${movie.Title}
            // `);
            });
            slider.carousel({
              onCycleTo: function(data) {
                const currentMovie = $(data).find('.movie-title').html();
                $.ajax('api/widgets/movieInfo', { method: 'POST', data: currentMovie})
                  .then(movieInfo => console.log(movieInfo));
              }
            });
          });
      });
  });
});

// <a class="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1"></a>
// <a class="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2"></a>
// <a class="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3"></a>
// <a class="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4"></a>
// <a class="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5"></a>

{/* <div class="card-reveal">
<span class="card-title grey-text text-darken-4">${movie.Title}<i class="material-icons right">close</i></span>
  <p>Here is some more information about this product that is only revealed once clicked on.</p>
</div> */}

