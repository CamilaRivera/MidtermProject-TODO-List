$(() => {
  $('.read-todos').on('click', () => {
    currentViewGlobal = 3;
    rerender();

    const list = getFilteredTodos(3);
    const slider = $('.carousel');
    slider.empty();

    const bookPromise = [];
    list.forEach((task) => {
      $('.preloader-wrapper').css('display', 'block');
      bookPromise.push($.ajax('api/widgets/book', {
        method: 'POST',
        data: task.title
      }));
    });
    Promise.all(bookPromise)
      .then(books => {
        $('.preloader-wrapper').css('display', 'none');
        if ( currentViewGlobal !== 3 ) {
          return;
        }
        books.forEach((book, index) => {
          const todo = list[index];
          slider.append(`
          <div class="carousel-item row" data-todoid="${todo.id}">
          <div class="col s12 m12">
          <div class="card food">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${book.thumbnail}">
          </div>
          <div class="card-content">
        <span class="card-title activator grey-text text-darken-4" style="text-align: center"><p class="book-title">${book.title}</p>
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
            const currentBook = $(data).find('.book-title').html();
            $.ajax('api/widgets/bookInfo', { method: 'POST', data: currentBook })
              .then(bookInfo => {
                $('.hidden-card-content').html(`
                    <h5 class="genre" style="font-size: 15px;">Authors: ${bookInfo.authors}</h3>
                    <h5 class="type" style="font-size: 15px;">Page Count: ${bookInfo.pageCount}</h3>
                    <h5 class="plot" style="font-size: 13px;">About: ${bookInfo.textSnippet}</h4>
                    <h5 class="categoryt" style="font-size: 15px;">Categories: ${bookInfo.categories}</h4>
                    <h5 class="year" style="font-size: 15px;">Published Date: ${bookInfo.publishedDate}</h5>
                    <h5 class="rating" style="font-size: 15px;">Avg Rating: <br>${generateStars(bookInfo.averageRating, 5)}</h5>
                    <h5 class="rating-count" style="font-size: 15px;">Rating Count: ${bookInfo.ratingsCount}</h5>
                    `);
              });
          }
        });
      });
  });
});

