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
      html += `<h5> Task ${i + 1}: Read ${listArr[i].title} </h5>`;
      html += `<h5> Task Description: ${listArr[i].description} </h5>`;
      html += `<h5> Task Start At: ${listArr[i].start_date} </h5>`;
      html += `<h5> Task End At: ${listArr[i].end_date} </h5>`;
      html += `<h5> Priority${listArr[i].priority} </h5>`;
    }
    return html;
  };


  const generateStars = (rating) => {
    let starHTML = '';
    for (let i = 0; i < rating; i++) {
      starHTML += `<i class="material-icons">star</i>`;
    }
    for (let i = 0; i < 5 - rating; i++) {
      starHTML += `<i class="material-icons">star_border</i>`;
    }
    return starHTML;
  };


  $('.read-todos').on('click', () => {
    $.ajax('api/categories/3', { method: 'GET' }) //where 1 is has to be dynamic
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
        const bookPromise = [];
        data.forEach((task) => {
          bookPromise.push($.ajax('api/widgets/book', { method: 'POST', data: task.title }));
        });
        Promise.all(bookPromise)
          .then(books => {
            console.log(books);
            mainConatiner.prepend(`
          <div class="task-info" style="
          margin-top: 35vh;
          margin-left: -2vw;
          width: 100vw;
          ">
          </div>
            `);
            books.forEach(book => {
              slider.append(`
          <div class="row carousel-item">
          <div class="col s12 m12">
          <div class="card" style="
              width:20vw;
          ">
          <div class="card-image waves-effect waves-block waves-light" style="
              width: 20vw;
          ">
            <img class="activator" src="${book.thumbnail}">
          </div>
          <div class="card-content">
        <span class="card-title activator grey-text text-darken-4" style="text-align: center"><p class="book-title">${book.title}</p><i class="material-icons left" style="transform: translateY(-100%);">check_circle</i><i class="material-icons right" style="transform: translateY(-100%);">cancel</i></span>
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
              //   ${book.Title}
              // `);
            });
            reloadAll()
              .then((array) => {
                const categoryTodos = array[1].filter(todo => 3 === todo.category_id);
                $('.task-info').html(`
                  ${makeTaskListHTML(categoryTodos)};
                `);
              });
            slider.carousel({
              onCycleTo: function (data) {
                const currentBook = $(data).find('.book-title').html();
                $.ajax('api/widgets/bookInfo', { method: 'POST', data: currentBook })
                  .then(bookInfo => {
                    $('.hidden-card-content').html(`
                    <h5 class="genre">Authors: ${bookInfo.authors}</h3>
                    <h5 class="type">Page Count: ${bookInfo.pageCount}</h3>
                    <h5 class="plot">About: ${bookInfo.textSnippet}</h4>
                    <h5 class="categoryt">Categories: ${bookInfo.categories}</h4>
                    <h5 class="year">Published Date: ${bookInfo.publishedDate}</h5>
                    <h5 class="rating">Avg Rating: ${generateStars(bookInfo.averageRating)}</h5>
                    <h5 class="rating-count">Rating Count: ${bookInfo.ratingsCount}</h5>
                    `);
                  });
              }
            });
          });
      });
  });
});