// This file deals with body Ajax thing.

$(document).ready(function() { // Runs reloading the page
  $('.modal').modal();
  const priorityColorsArr = ["blue-text", "orange-text", "green-text"];
  let todayTODO = [];
  let next7TODO = [];
  let allTODOsArray = [];
  let todosList = {};
  let cateList = {};
  const $todos = $('.todos');
  const getDayStr = function(numberDay) {
    if (numberDay === null) {
      return null;
    }
    if (numberDay < 0 && numberDay > -1) {
      return "Due today";
    } else {
      const day = Math.round(numberDay);
      if (day >= 0)
        return `This is due ${day} day later`;
      return `This is due ${day} days later`;
    }
  };

  const setStyle = function(priorityNumber) {
    if (priorityNumber === 1)
      return "color: red";
    else if (priorityNumber === 2)
      return "color: blue";
    else if (priorityNumber === 3)
      return "color: green";
    return "visibility: hidden"
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
  // passed by createTodoElement
  const createTodoElement = function(todo) {
    const $HTMLele = $(
      `<article class='todo'>
        <div class = "oneLine">
          <label>
            <input type="checkbox" class="filled-in" id="checkoutBox" onclick=checkComplete(${todo.id}) />
            <span class="todos-list"></span> 
            <i class="material-icons" id="flagLogo" style="${setStyle(todo.priority)}">flag</i>
          </label>
          <p class="title">${escape(todo.title)}</p>
          <a class="btn p-r-20 btn-flat col s1"><i class="large material-icons">mode_edit</i></a>
          <a class=" p-l-20 btn btn-flat"><i class="large material-icons">delete</i></a>
        </div>
        <div class = "secondLine">
          <p class="end_date">${escape(getDayStr(getDaysDiff(todo.end_date)))}</p>
          <button data-target="modalUpdate" class="waves-effect waves-light btn updateTodo modal-trigger" onclick=clickUpdate(${todo.id})>Update</button>
          <a class="waves-effect waves-light btn modal-trigger" href="#modalDelete" onclick=clickDelete(${todo.id})>Delete</a>
        </div>
        <ul class="collapsible">
        <li>
          <div class="collapsible-header">Description</div>
          <div class="collapsible-body"><span>${escape(todo.description)}</span></div>
        </li>
        </ul>
    </article>`
    );
    $('#flagLogo').css('color', 'red');
    return $HTMLele;
  };

  const setFlagColor = function(priorityID){
    if (priorityID === 1) {
      $('#flagLogo').css('color', 'red');
    }
  }

  // accepts an array of Objects for all todo objects, then passes it to createTodoElement and generate HTML elements
  const renderTodos = function(todos) {
    for (let i = 0; i < todos.length; i++) {
      $todos.append(createTodoElement(todos[i]));
    }
    const $colla = $('.collapsible');
    $('#flagLogo').css('color', 'red');
    $colla.collapsible();
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
      for (let todo of todosList) {
        if (todo.end_date !== null) {

          // This check if the task is today's todo
          // also needs to check if its passed task
          if (getDaysDiff(todo.end_date) < 0 && todo.complete === false && getDaysDiff(todo.end_date) > -1) {
            console.log("dite diff is ", getDaysDiff(todo.end_date));
            todayTODO.push(todo);
          } else if (getDaysDiff(todo.end_date) < 7 && todo.complete === false) {
            next7TODO.push(todo);
          } else {
            if (todo.complete === false){
              allTODOsArray.push(todo);  
            }
          }
        } else {
          if (todo.complete === false){
            allTODOsArray.push(todo);
          }
        }
      }

      // checks the input and generate the heading sentence
      if (todayTODO.length > 0) {
        if (todayTODO.length === 1){
          $todos.append(`<h4> Task due today </h4>`);
        } else {
          $todos.append(`<h4> Tasks due today </h4>`);
        }
        renderTodos(todayTODO);
      } else if (next7TODO.length > 0) {
        if (next7TODO.length === 1) {
          $todos.append(`<h4> task for next 7 days </h4>`);
        } else {
          $todos.append(`<h4> Tasks for next 7 days</h4>`);
        }
        renderTodos(next7TODO);
      } else if (allTODOsArray.length > 0) {
        if (next7TODO.length === 1) {
          $todos.append(`<h4> All the task </h4>`);
        } else {
          $todos.append(`<h4> All the tasks </h4>`);
        }
        renderTodos(allTODOsArray);
      } else { // no todo tasks
        // $todos.append(`<h4> All the Categories </h4>`);
        // generateCategories(cateList);
        $todos.append(`
        <div class= "notodo">
          <h4> No todo task </h4>
          <img src="https://i.pinimg.com/originals/a3/81/87/a38187708e26901e5796a89dd6d7d590.jpg" alt="cover_photo_url" height="400">
          <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Add new todo task</a>
        </div>
        `);
      }
      return; // something using both resultA and resultB
    });
    // need have all data here since this is asyn
  }

  getCategoriesAndTodos();
});
