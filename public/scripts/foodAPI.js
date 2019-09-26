$(() => {

  $('.eat-todos').on('click', () => {
    $('.list-title').html('Food List');
    const list = todos.filter(todo => todo.category_id === 4);
    renderTodos(list);
    console.log(list);
    const slider = $('.carousel');
    slider.empty();
    const foodPromise = [];
    list.forEach((todo) => {
      foodPromise.push($.ajax('api/widgets/food', {
        method: 'POST',
        data: todo.title,
        beforeSend: function() {
          $('.preloader-wrapper').css('display', 'block');
        }
      }));
    });
    Promise.all(foodPromise)
      .then(foods => {
        $('.preloader-wrapper').css('display', 'none');
        foods.forEach(food => {
          slider.append(`
          <div class="row carousel-item">
            <div class="col s12 m12">
              <div class="card food" style="width: 20vw;">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${food.image}">
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4" style="text-align: center"><p class="food-title">${food.name}</p></span>
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
                    <h5 class="genre">Price ${foodInfo.price}</h3>
                    <h5 class="type">Distance: ${foodInfo.distance} m</h3>
                    <h5 class="plot">Hours: ${open}</h4>
                    <h5 class="year">Phone: ${foodInfo.phone}</h5>
                    <h5 class="rating">Rating: ${generateStars(foodInfo.rating, 5)}</h5>
                    <h5 class="rating-count">Number of Reviews: ${foodInfo.reviewCount}</h5>
                    `);
              });
          }
        });
        $('[class*="task-"]').on('click', function() {
          let taskID = ($(this)[0].classList[2]);
          slider.carousel('set', taskID.split('-')[1]);
        });
      });
  });
});
