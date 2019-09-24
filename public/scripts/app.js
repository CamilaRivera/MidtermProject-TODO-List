// This file deals with body Ajax thing.

$(document).ready(function() { // Runs reloading the page

  let todayTODO = [];
  let next7TODO = [];
  let allTODOsArray = [];
  let todosList = {};
  let cateList = {};
  const $todos = $('.todos');
  const getDayStr = function(numberDay) {
    if (numberDay === null) {
      console.log("in getdatstr");
      return null;
    }
    if (numberDay < 1) {
      return "This is due today";
    } else {
      const day = Math.round(numberDay);
      return `This is due ${day} later`;
    }
  };

  // checks the input
  const escape = function(str) {
    if (str === null) {
      str = "No specify here.";
    }
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // passed by createTodoElement
  const createTodoElement = function(todo) {
    const $HTMLele = $(
      `<article class='todo'>
        <header>
          <p>${escape(todo.title)}</p>
        </header>
        <p>${escape(todo.description)}</p>
        <footer>
          <span>${escape(getDayStr(getDaysDiff(todo.end_date)))}</span>
        </footer>
    </article>`
    );
    return $HTMLele;
  };

  // accepts an array of Objects for all todo objects, then passes it to createTodoElement and generate HTML elements
  const renderTodos = function(todos) {
    for (let i = 0; i < todos.length; i++) {
      $todos.append(createTodoElement(todos[i]));
    }
  };

  // called by function generateCategories, will return a HTML string for each category
  const createCategoryElement = function(categories) {
    const $HTMLele = $(
      `<article class='todo'>
        <header>
          <p>${escape(categories.description)}</p>
        </header>
        <img src="${escape(categories.cover_photo_url)}" alt="cover_photo_url" width="42" height="42">
        <p>${escape(categories.creation_date)}</p>
    </article>`
    );
    return $HTMLele;
  };
  // Generate the HTML structure for ONLY categories
  const generateCategories = function(categories) {
    for (let i = 0; i < categories.length; i++) {
      $todos.append(createCategoryElement(categories[i]));
    }
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

  function getCategoriesAndTodos() {
    let categories = $.ajax({ url: '/api/categories', method: 'GET' });
    let todos = categories.then(function(dataCategories) {
      // some processing
      return $.ajax({ url: '/api/todos', method: 'GET' });
    });
    return Promise.all([categories, todos]).then(function([dataCategories, dataTodos]) {
      $todos.empty();
      // more processing
      todosList = dataTodos.todo;
      cateList = dataCategories.categories;
      // check each date difference
      console.log(todosList);
      for (let todo of todosList) {
        if (todo.end_date !== null) {
          if (getDaysDiff(todo.end_date) < 1 && todo.complete === false && getDaysDiff(todo.end_date) > -2) {
            todayTODO.push(todo);
            allTODOsArray.push(todo);
          } else if (getDaysDiff(todo.end_date) < 7 && todo.complete === false) {
            next7TODO.push(todo);
            allTODOsArray.push(todo);
          } else {
            allTODOsArray.push(todo);
          }
        } else {
          allTODOsArray.push(todo);
        }
      }

      // checks the input and generate the heading sentence
      const headingTitle = ["Task(s) due today", "task(s) for next 7 days", "All the tasks", "All the Categories"];
      if (todayTODO.length > 0) {
        if (todayTODO.length === 1){
          $todos.append(`<h3> Task due today </h3>`);
        } else {
          $todos.append(`<h3> Tasks due today </h3>`);
        }
        renderTodos(todayTODO);
      } else if (next7TODO.length > 0) {
        if (next7TODO.length === 1) {
          $todos.append(`<h3> task for next 7 days </h3>`);
        } else {
          $todos.append(`<h3> Tasks for next 7 days</h3>`);
        }
        renderTodos(next7TODO);
      } else if (allTODOsArray.length > 0) {
        if (next7TODO.length === 1) {
          $todos.append(`<h3> All the task </h3>`);
        } else {
          $todos.append(`<h3> All the tasks </h3>`);
        }
        renderTodos(allTODOsArray);
      } else {
        $todos.append(`<h3> All the Categories </h3>`);
        generateCategories(cateList);
      }
      return; // something using both resultA and resultB
    });
    // need have all data here since this is asyn
  }
  getCategoriesAndTodos();
});