/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

let categories = [];
let todos = [];

const WATCH_MAIN_CATEGORY = 1;
const BUY_MAIN_CATEGORY = 2;
const READ_MAIN_CATEGORY = 3;
const EAT_MAIN_CATEGORY = 4;


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

  function createDate() {
    return
  }

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
      });

  });

  //<-- Todos -->

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTodos = function (todos) {
    const alltodos = [];
    $('.todos').empty();
    for (const todo of todos) {
      alltodos.push(createTodoElement(todo));
    }
    $('.todos').append(alltodos);
  };

  const createTodoElement = function (todo) {
    const $todo = $(
      `<article class='todo'>
        <header>
          <p>${escape(todo.title)}</p>

        </header>
        <p>${escape(todo.description)}</p>
        <footer>
          <span>${getDaysAgo(todo.creation_date)}</span>
        </footer>
    </article>`
    );
    return $todo;
  };

  // load todos and render them
  const loadTodos = () => {
    $.ajax({ url: '/api/todos', method: 'GET' })
      .then(
        function (data) {
          renderTodos(data.todo);
        })
  };
  loadTodos();

  // < -- Left Navbar -->

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
      ` <li class='category'><a>${escape(category.description)}</a></li>`
    );
    return $category;
  };

  const countTodosPerCategory = function (categories, todos) {
    let watch = 0;
    let buy = 0;
    let read = 0;
    let eat = 0;
    let today = 0;
    let week = 0;
    const date = new Date();
    const dateToString = date.toISOString().substring(0, 10);

    for (let category of categories) {
      const categoryTodos = todos.filter(todo => category.id === todo.category_id);
      for (let todo of categoryTodos) {
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
      }
    }
    $(".week").text(`(${week})`);
    $(".today").text(`(${today})`);
    $(".to_watch").text(`(${watch})`);
    $(".to_buy").text(`(${buy})`);
    $(".to_read").text(`(${read})`);
    $(".to_eat").text(`(${eat})`);
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

  function rerender(categories, todos) {
    renderCategories(categories);
    countTodosPerCategory(categories, todos);
  }

  function getCategoriesAndTodos() {
    reloadAll().then(data => rerender(data[0], data[1]));
  }



  getCategoriesAndTodos();

});

