// This file deals with body Ajax thing.

$(document).ready(function() { // Runs reloading the page
  const getDaysAgo = function (unixTimestamp) {
    var Difference_In_Time = new Date(unixTimestamp) - Date.now(); 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    return Difference_In_Days;
  };

  const title = ["All the categories", , "task(s) for next 7 days", "All the tasks", "Task(s) due today"];
  let todayTODO = [];
  let next7TODO = [];
  let allTODOsArray = [];
  let allCategoriesArray = [];
  let appendHTMLcontent = [];
  function getCategoriesAndTodos() {
    var categories = $.ajax({ url: '/api/categories', method: 'GET' });
    var todos = categories.then(function(dataCategories) {
        // some processing
        return $.ajax({ url: '/api/todos', method: 'GET' });
    });
    return Promise.all([categories, todos]).then(function([dataCategories, dataTodos]) {
        // more processing
        console.log("dataCategories is ", dataCategories, "  and todos is ", dataTodos);
        const todosList = dataTodos.todo;
        const cateList = dataCategories.categories;
        console.log(typeof allTodos);
        for (let todo of allTodos){
          console.log(todo.title);
          console.log(todo.end_date);
          console.log("after to day at", getDaysAgo(todo.end_date));
        }
        return; // something using both resultA and resultB
    });

    // need have all data here since this is asyn

    

  }
  getCategoriesAndTodos();
});