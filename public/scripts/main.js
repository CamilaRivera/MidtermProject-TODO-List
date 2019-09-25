/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

let categories = [];
let todos = [];
const priorityColorsArr = ["blue-text", "orange-text", "green-text"];

const WATCH_MAIN_CATEGORY = 1;
const BUY_MAIN_CATEGORY = 2;
const READ_MAIN_CATEGORY = 3;
const EAT_MAIN_CATEGORY = 4;


const generateStars = (rating, max) => {
  let starHTML = '';
  for (let i = 0; i < rating; i++) {
    starHTML += `<i class="material-icons">star</i>`;
  }
  for (let i = 0; i < max - rating; i++) {
    starHTML += `<i class="material-icons">star_border</i>`;
  }
  return starHTML;
};

const makeTaskListHTML = (listArr, category) => {
  let html = `<h5>${category.description}</h5>`;
  for (let i = 0; i < listArr.length; i++) {
    html += `<h5> Task ${i + 1}:${listArr[i].title} </h5>`;
    html += `<h5> Task Description: ${listArr[i].description} </h5>`;
    html += listArr[i].end_date ? `<h5> Deadline: ${listArr[i].end_date.substring(0, 10)} </h5>`: "";
    html += `<h5> Priority${listArr[i].priority} </h5>`;
  }
  return html;
};


function reloadAll() {
  const categoriesPromise = $.ajax({ url: '/api/categories', method: 'GET' });
  const todosPromise = $.ajax({ url: '/api/todos', method: 'GET' });
  return Promise.all([categoriesPromise, todosPromise]).then(function ([categoriesData, todosData]) {
    console.log('categories: ' ,categoriesData);
    console.log('todosData: ' ,todosData);

    categories = categoriesData.categories;
    todos = todosData.todo;
    return [categoriesData.categories, todosData.todo];
  });
}

function rerender(categories, todos) {
  renderCategories(categories);
  countAndAddTodosPerCategory(categories, todos);
}

function getCategoriesAndTodos() {
  reloadAll().then(data => rerender(data[0], data[1]));
}

const renderCategories = function (categories) {
  console.log(categories);
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
  const date = new Date(new Date().getTime() - 1 * 24 * 3600 * 1000);
  const dateToString = date.toISOString().substring(0, 10);
  let watchBody = "";
  let buyBody = "";
  let readBody = "";
  let eatBody = "";
  let todayBody = "";
  let weekBody = "";

  $(".collapsible-body").empty();


  for (let category of categories) {
    const categoryTodos = todos.filter(todo => category.id === todo.category_id);
    for (let todo of categoryTodos) {
      if (todo.end_date && todo.end_date.substring(0, 10) === dateToString) {
        todayBody += `<div class="collapsible-body m-l-20"><span>To ${category.description}: ${todo.title}</span></div>`;
        today += 1;
      }
      if (todo.end_date && isDateInNextWeek(todo.end_date.substring(0, 10))) {
        weekBody += `<div class="collapsible-body m-l-20"><span>To ${category.description}: ${todo.title}</span></div>`;
        week += 1;
      }
      if (category.main_category === WATCH_MAIN_CATEGORY) {
        watchBody += `<div class="collapsible-body m-l-20"><span>${todo.title}</span></div>`;
        watch += 1;
      }
      if (category.main_category === BUY_MAIN_CATEGORY) {
        buyBody += `<div class="collapsible-body m-l-20"><span>${todo.title}</span></div>`;
        buy += 1;
      }
      if (category.main_category === READ_MAIN_CATEGORY) {
        readBody += `<div class="collapsible-body m-l-20"><span>${todo.title}</span></div>`;
        read += 1;
      }
      if (category.main_category === EAT_MAIN_CATEGORY) {
        eatBody += `<div class="collapsible-body m-l-20"><span>${todo.title}</span></div>`;
        eat += 1;
      }
    }
  }

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


  $(".weekly-todos").append(weekBody);
  $(".today-todos").append(todayBody);

  $(".watch-todos").append(watchBody);
  $(".buy-todos").append(buyBody);
  $(".read-todos").append(readBody)
  $(".eat-todos").append(eatBody);

  $(".week").text(`(${week})`);
  $(".today").text(`(${today})`);
  $(".to_watch").text(`(${watch})`);
  $(".to_buy").text(`(${buy})`);
  $(".to_read").text(`(${read})`);
  $(".to_eat").text(`(${eat})`);
};

const createTodoElement = function(todo) {
  const $HTMLele = $(
    `<article class='todo'>
      <div class = "oneLine" style="display: flex; align-items: baseline; justify-content: space-between;">
      <p class="title" style="display: inline;">${escape(todo.title)}</p>
        <label style="display: inline;">
          <input type="checkbox" class="filled-in" id="checkoutBox"/>
          <span class=" todos-list ${getColors(todo.priority)}"> Complete </span>
        </label>

      </div>
      <div class = "secondLine">
        <p class="end_date">${escape(getDayStr(getDaysDiff(todo.end_date)))}</p>
        <a class="waves-effect waves-light btn">Update</a>
        <a class="waves-effect waves-light btn">Delete</a>
      </div>
      <ul class="collapsible">
      <li>
        <div class="collapsible-header">Description</div>
        <div class="collapsible-body"><span>${escape(todo.description)}</span></div>
      </li>
      </ul>
  </article>`
  );
  return $HTMLele;
};

// accepts an array of Objects for all todo objects, then passes it to createTodoElement and generate HTML elements
const renderTodos = function(todos) {
  console.log('renderTodos', todos);
  const $todos = $('.todos');
  $todos.empty();
  for (let i = 0; i < todos.length; i++) {
    $todos.append(createTodoElement(todos[i]));
  }
  const $colla = $('.collapsible');
  console.log("it finds", $colla);
  $colla.collapsible();
};

const getDayStr = function(numberDay) {
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

//
const getColors = function(priorityNumber) {
  if (priorityNumber <= 3 && priorityNumber >= 1)
    return priorityColorsArr[priorityNumber - 1];
  return "grey-text";
};

// checks the input
const escape = function(str) {
  if (str === null) {
    str = "No specify here";
  }
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

  // Gets a Date format string and returns a number which is the difference with the current date time
  const getDaysDiff = function(unixTimestamp) {
    if (unixTimestamp === null) {
      console.log("here is some thewfasdfsdc");
      return null;
    }
    let Difference_In_Time = new Date(unixTimestamp) - Date.now();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  };

jQuery(document).ready(function ($) {

  // Get number of days passed since timestamp
  const getDaysAgo = function (unixTimestamp) {
    const days = Math.round((Date.now() - new Date(unixTimestamp)) / (1000 * 60 * 60 * 24));
    const daysNoun = days > 1 ? 'days' : 'day'; // Handle plural/singular
    return `${days} ${daysNoun} ago`;
  };

  //escape potential malicious todos
  const escape = function (str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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

  //collapsible todos for each category
  $('.collapsible').collapsible({
    inDuration: 150,
    outDuration: 200,
  });










  getCategoriesAndTodos();

});

