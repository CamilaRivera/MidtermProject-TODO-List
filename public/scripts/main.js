/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

let categories = [];
let todos = [];
const priorityColorsArr = ["blue-text", "orange-text", "green-text"];
let creating = true;

const WATCH_MAIN_CATEGORY = 1;
const BUY_MAIN_CATEGORY = 2;
const READ_MAIN_CATEGORY = 3;
const EAT_MAIN_CATEGORY = 4;

const fillModal = function(todo){
  $('#todo_title').val(todo.title || '');
  $('#todo_description').val(todo.description || '');
  $('#todo_start_date').val(todo.start_date ? todo.start_date.substring(0, 10): '');
  $('#todo_end_date').val(todo.end_date ? todo.end_date.substring(0, 10): '');
  $('#category_selection').val(todo.category_id);
  $('#priority').val(todo.priority);
  $('.create-todo.modal-close').text('Update todo');
  M.updateTextFields();
  $("#category_selection").formSelect();
  $("#priority").formSelect();
  if (todo.id) {
    creating = true;
  }
  else {
    creating = false;
  }
};
// set the colors for the Priority flag
const setStyle = function(priorityNumber) {
  if (priorityNumber === 1)
    return "color: red";
  else if (priorityNumber === 2)
    return "color: blue";
  else if (priorityNumber === 3)
    return "color: green";
  return "visibility: hidden"
};

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
  const dateTomorrow = new Date(new Date().getTime() + 1 * 24 * 3600 * 1000).getTime();
  const dateEightDaysMore = new Date(new Date().getTime() + 8 * 24 * 3600 * 1000).getTime();

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

    categories = categoriesData.categories;
    todos = todosData.todo;
    return [categoriesData.categories, todosData.todo];
  });
}

const textToNumber = function(string){
  return string.replace("(", "").replace(")","")
}

function rerender(categories, todos) {
  renderCategories(categories);
  countAndAddTodosPerCategory(categories, todos);
  if(textToNumber($(".today").text()) > 0){
    $('.today-todos').trigger('click');
  } else if(textToNumber($(".week").text()) > 0){
    $('.weekly-todos').trigger('click');
  } else {
    $('.todos').append(`
    <div class= "notodo">
      <h4> No todo task </h4>
      <img src="https://i.pinimg.com/originals/a3/81/87/a38187708e26901e5796a89dd6d7d590.jpg" alt="cover_photo_url" height="400">
      <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Add new todo task</a>
    </div>`)
  }

}

function getCategoriesAndTodos() {
  reloadAll().then(data => rerender(data[0], data[1]));
}

const renderCategories = function (categories) {
  const allcategories = [];
  $('.categories').empty();
  for (const category of categories) {
    allcategories.push(createCategoryElement(category));
  }
  $('.categories').append(allcategories);
};

const createCategoryElement = function (category) {
  const $category = $(
    ` <li class='category collapsible'><a>${escape(category.description)}</a></li>`
  );
  return $category;
};

const countAndAddTodosPerCategory = function (categories, todos) {
  let watch = 0;
  let buy = 0;
  let read = 0;
  let eat = 0;
  let today = 0;
  let week = 0;
  let pastTodos = 0;
  const date = new Date(new Date().getTime());
  const dateToString = date.toISOString().substring(0, 10);
  for (let category of categories) {
    const categoryTodos = todos.filter(todo => category.id === todo.category_id);
    for (let todo of categoryTodos) {
      if (!todo.complete) {
        if (todo.end_date && todo.end_date.substring(0, 10) === dateToString) {
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
          <i class="material-icons" id="flagLogo" style="${setStyle(todo.priority)}">flag</i>
        </label>
        <h5>
          ${escape(todo.title)}
        </h5>
        <div class="todo-header-buttons">
          <a class="btn btn-flat"><i class="large material-icons taskButton-${i}">more</i></a>
          <a href="#modalUpdate" data-todoid="${todo.id}" class="edit-button btn btn-flat modal-trigger" onclick='clickUpdate(${todo.id})'><i class="large material-icons">mode_edit</i></a>
          <a data-todoid="${todo.id}" class="delete-button btn btn-flat"><i class="large material-icons">delete</i></a>
          <a class="waves-effect waves-light btn modal-trigger" href="#modalDelete" onclick=clickDelete(${todo.id})>Delete2</a>
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
      <div class="row secondLine">
        <p class="col s9 end_date m-t-0 m-l-10">${todo.end_date ? escape(getDayStr(getDaysDiff(todo.end_date))) : ""}</p>
      </div>
  </article>`
  );
  if (!todo.description) {
    $HTMLele.find('.more-info').remove();
  }
  return $HTMLele;
};

// accepts an array of Objects for all todo objects, then passes it to createTodoElement and generate HTML elements
const renderTodos = function (todos) {
  const $todos = $('.todos');
  $todos.empty();
  for (let i = 0; i < todos.length; i++) {
    $todos.append(createTodoElement(todos[i], i));
  }

  $('.collapsible').collapsible({
    inDuration: 150,
    outDuration: 200,
  });

  $('.edit-button').on('click', function () {
    const todoId = Number($(this).data('todoid'));
    $("#category_selection").formSelect()
    const todo = todos.find(todo => todo.id === todoId);
    fillModal(todo);
    $('#modal1').modal('open');

  })

  $('.addTodo.modal-trigger').on('click', function() {
    fillModal({category_id: 1, priority: 4});
    $('.create-todo.modal-close').text('Create todo');
  })

  $('.todo input[type=checkbox]').change(function () {
    const todoId = Number($(this).data('todoid'));
    const todo = todos.find(todo => todo.id === todoId);

    // Update local todo complete property
    todo.complete = !todo.complete;

    // Remove todo from DOM
    $(this).parent().parent().parent().remove();

    // Update server
    const data = { complete: todo.complete };
    $.ajax({ url: `/api/todos/${todoId}/edit`, method: 'POST', data })
    .then( () => {
      $.ajax({ url: '/api/todos', method: 'GET' })
      .then( (todos)=> {countAndAddTodosPerCategory(categories, todos.todo)});
    })
  });

  $('.delete-button').on('click', function () {
    const todoId = Number($(this).data('todoid'));
    todos = todos.filter(todo => todo.id !== todoId);

    $(this).parent().parent().parent().remove();
    $.ajax({ url: `/api/todos/${$(this).data('todoid')}/delete`, method: 'POST' })
   .then( () => {
     $.ajax({ url: '/api/todos', method: 'GET' })
   .then( (todos)=> {countAndAddTodosPerCategory(categories, todos.todo)})
  })
  });
};

const getDayStr = function (numberDay) {
  if (numberDay === null) {
    return null;
  }
  if (numberDay < 1) {
    return "Due today";
  } else {
    const day = Math.round(numberDay);
    if (day === 1)
      return `This is due ${day} day later`;
    return `This is due ${day} days later`;
  }
};


const getColors = function (priorityNumber) {
  if (priorityNumber <= 3 && priorityNumber >= 1)
    return priorityColorsArr[priorityNumber - 1];
  return "grey-text";
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
    const date = new Date(new Date().getTime());
    const dateToString = date.toISOString().substring(0, 10);
    const list = todos.filter(todo => !todo.complete && todo.end_date && todo.end_date.substring(0, 10) === dateToString);
    renderTodos(list);
    $('.list-title').html('Today Todos');
  });
  $(".weekly-todos").on('click', function () {
    const list = todos.filter(todo => !todo.complete && todo.end_date && isDateInNextWeek(todo.end_date.substring(0, 10)));
    console.log('weekly-todos', list);
    renderTodos(list);
    $('.list-title').html('Next 7 days Todos');
  });
  $(".completed-todos").on('click', function () {
    const list = todos.filter(todo => todo.complete === true);
    renderTodos(list);
    $('.list-title').html('Completed Todos');
  });

  const getCreatedID = (data) => {
    const queryString = data.split('&')[1];
    return queryString.split('=')[1];
  };

  const refreshPage = (id) => {
    if (id == 1) {
      $('.watch-todos').trigger('click');
    }
    if (id == 2) {
      $('.buy-todos').trigger('click');
    }
    if (id == 3) {
      $('.read-todos').trigger('click');
    }
    if (id == 4) {
      $('.eat-todos').trigger('click');
    }
  };
  // <-- NavBar -->

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
    $.ajax({ url: '/api/todos', method: 'POST', data })
      .then(resp => {
        todos.push(resp.todo);
        rerender(categories, todos);
      })
      .then(() => {
        refreshPage(getCreatedID(data));
      });

  });

  // < -- Left Navbar -->

  getCategoriesAndTodos();

});
