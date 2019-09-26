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
        beforeSend: function () {
          $('.preloader-wrapper').css('display', 'block');
        }
      }));
    });
    Promise.all(productPromise)
      .then(products => {
        $('.preloader-wrapper').css('display', 'none');
        products.forEach(productInfo => {
          let [image, name] = ['', ''];
          if (!productInfo[1].length) {
            image = 'https://eatatpinkys.com/wp-content/uploads/2019/03/no-image-found.jpg';
            name = 'The picture couldn\'t be fetched, but we still found you something 😏';
          } else {
            image = productInfo[1][0].img;
            name = productInfo[1][0].name;
          }
          slider.append(`
            <div class="row carousel-item">
              <div class="col s12 m12">
              <div class="card product" style="width: 20vw;">
              <div class="card-image">
              <img src="${image}" style="height: 35vh">
            </div>
            <div class="card-content">
              <p>${name}</p>
            </div>
            <div class="card-action">
              <a class="btn-floating pulse" style="float: left; transform: translateY(-0.15em)"><i class="material-icons right">shopping_cart</i></a>
              <a href="${productInfo[0]}" class="btn tooltipped" data-position="bottom" data-tooltip="This Will Take You to A Third Party Website Which May Uses Cookies">Buy Now!</a>
            </div>
          </div>
        </div>
        </div>
          `);
        });
        slider.carousel();
        $('.tooltipped').tooltip();
        $('[class*="task-"]').on('click', function () {
          let taskID = ($(this)[0].classList[2]);
          slider.carousel('set', taskID.split('-')[1]);
        });
      });
  });
});

