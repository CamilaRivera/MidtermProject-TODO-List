const clickProfileUpdate = function (userID) {
  console.log(userID);
  // $('.modal').modal();
  // $.ajax({ url: `/api/todos/${id}`, method: 'GET' })
  // .then(resp => {
  //   const todo = resp.todo;
  //   console.log(todo);

  //   console.log(todo.end_date);

  //   const endDateAfterSlice = (todo.end_date).slice(0, 10);
  //   var d = new Date("todo.end_date");
  //   $( "#modalUpdate .modal-content" ).html(takeInputTOHTML(todo));
  //   console.log("after modal update called");
  // });
}


const makeDeleteCsontent = function (todo) {
  return `
  <div class="modal-content">
    <h4>Are you sure to delete the Task ${todo.title}</h4>
  </div>
  <div class="modal-footer">
  <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
  <a onclick=deleteComplete(${todo.id}) id="update-todo" class="update-todo modal-close waves-effect waves-green btn-flat">Delete todo</a>
  </div>
  `};

// This file is the reaction for all jQuery events for app.js

const clickDelete = function (id) {
  $('.modal').modal();
  $.ajax({ url: `/api/todos/${id}`, method: 'GET' })
  .then(resp => {
    console.log(resp.todo)
    const todo = resp.todo;
    $("#modalDelete").html(makeDeleteCsontent(todo));
  });
};

const clickUpdate = function (id) {
  $('.modal').modal();
  $.ajax({ url: `/api/todos/${id}`, method: 'GET' })
    .then(resp => {
      const todo = resp.todo;
      console.log(todo);

      // console.log(todo.end_date);

      // const endDateAfterSlice = (todo.end_date).slice(0, 10);
      // var d = new Date("todo.end_date");
      $("#modalUpdate .modal-content").html(takeInputTOHTML(todo));
      console.log("after modal update called");
      $('.startDatepicker').datepicker({
        defaultDate: new Date(todo.start_date),
        setDefaultDate: true,
        format: 'yyyy-mm-dd'
      });
      $('.endDatepicker').datepicker({
        defaultDate: new Date(todo.end_date),
        setDefaultDate: true,
        format: 'yyyy-mm-dd'
      });
    });
};

const takeInputTOHTML = function (todo) {
  return `
  <form id="submitUpdate" class="col s12 todo-form">
    <div class="row">
      <input type="hidden" name="todo_id" value="${todo.id}" id="todo_id"/>
      <div class="row">
        <div class="input-field col s6">
          Todo Title <br>
          <input required name="title" id="todo_title" type="text" class="validate" value="${todo.title}">
          <span class="helper-text" data-error="You need to fill this field" data-success="right">You need to fill this field</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          Description <br>
          <input id="todo_description" name="description" type="text" class="validate" value="${todo.description}">
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          Start Date<br>
          <input id="todo_start_date" name="start_date" type="text" class="startDatepicker" value="${(todo.start_date).slice(0, 10)}">
        </div>
        <div class="input-field col s6">
          End date <br>
          <input id="end_date" name="end_date" type="text" class="endDatepicker endDate" value="${(todo.end_date).slice(0, 10)}">
        </div>
      </div>
      <div class="row" style="height: 100px;">
        <div class="input-field col s6" style="height: 50px;">
          Category <br>
          <select name="category_id" id="category_selection" value="${todo.category_id}">
            <option value="1" ${todo.category_id === 1 ? 'selected' : ''}>Movie</option>
            <option value="2" ${todo.category_id === 2 ? 'selected' : ''}>Product</option>
            <option value="3" ${todo.category_id === 3 ? 'selected' : ''}>Book</option>
            <option value="4" ${todo.category_id === 4 ? 'selected' : ''}>Food</option>
        </select>
        </div>
        <div class="input-field col s6">
          Priority <br>
          <select name="priority" id="priorityID" value="${todo.priority}">
            <option value="1" ${todo.priority === 1 ? 'selected' : ''}>High</option>
            <option value="2" ${todo.priority === 2 ? 'selected' : ''}>Medium</option>
            <option value="3" ${todo.priority === 3 ? 'selected' : ''}>Low</option>
            <option value="4" ${todo.priority === 4 ? 'selected' : ''}>Non-priority</option>
          </select>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="submit" id="update-todo" class="update-todo modal-close waves-effect waves-green btn-flat">Update todo</button>
    </div>
</form>
  `;
}

$(() => { // get called once the page gets reload
  $('body').on('submit', '#submitUpdate', (e) => {
    e.preventDefault();
    const $form = $(e.target).closest('form');
    const data = $form.serialize();
    const todoID = $form.find('[name="todo_id"]').val();
    $.ajax({ url: `/api/todos/${todoID}/edit`, method: 'POST', data })
      .then(() => {
        console.log("sent to the dB");
        location.reload();
      })
      .catch(function (err) {
        console.log("errr is", err);
      });
  });
});

const updateComplete = function (id) {
  $("#elementId :selected").val();
  $('body').on('submit', '#submitUpdate', (e) => {
    e.preventDefault();
    const $form = $(e.target).closest('form');
    const data = $form.serialize();
    const todoID = $form.find('[name="todo_id"]').val();
    $.ajax({ url: `/api/todos/${todoID}/edit`, method: 'POST', data })
      .then(() => {
        console.log("sent to the dB");
        location.reload();
      })
      .catch(function (err) {
        console.log("errr is", err);
      });
  });

  const data = $('form.todo-form:first').serialize();

  $.ajax({ url: `/api/todos/${id}/edit`, method: 'POST', data })
    .then(() => {
      console.log("sent to the dB");
      location.reload();
    })
    .catch(function (err) {
      console.log("errr is", err);
    });
}; // end of updateComplete

const deleteComplete = function (id) {
  console.log(id);
  $.ajax({ url: `/api/todos/${id}/delete`, method: 'POST', })
    .then(() => {
      console.log("sent to the dB");
      location.reload();
      // $.ajax({ url: `/api/todos/${id}`, method: 'GET' })
      //   .then(resp => {
      //     console.log(resp.todo.category_id);
      //     renderTodos(resp.todo.category_id);
      //   });
    })
    .catch(function (err) {
      console.log("errr is", err);
    });
}; // end of deleteComplete
