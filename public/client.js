// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  function addToList(todo) {
    $('<li></li>').html(`<span><i class="fa fa-trash"></i></span> ${todo.text}`)
      .attr('data-id', todo.id).appendTo('ul#todos');
  }
  
  function saveNewTodo(todo) {
    $.post('/todos?' + $.param({todo: todo}), (newTodo) => {
      addToList(newTodo);
      $('#textInput').val('');
    });
  }
  
  function deleteTodo(id) {
    $.post('/delete?'  + $.param({id: id}), (response) => {
      if (response.success) {
        let row = $(`li[data-id=${id}]`);
        row.fadeOut(500, () => row.remove());
      }
    });
  }
  
  // on page load, call /todos and add the results to the html
  $.get('/todos', function(todos) {
    todos.forEach(function(todo) {
      addToList(todo);
    });
  });

  // Check Off Specific Todos By Clicking
  $("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
  });

  //Click on X to delete Todo
  $("ul").on("click", "span", function(event){
    var todoId = $(this).parent().data('id');
    console.log("Calling deleteTodo with " + todoId);
    deleteTodo(todoId);
    event.stopPropagation();
  });

  $("input[type='text']").keypress(function(event){
    if(event.which == 13){
      //grabbing new todo text from input
      var todoText = $(this).val();
      saveNewTodo(todoText);
    }
  });

  $(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
  });
});

