$(() => {
  const taskName = $('#todo_title');
  const categoryFiller = $('#category_selection');

  const categoryIds = {
    'food': EAT_MAIN_CATEGORY,
    'book': READ_MAIN_CATEGORY,
    'product': BUY_MAIN_CATEGORY,
    'movie': WATCH_MAIN_CATEGORY
  };

  taskName.on('keyup', () => {
    $.ajax('/api/categories/sort', {
      method: "POST",
      data: taskName.serialize()
    }).then(categoryLabel => {
      categoryFiller.val(`${categoryIds[categoryLabel]}`)
      categoryFiller.formSelect();
    });
  });
});
