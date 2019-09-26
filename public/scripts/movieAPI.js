$(() => {

  $('.watch-todos').on('click', () => {
    $('.list-title').html('Watch List');
    // const list = todos.filter(todo => !todo.complete && todo.category_id === 1);
    // console.log('global list:', list);
    $.ajax('api/categories/1', { method: 'GET' }) //where 1 is has to be dynamic
      .then(list => {
        console.log('movie ajax call was made');
        const { data } = list;
        console.log('ajax list:', data);
        renderTodos(data);
        $('article').addClass('task-box-1'); //<<<< this is used for debuggin delete button and slider sync
        const slider = $('.carousel');
        slider.empty();
        const moviePromise = [];
        data.forEach((task) => {
          console.log('task:', task);
          moviePromise.push($.ajax('api/widgets/movie', {
            method: 'POST',
            data: task.title,
            beforeSend: function () {
              $('.preloader-wrapper').css('display', 'block');
            }
          }));
        });
        console.log("moviePromise:", moviePromise);
        Promise.all(moviePromise)
          .then(movies => {
            console.log('movies list returned after promise.all', movies);
            $('.preloader-wrapper').css('display', 'none');
            movies.forEach(movie => {
              let [poster, title] = ["", ""];
              if (!Object.entries(movie).length) {
                poster = 'https://eatatpinkys.com/wp-content/uploads/2019/03/no-image-found.jpg';
                title = 'We can\'t find information about your movie 🙃';
              } else {
                poster = movie.Poster;
                title = movie.Title;
              }
              slider.append(`
                <div class="carousel-item">
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
            $('[class*="taskButton"]').on('click', function () {
              let taskID = ($(this)[0].classList[2]);
              slider.carousel('set', taskID.split('-')[1]);
            });
          }); //promise.all
      });

  });
}); //onclick

