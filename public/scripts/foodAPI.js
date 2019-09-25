$(() => {

  $('.eat-todos').on('click', () => {
    $.ajax('api/categories/4', { method: 'GET' }) //where 1 is has to be dynamic
      .then(list => {
        console.log(list);
        const mainConatiner = $('main');
        mainConatiner.css('display', 'flex');
        mainConatiner.css('padding-left', '25vw');
        mainConatiner.css('transform', 'translateY(-30vh)');
        mainConatiner.html(`<div class="carousel" style="
          width: 100vw;
          height: 100vh;
          overflow: visible !important;
        ">
        `);
        const slider = $('.carousel');
        const { data } = list;
        const foodPromise = [];
        data.forEach((task) => {
          foodPromise.push($.ajax('api/widgets/food', { method: 'POST', data: task.title }));
        });
        Promise.all(foodPromise)
          .then(food => {
            console.log(food);
            mainConatiner.prepend(`
          <div class="task-info" style="
          margin-top: 35vh;
          margin-left: -2vw;
          width: 100vw;
          ">
          </div>
            `);
            food.forEach(food => {
              slider.append(`
          <div class="row carousel-item">
          <div class="col s12 m12">
          <div class="card" style="
              width:20vw;
          ">
          <div class="card-image waves-effect waves-block waves-light" style="
              width: 20vw;
          ">
            <img class="activator" src="${food.image}">
          </div>
          <div class="card-content">
        <span class="card-title activator grey-text text-darken-4" style="text-align: center"><p class="food-title">${food.name}</p><i class="material-icons left" style="transform: translateY(-100%);">check_circle</i><i class="material-icons right" style="transform: translateY(-100%);">cancel</i></span>
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
              //   ${food.Title}
              // `);
            });
            reloadAll()
              .then((array) => {
                const categoryTodos = array[1].filter(todo => 4 === todo.category_id);
                $('.task-info').html(`
                  ${makeTaskListHTML(categoryTodos)};
                `);
              });
            slider.carousel({
              onCycleTo: function (data) {
                const currentFood = $(data).find('.food-title').html();
                $.ajax('api/widgets/foodInfo', { method: 'POST', data: currentFood })
                  .then(foodInfo => {
                    $('.hidden-card-content').html(`
                    <h5 class="genre">Price ${foodInfo.price}</h3>
                    <h5 class="type">Distance: ${foodInfo.distance} m</h3>
                    <h5 class="plot">Open: ${foodInfo.open}</h4>
                    <h5 class="year">Phone: ${foodInfo.phone}</h5>
                    <h5 class="rating">Rating: ${generateStars(foodInfo.rating, 5)}</h5>
                    <h5 class="rating-count">Number of Reviews: ${foodInfo.reviewCount}</h5>
                    `);
                  });
              }
            });
          });
      });
  });
});
