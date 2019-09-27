$(() => {

  $('.buy-todos').on('click', () => {
    currentViewGlobal = 2;
    rerender();

    const list = getFilteredTodos(2);
    const slider = $('.carousel');
    slider.empty();

    const productPromise = [];
    list.forEach((task) => {
      $('.preloader-wrapper').css('display', 'block');
      productPromise.push($.ajax('api/widgets/product', {
        method: 'POST',
        data: task.title
      }));
    });
    Promise.all(productPromise)
      .then(products => {
        $('.preloader-wrapper').css('display', 'none');
        if ( currentViewGlobal !== 2 ) {
          return;
        }
        products.forEach((productInfo, index) => {
          const todo = list[index];
          let [image, name] = ['', ''];
          if (!productInfo[1].length) {
            image = 'https://eatatpinkys.com/wp-content/uploads/2019/03/no-image-found.jpg';
            name = 'The picture couldn\'t be fetched, but we still found you something 😏';
          } else {
            image = productInfo[1][0].img;
            name = productInfo[1][0].name;
          }
          slider.append(`
          <div class="carousel-item row" data-todoid="${todo.id}">
              <div class="col s12 m12">
              <div class="card product" style="width: 20vw;">
              <div class="card-image">
              <img src="${image}" style="height: 35vh">
            </div>
            <div class="card-content">
              <p>${name}</p>
            </div>
            <div class="card-action">
              <a href="${productInfo[0]}" class="btn pulse waves-effect tooltipped" data-position="bottom" data-tooltip="This Will Take You to A Third Party Website Which May Uses Cookies">Shop Now!</a>
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

