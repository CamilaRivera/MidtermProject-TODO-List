$(() => {
  $('.eat-todos').on('click', () => {
    currentViewGlobal = 4;
    rerender();

    const list = getFilteredTodos(4);

    const slider = $('.carousel');
    slider.empty();

    const foodPromise = [];
    list.forEach((todo) => {
      $('.preloader-wrapper').css('display', 'block');
      foodPromise.push($.ajax('api/widgets/food', {
        method: 'POST',
        data: todo.title
      }));
    });
    Promise.all(foodPromise)
      .then(foods => {
        $('.preloader-wrapper').css('display', 'none');
        if ( currentViewGlobal !== 4 ) {
          return;
        }
        foods.forEach((food, index) => {
          const todo = list[index];
          slider.append(`
          <div class="carousel-item" data-todoid="${todo.id}">
            <div class="col s12 m12">
              <div class="card food" style="width: 20vw;">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${food.image}">
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4" style="text-align: center"><p class="food-title">${food.name}</p>
                  <a class="btn-floating pulse" style="float: left; transform: translateY(-2.5em)">info</a>
                  </span>
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
            const currentFood = $(data).find('.food-title').html();
            $.ajax('api/widgets/foodInfo', { method: 'POST', data: currentFood })
              .then(foodInfo => {
                let open = 'Open Now!';
                if (!open) open = 'Closed';
                $('.hidden-card-content').html(`
                    <h5 class="genre" style="font-size: 15px;">Price ${foodInfo.price}</h3>
                    <h5 class="type" style="font-size: 15px;">Distance: ${foodInfo.distance} m</h3>
                    <h5 class="plot" style="font-size: 15px;">Hours: ${open}</h4>
                    <h5 class="year" style="font-size: 15px;">Phone: ${foodInfo.phone}</h5>
                    <h5 class="rating" style="font-size: 15px;">Rating: ${generateStars(foodInfo.rating, 5)}</h5>
                    <h5 class="rating-count" style="font-size: 15px;">Number of Reviews: ${foodInfo.reviewCount}</h5>
                    `);
              });
          }
        });
      });
  });
});
