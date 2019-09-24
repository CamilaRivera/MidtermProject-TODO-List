$(() => {

  $.ajax('api/categories/1', { method: 'GET' }) //where 1 is has to be dynamic
    .then(list => {
      const mainConatiner = $('main');
      mainConatiner.html(`<div class="carousel"></div>`);
      const slider = $('.carousel');
      const {data} = list;
      data.forEach((task, index) => {
        slider.append(`<a class="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1"></a>`);
      });
      slider.carousel(); //initiate slider
    });
});

// <a class="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1"></a>
// <a class="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2"></a>
// <a class="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3"></a>
// <a class="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4"></a>
// <a class="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5"></a>