/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

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

  //open modal Todo
  $('.modal').modal();

  // listen start_date
  $('.datepicker').datepicker();

  //select priority
  $('select').formSelect();

  $('.create-todo').click(function(event) {
    if(!$('#todo_title').val() || !$('#todo_title').val().trim()){
      event.stopPropagation();
    }
    $.ajax({ url: '/api/todos', method: 'POST', data: $('form').serialize() });

  });
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

  // load tweets and render them
  const loadTodos = () => {
    $.ajax({ url: '/api/todos', method: 'GET' })
      .then(
        function (data) {
          console.log(data)
          renderTodos(data.todo);
        })
  };
  loadTodos();
});
  // // listener on tweet submit
  // $('.new-tweet-submission').on('submit', function (event) {
  //   //prevents the normal post event
  //   $('.error').hide();
  //   event.preventDefault();
  //   if ($('.tweet-text').val().length > 140) {
  //     $('.error').text('❌  Tweet content must be shorter than 140 characters');
  //     $('.error').slideDown();
  //   }
  //   else if ($('.tweet-text').val().length === 0) {
  //     $('.error').text('❌  Your tweet cannot be empty');
  //     $('.error').slideDown();
  //   } else {
  //     $.ajax({ url: '/tweets', method: 'POST', data: $(this).serialize() })
  //       .then(loadTweets)
  //       .fail(err => {
  //         alert('Failed to submit tweet', err);
  //       });
  //   }
  // });
