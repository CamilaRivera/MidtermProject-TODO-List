$(() => {
  const taskName = $('#todo_title');
  const categoryFiller = $('#category_selection');
  taskName.keypress((event) => {
    if (event.keyCode === 13) {
      $.ajax('/api/categories/sort', {
        method: "POST",
        data: taskName.serialize()
      }).then(data => console.log(data));
    }
  });
  categoryFiller.val('movies');
});