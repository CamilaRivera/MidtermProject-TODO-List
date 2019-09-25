// This file is the reaction for all jQuery events for app.js
function clickDelete(id) {
  $.ajax(`api/todos/${id}/delete`, {
    method: "POST"
  }).then(() => console.log('redirecting to home page'));
  location.reload();
}

function checkComplete(id) {
  // alert("This is in checkComplete " + id);
  $.ajax(`api/todos/${id}/completed`, {
    method: "POST"
  }).then(() => console.log('redirecting to home page'));
  location.reload();
}

function clickUpdate(id) {
  $.ajax({ url: `/api/todos/${id}`, method: 'GET' })
  .then(resp => {
    console.log("here is the checkupdate");
    const todo = resp.todo;
    console.log(todo);
    $( "#modalUpdate .modal-content" ).html(takeInputTOHTML(todo));
  });
}

const takeInputTOHTML = function (todo){
  return `
  <div class="row">
    <form class="col s12 todo-form">
      <input type="text" name="todo_id" value="${todo.id}" id="todo_id" style="visibility: hidden; height: 0; width: 0;" />
      <div class="row">
        <div class="input-field col s6">
          <input required name="title" id="todo_title" type="text" class="validate" value="${todo.title}">
          <span class="helper-text" data-error="You need to fill this field" data-success="right">You need to fill
            this field</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="todo_description" name="description" type="text" class="validate" value="${todo.description}">
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="todo_start_date" name="start_date" type="text" class="datepicker" value="${todo.start_date}">
          <label for="todo_start_date">Start Date</label>
        </div>
        <div class="input-field col s6">
          <input id="end_date" name="end_date" type="text" class="datepicker" value="${todo.end_date}">
          <label for="end_date">End Date</label>
        </div>
      </div>
      <div class="row" style="height: 100px;">
        <div class="input-field col s6" style="height: 50px;">
          <select name="category_id" id="category_selection" value="${todo.category_id}">
            <option selected disabled hidden>Choose here</option>
          </select>
        </div>
        <div class="input-field col s6">
          <select name="priority" value="${todo.priority}">
          </select>
        </div>
      </div>
    </form>
    </div>
    <div class="modal-footer">
    <a onclick=updateComplete(${todo.id}) id="update-todo" class="update-todo modal-close waves-effect waves-green btn-flat">Update todo</a>
    </div>
  `;
}
const updateComplete = function(id){
  console.log($('form.todo-form'));
  console.log($('form.todo-form').serialize());
  console.log($('form.todo-form').serialize().replace(/[^&]+=&/g, ''));
  console.log($('form.todo-form').serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, ''));
  const data = $('form.todo-form').serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '');
  console.log(data);
  $.ajax({ url: `/api/todos/${id}/edit`, method: 'POST', data })
    .then(() => {
      console.log("sent to the dB");
      location.reload();
    });
};