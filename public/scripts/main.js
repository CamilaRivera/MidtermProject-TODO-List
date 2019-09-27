/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

let categoriesGlobal = [];
let todosGlobal = [];
let currentViewGlobal = 'today-todos';
let editTodoIdGlobal = -1;

const WATCH_MAIN_CATEGORY = 1;
const BUY_MAIN_CATEGORY = 2;
const READ_MAIN_CATEGORY = 3;
const EAT_MAIN_CATEGORY = 4;

const fillModal = function (todo) {
  $('#todo_title').val(todo.title || '');
  $('#todo_description').val(todo.description || '');
  $('#todo_start_date').val(todo.start_date ? todo.start_date.substring(0, 10) : '');
  $('#todo_end_date').val(todo.end_date ? todo.end_date.substring(0, 10) : '');
  $('#category_selection').val(todo.category_id);
  $('#priority').val(todo.priority);
  $('.create-todo.modal-close').text('Update todo');
  M.updateTextFields();
  $("#category_selection").formSelect();
  $("#priority").formSelect();
};



// set the colors for the Priority flag
const setStyle = function (priorityNumber) {
  if (priorityNumber === 1)
    return "color: red";
  else if (priorityNumber === 2)
    return "color: orange";
  else if (priorityNumber === 3)
    return "color: #ffd600";
  return "visibility: hidden"
};

//order by priority
const orderByPriority = function ( a, b ) {
  if ( a.priority < b.priority ){
    return -1;
  }
  if ( a.priority > b.priority ){
    return 1;
  }
  return 0;
}

const generateStars = (rating, max) => {
  let starHTML = '';
  for (let i = 0; i < rating; i++) {
    starHTML += `<i class="tiny material-icons">star</i>`;
  }
  for (let i = 0; i < max - rating; i++) {
    starHTML += `<i class="tiny material-icons">star_border</i>`;
  }
  return starHTML;
};

function isDateInNextWeek(date) {
  const dateToTime = new Date(date).getTime();
  // const dateTomorrow = new Date(new Date().getTime() + 1 * 24 * 3600 * 1000).getTime();
  const dateTomorrow = new Date(new Date().getTime()).getTime();
  const dateEightDaysMore = new Date(new Date().getTime() + 7 * 24 * 3600 * 1000).getTime();

  if (dateToTime >= dateTomorrow && dateToTime <= dateEightDaysMore) {
    return true;
  } else {
    return false;
  }
};

function reloadAll() {
  const categoriesPromise = $.ajax({ url: '/api/categories', method: 'GET' });
  const todosPromise = $.ajax({ url: '/api/todos', method: 'GET' });
  return Promise.all([categoriesPromise, todosPromise]).then(function ([categoriesData, todosData]) {
    categoriesGlobal = categoriesData.categories;
    todosGlobal = todosData.todo;
    todosGlobal.sort(orderByPriority);
    return [categoriesData.categories, todosData.todo];
  });
}

const textToNumber = function (string) {
  return string.replace("(", "").replace(")", "")
}


const editTodo = function (todoId) {
  editTodoIdGlobal = todoId;
  const todo = todosGlobal.find(todo => todo.id === todoId);
  fillModal(todo);
  $('#modal1').modal('open');
}

const completeCheckboxListener = function () {
  const todoId = Number($(this).data('todoid'));
  const todo = todosGlobal.find(todo => todo.id === todoId);

  // Update local todo complete property
  todo.complete = !todo.complete;

  // Remove todo from DOM
  $(this).parent().parent().parent().remove();

  // Update server
  const data = { complete: todo.complete };
  $.ajax({ url: `/api/todos/${todoId}/edit`, method: 'POST', data });
  if (currentViewGlobal === 1 || currentViewGlobal === 2 || currentViewGlobal === 3 || currentViewGlobal === 4) {
    removeCarouselSlide(id);;
 }
  rerender();
}

const getFilteredTodos = function (viewId) {
  if (viewId === 'completed-todos') {
    return todosGlobal.filter(todo => todo.complete === true);
  }
  else if (viewId === 'weekly-todos') {
    return todosGlobal.filter(todo => !todo.complete && todo.end_date && isDateInNextWeek(todo.end_date.substring(0, 10)));
  }
  else if (viewId === 'today-todos') {
    return todosGlobal.filter(todo => !todo.complete && getDaysDiff(todo.end_date) < -0.3 && getDaysDiff(todo.end_date) > -1.3);
  }
  else {
    // Current view is a category
    return todosGlobal.filter(todo =>!todo.complete && todo.category_id === viewId);
  }
}

const rerenderByTrigger = function() {
  if (currentViewGlobal === 'completed-todos') {
    $('.completed-todos').trigger('click');
  }
  else if (currentViewGlobal === 'weekly-todos') {
    $('.weekly-todos').trigger('click');
  }
  else if (currentViewGlobal === 'today-todos') {
    $('.today-todos').trigger('click');
  }
  else {
    // Current view is a category
    if ( currentViewGlobal === 1 ) {
      $('.watch-todos').trigger('click');
    }
    else if ( currentViewGlobal === 2 ) {
      $('.buy-todos').trigger('click');
    }
    else if ( currentViewGlobal === 3 ) {
      $('.read-todos').trigger('click');
    }
    else if ( currentViewGlobal === 4 ) {
      $('.eat-todos').trigger('click');
    }
  }
}

const rerender = function () {
  let filteredTodos = getFilteredTodos(currentViewGlobal);
  if (currentViewGlobal === 'completed-todos') {
    $('.list-title').html('Completed Todos');
  }
  else if (currentViewGlobal === 'weekly-todos') {
    $('.list-title').html('Next 7 days Todos');
  }
  else if (currentViewGlobal === 'today-todos') {
    $('.list-title').html('Today Todos');
  }
  else {
    // Current view is a category
    if ( currentViewGlobal === 1 ) {
      $('.list-title').html('Watch List');
    }
    else if ( currentViewGlobal === 2 ) {
      $('.list-title').html('Buy List');
    }
    else if ( currentViewGlobal === 3 ) {
      $('.list-title').html('Read List');
    }
    else if ( currentViewGlobal === 4 ) {
      $('.list-title').html('Food List');
    }
  }
  renderTodos(filteredTodos);
  countAndAddTodosPerCategory(categoriesGlobal, todosGlobal);
}

function initialize() {
  reloadAll().then(data => {
    if ( getFilteredTodos('today-todos').length > 0 ) {
      currentViewGlobal = 'today-todos';
    }
    else if ( getFilteredTodos('weekly-todos').length > 0 ) {
      currentViewGlobal = 'weekly-todos';
    }
    else if ( getFilteredTodos(1).length > 0 ) {
      currentViewGlobal = 1;
    }
    else if ( getFilteredTodos(2).length > 0 ) {
      currentViewGlobal = 2;
    }
    else if ( getFilteredTodos(3).length > 0 ) {
      currentViewGlobal = 3;
    }
    else if ( getFilteredTodos(4).length > 0 ) {
      currentViewGlobal = 4;
    }
    else if ( getFilteredTodos('completed-todos').length > 0 ) {
      currentViewGlobal = 'completed-todos';
    }
    rerender();
  });
}


const countAndAddTodosPerCategory = function (categories, todos) {
  let watch = 0;
  let buy = 0;
  let read = 0;
  let eat = 0;
  let today = 0;
  let week = 0;
  let pastTodos = 0;
  var date = new Date();
  var timestamp = date.getTime();
  // const date = new Date();
  // const dateToString = date.toISOString().substring(0, 10);
  for (let category of categories) {
    const categoryTodos = todos.filter(todo => category.id === todo.category_id);
    for (let todo of categoryTodos) {
      if (!todo.complete) {
        if (todo.end_date && getDaysDiff(todo.end_date) < -0.3 && getDaysDiff(todo.end_date) > -1.3) {
          today += 1;
        }
        if (todo.end_date && isDateInNextWeek(todo.end_date.substring(0, 10))) {
          week += 1;
        }
        if (category.main_category === WATCH_MAIN_CATEGORY) {
          watch += 1;
        }
        if (category.main_category === BUY_MAIN_CATEGORY) {
          buy += 1;
        }
        if (category.main_category === READ_MAIN_CATEGORY) {
          read += 1;
        }
        if (category.main_category === EAT_MAIN_CATEGORY) {
          eat += 1;
        }
      } else {
        pastTodos += 1;
      }

    }
  }
  $(".week").text(`(${week})`);
  $(".today").text(`(${today})`);
  $(".to_watch").text(`(${watch})`);
  $(".to_buy").text(`(${buy})`);
  $(".to_read").text(`(${read})`);
  $(".to_eat").text(`(${eat})`);
  $(".to_completed").text(`(${pastTodos})`);
};

const createTodoElement = function (todo, i) {
  const $HTMLele = $(
    `<article class="todo task-${i}">
      <div class="todo-header">
        <label>
          <input data-todoid="${todo.id}" type="checkbox"/>
          <span></span>
        </label>
        <h5>
        ${escape(todo.title)}
        </h5>
        <div class="todo-header-buttons">
          <a class="flag"><i class="material-icons" id="flagLogo" style="${setStyle(todo.priority)}">flag</i></a>
          <a class="btn btn-flat carousel-focus" data-todoindex="${i}"><i class="large material-icons">more</i></a>
          <a class="btn btn-flat" onclick="editTodo(${todo.id})"><i class="large material-icons">mode_edit</i></a>
          <a class="btn btn-flat" onclick="clickDelete(${todo.id})"><i class="large material-icons">delete</i></a>
        </div>
      </div>
      <ul class="collapsible more-info-collapsible">
        <li>
          <div class="collapsible-header">
            ${todo.end_date ? escape(getDayStr(getDaysDiff(todo.end_date))) : ''}
            <span class="more-info">(+ More info)</span>
          </div>
          <div class="collapsible-body"><span>${escape(todo.description)}</span></div>
        </li>
      </ul>
  </article>`
  );
  if (!todo.description) {
    $HTMLele.find('.more-info').remove();
    $HTMLele.find('.collapsible-body').remove();
    $HTMLele.find('.collapsible').removeClass('collapsible');
  }
  return $HTMLele;
  // <a data-todoid="${todo.id}" class="delete-button btn btn-flat modal-trigge"><i class="large material-icons">delete</i></a>
};

// accepts an array of Objects for all todo objects, then passes it to createTodoElement and generate HTML elements
const renderTodos = function (todos) {
  const $todos = $('.todos');
  $todos.empty();

  if (todos.length === 0) {
    let noTodoMessage = 'No todos for this category';
    if (currentViewGlobal === 'completed-todos') {
      noTodoMessage = 'No completed todos';
    }
    else if (currentViewGlobal === 'weekly-todos') {
      noTodoMessage = 'No todos pending for this week';
    }
    else if (currentViewGlobal === 'today-todos') {
      noTodoMessage = 'No todos pending for today';
    }
    $('.todos').append(`
      <div class= "notodo row container" style="text-align:center;">
        <h4 class="col" style="text-align:center;">${noTodoMessage}</h4> <br>
        <img class="col s6 offset-s1" src="https://i.pinimg.com/originals/a3/81/87/a38187708e26901e5796a89dd6d7d590.jpg" alt="cover_photo_url" height="400">
        <a class="col s6 offset-s1 waves-effect waves-light btn modal-trigger" href="#modal1" style="margin-top: 10px;">Add new todo task</a>
      </div>`
    );
  }
  else {
    for (let i = 0; i < todos.length; i++) {
      $todos.append(createTodoElement(todos[i], i));
    }
  }

  $('.collapsible').collapsible({
    inDuration: 150,
    outDuration: 200,
  });

  $('.todo .carousel-focus').on('click', function() {
    let todoIndex = $(this).data('todoindex');
    $('.carousel').carousel('set', todoIndex );
  });

  $('.todo input[type=checkbox]').change(completeCheckboxListener);

};

const getDayStr = function (numberDay) {
  if (numberDay === null) {
    return null;
  }
  if (numberDay < -0.3 && numberDay > -1.3) {
    return "Due today";
  } else {
    const day = Math.round(numberDay) + 1;
    if (day === 1)
      return `This is due ${day} day later`;
    return `This is due ${day} days later`;
  }
};


// checks the input
const escape = function (str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Gets a Date format string and returns a number which is the difference with the current date time
const getDaysDiff = function (unixTimestamp) {
  if (unixTimestamp === null) {
    return null;
  }
  let Difference_In_Time = new Date(unixTimestamp) - Date.now();
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days;
};

jQuery(document).ready(function ($) {
  $('.modal').modal();

  $(".today-todos").on('click', function () {
    currentViewGlobal = 'today-todos';
    $('.carousel').empty();
    rerender();
  });

  $(".weekly-todos").on('click', function () {
    currentViewGlobal = 'weekly-todos';
    $('.carousel').empty();
    rerender();
  });
  $(".completed-todos").on('click', function () {
    currentViewGlobal = 'completed-todos';
    $('.carousel').empty();
    rerender();
  });

  $('.addTodo').on('click', function() {
    editTodoIdGlobal = -1;
    fillModal({category_id: 1, priority: 4});
    $('.create-todo.modal-close').text('Create todo');
  });

  //open modal Todo
  $('.modal').modal();

  // listen start_date
  $('.datepicker').datepicker({
    format: 'yyyy-mm-dd'
  });

  //select priority
  $('select').formSelect();

  $('.create-todo').click(function (event) {
    if (!$('#todo_title').val() || !$('#todo_title').val().trim()) {
      event.stopPropagation();
      return;
    }
    // Clean empty fields from (https://stackoverflow.com/questions/6240529/jquery-serialize-how-to-eliminate-empty-fields?sdfsdf=#$54T)
    const data = $('form.todo-form').serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '');

    if(editTodoIdGlobal === -1) {
      $.ajax({ url: '/api/todos', method: 'POST', data })
        .then(resp => {
          todosGlobal.push(resp.todo);
          todosGlobal.sort(orderByPriority);
          rerenderByTrigger();
        });
    } else {
      const todoId = editTodoIdGlobal;
      // Update server
      $.ajax({ url: `/api/todos/${todoId}/edit`, method: 'POST', data })
        .then((resp) => {
          // Update local todo
          const index = todosGlobal.findIndex(todo => todo.id === todoId);
          todosGlobal[index] = resp.todo;
          todosGlobal.sort(orderByPriority);
          rerenderByTrigger();
        });
    }
  });

  initialize();

});
