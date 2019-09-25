$(() => {

  $('.buy-todos').on('click', () => {
    $('.list-title').html('Buy List');
    const list = todos.filter(todo => todo.category_id === 2);
    renderTodos(list);
    const slider = $('.carousel');
    slider.empty();
    const productPromise = [];
    list.forEach((task) => {
      productPromise.push($.ajax('api/widgets/product', {
        method: 'POST',
        data: task.title,
        beforeSend: function() {
          $('.preloader-wrapper').css('display', 'block');
        }
      }));
    });
    Promise.all(productPromise)
      .then(products => {
        $('.preloader-wrapper').css('display', 'none');
        products.forEach(productInfo => {
          console.log('productInfo:', productInfo[1]);
          slider.append(`
            <div class="row carousel-item">
              <div class="col s12 m12">
              <div class="card">
              <div class="card-image">
              <img src="${productInfo[1][0].img}">
            </div>
            <div class="card-content">
              <p>${productInfo[1][0].name}</p>
            </div>
            <div class="card-action">
              <a href="${productInfo[0]}" class="btn tooltipped" data-position="bottom" data-tooltip="This Will Take You to A Third Party Website Which May Uses Cookies">Buy Now!</a>
            </div>
          </div>
        </div>
        </div>
          `);
        });
        slider.carousel();
        $('.tooltipped').tooltip();
      });
  });
});

