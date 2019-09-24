$(() => {

  $.ajax('api/categories/1', { method: 'GET' }) //where 1 is has to be dynamic
    .then(list => {
      const mainConatiner = $('main');
      mainConatiner.html(`<div class="carousel"></div>`);
      const slider = $('.carousel');
      const { data } = list;
      const moviePromise = [];
      data.forEach((task) => {
        moviePromise.push($.ajax('api/widgets/movie', {method: 'POST', data: task.title}));
      });
      Promise.all(moviePromise)
        .then(movies => {
          console.log(movies);
          movies.forEach(movie => {
            slider.append(`
        <div class="row carousel-item">
        <div class="col s12 m12">
        <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${movie.Poster}">
        </div>
        <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${movie.Title}<i class="material-icons right">more_vert</i></span>
        </div>
        <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${movie.Title}<i class="material-icons right">close</i></span>
          <p>Here is some more information about this product that is only revealed once clicked on.</p>
        </div>
        </div>
        </div>
      </div>
        `);
          });
          slider.carousel();
        });
        
      // slider.carousel({
      // });
    });
});

// <a class="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1"></a>
// <a class="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2"></a>
// <a class="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3"></a>
// <a class="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4"></a>
// <a class="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5"></a>