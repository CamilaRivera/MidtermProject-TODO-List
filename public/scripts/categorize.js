$(() => {
  const taskName = $('#todo_title');
  const categoryFiller = $('#category_selection');
  taskName.on('keyup', () => {
    $.ajax('/api/categories/sort', {
      method: "POST",
      data: taskName.serialize()
    }).then(cateogry => {
      categoryFiller.focus();
      categoryFiller.val(cateogry);
      taskName.focus();
    });
  });
});