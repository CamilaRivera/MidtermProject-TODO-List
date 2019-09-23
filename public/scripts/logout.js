$(() => {
  $('#logout').on('click', (event) => {
    $.ajax('/logout', {
      method: "POST"
    }).then(() => console.log('redirecting to home page'));
  });
});