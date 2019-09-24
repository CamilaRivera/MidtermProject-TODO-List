// This file deals with body Ajax thing.

$(document).ready(function() { // Runs reloading the page

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

  const renderTodos = function (todos) {
    const alltodos = [];
    $('.todos').empty();
    for (const todo of todos) {
      alltodos.push(createTodoElement(todo));
    }
    $('.todos').append(alltodos);
  };

  const loadTodos = () => {
    $.ajax({ url: '/api/todos', method: 'GET' })
      .then(
        function (data) {
          console.log(data);
          renderTodos(data.todo);
        })
  };

  const getDaysAgo = function (unixTimestamp) {
    var Difference_In_Time = new Date(unixTimestamp) - Date.now(); 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    return Difference_In_Days;
  };

  const headingTitle = ["Task(s) due today", "task(s) for next 7 days", "All the tasks", "All the Categories"];
  let todayTODO = {};
  let next7TODO = [];
  let allTODOsArray = [];
  let allCategoriesArray = [];
  let appendHTMLcontent = []; // this is the array we will do the append to the HTML structure
  let todosList = {};
  let cateList = {};
  function getCategoriesAndTodos() {
    var categories = $.ajax({ url: '/api/categories', method: 'GET' });
    var todos = categories.then(function(dataCategories) {
        // some processing
        return $.ajax({ url: '/api/todos', method: 'GET' });
    });
    return Promise.all([categories, todos]).then(function([dataCategories, dataTodos]) {
        // more processing
        console.log("more processing");
        console.log("dataCategories is ", dataCategories, "  and todos is ", dataTodos);
        const todosList = dataTodos.todo;
        const cateList = dataCategories.categories;
        // check each date difference
        for (let todo of todosList){
          console.log("after to day at", getDaysAgo(todo.end_date));
          if (getDaysAgo(todo.end_date) < 1) {
            todayTODO[todo.id] = todo;
          } else if (getDaysAgo(todo.end_date) < 7) {
            next7TODO[todo.id] = todo;
          } else {
            console.log("checking the date.id", todo.id);
            allTODOsArray[todo.id] = todo;
          }
        }

        if (todayTODO.length > 0 ) {
          console.log(headingTitle[0]);
          console.log((Object.keys(todayTODO).length));
        } else if (next7TODO.length > 0) {
          console.log(headingTitle[1]);
          console.log((Object.keys(next7TODO).length));
        } else if (allTODOsArray.length > 0) {
          console.log(headingTitle[2]);
          console.log(typeof allTODOsArray[1]);
          console.log((Object.keys(allTODOsArray).length));
        } else {
          console.log((Object.keys(allCategoriesArray).length));
        }
        loadTodos();
        return; // something using both resultA and resultB
    });

    // need have all data here since this is asyn
    
    

  }
  getCategoriesAndTodos();

});