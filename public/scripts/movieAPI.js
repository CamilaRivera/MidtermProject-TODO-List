$(() => {

  $('.watch-todos').on('click', () => {
    // $.ajax('api/categories/1', { method: 'GET' }) //where 1 is has to be dynamic
    //   .then(list => {
        const list = todos.filter(todo => todo.category_id === 1);
        renderTodos(list);
        console.log(list);
        const slider = $('.carousel');
        slider.empty();
    // const foodPromise = [];

        // const mainConatiner = $('.carousel-container');
        // const slider = $('.carousel');
        const moviePromise = [];
        list.forEach((task) => {
          moviePromise.push($.ajax('api/widgets/movie', { method: 'POST', data: task.title }));
        });
        Promise.all(moviePromise)
          .then(movies => {
          //   mainConatiner.prepend(`
          // <div class="task-info" style="
          // margin-top: 35vh;
          // margin-left: -2vw;
          // width: 100vw;
          // ">
          // <section class='todos'>
          // </div>
          //   `);
            movies.forEach(movie => {
              slider.append(`
          <div class="row carousel-item">
          <div class="col s12 m12">
          <div class="card movie">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${movie.Poster}">
          </div>
          <div class="card-content">
        <span class="card-title activator grey-text text-darken-4" style="text-align: center"><p class="movie-title">${movie.Title}</p><i class="material-icons left" style="transform: translateY(-100%);">check_circle</i><i class="material-icons right" style="transform: translateY(-100%);">cancel</i></span>
          </div>
          <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
          <p class="hidden-card-content">Here is some more information about this product that is only revealed once clicked on.</p>
          </div>
          </div>
          </div>
        </div>
          `);
              //   movieInfo.html(`
              //   ${movie.Title}
              // `);
            });

  //           reloadAll()
  //             .then((array) => {
  //               const categoryTodos = array[1].filter(todo => 1 === todo.category_id);
  //               renderTodos(categoryTodos);
  //             });
            slider.carousel({
              onCycleTo: function (data) {
                const currentMovie = $(data).find('.movie-title').html();
                $.ajax('api/widgets/movieInfo', { method: 'POST', data: currentMovie })
                  .then(movieInfo => {
                    $('.hidden-card-content').html(`
                    <h5 class="genre">Genere: ${movieInfo.Genre}</h3>
                    <h5 class="type">Type: ${movieInfo.Type}</h3>
                    <h5 class="plot">Plot: ${movieInfo.Plot}</h4>
                    <h5 class="year">Year: ${movieInfo.Year}</h5>
                    <h5 class="rating">Rating: ${generateStars(movieInfo.imdbRating, 10)}</h5>
                    `);
                  });
              }
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

