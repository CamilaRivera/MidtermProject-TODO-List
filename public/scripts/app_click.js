// This file is the reaction for all jQuery events for app.js
function checkDelete(id) {
  $.ajax(`api/todos/${id}/delete`, {
    method: "POST"
  }).then(() => console.log('redirecting to home page'));
  location.reload()
}

function checkComplete(id) {
  alert("This is in checkComplete " + id);
  $.ajax(`api/todos/${id}/completed`, {
    method: "POST"
  }).then(() => console.log('redirecting to home page'));
  location.reload()
}

function checkUpdate(id) {
  alert("asfas");
  location.reload()
}