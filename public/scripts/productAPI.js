$(() => {

  const reloadAll = () => {
    const categoriesPromise = $.ajax({ url: '/api/categories', method: 'GET' });
    const todosPromise = $.ajax({ url: '/api/todos', method: 'GET' });
    return Promise.all([categoriesPromise, todosPromise]).then(function ([categoriesData, todosData]) {
      return [categoriesData.categories, todosData.todo];
    });
  };

  const makeTaskListHTML = (listArr) => {
    let html = '';
    for (let i = 0; i < listArr.length; i++) {
      html += `<h5> Task ${i + 1}: ${listArr[i].title} </h5>`;
      html += `<h5> Task Description: ${listArr[i].description} </h5>`;
      html += `<h5> Task Start At: ${listArr[i].start_date} </h5>`;
      html += `<h5> Task End At: ${listArr[i].end_date} </h5>`;
      html += `<h5> Priority${listArr[i].priority} </h5>`;
    }
    return html;
  };

  $('.buy-todos').on('click', () => {
    $.ajax('api/categories/2', { method: 'GET' }) //where 1 is has to be dynamic
      .then(list => {
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
        const productPromise = [];
        data.forEach((task) => {
          productPromise.push($.ajax('api/widgets/product', { method: 'POST', data: task.title }));
        });
        Promise.all(productPromise)
          .then(products => {
            mainConatiner.prepend(`
          <div class="task-info" style="
          margin-top: 35vh;
          margin-left: -2vw;
          width: 100vw;
          ">
          </div>
            `);
            products.forEach(productInfo => {
              console.log("0", productInfo[0]);
              console.log("1", productInfo[1]);
              slider.append(`
            <div class="row carousel-item">
              <div class="col s12 m12">
              <div class="card" style="width: 20vw;">
              <div class="card-image style="width: 20vw;">
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
              //   movieInfo.html(`
              //   ${product.Title}
              // `);
            });
            reloadAll()
              .then((array) => {
                const categoryTodos = array[1].filter(todo => 2 === todo.category_id);
                $('.task-info').html(`
                  ${makeTaskListHTML(categoryTodos)};
                `);
              });
            slider.carousel();
            $('.tooltipped').tooltip();
          });
      });
  });
});