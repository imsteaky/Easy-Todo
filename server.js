// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/todos", function (request, response) {
  response.send(todos);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/todos", function (request, response) {
  let newTodo = { id: todos.length, text: request.query.todo };
  todos.push(newTodo);
  response.send(newTodo);
});

// delete method
app.post("/delete", function (request, response) {
  let id = request.query.id;
  let todoIndex = -1;
  for (var i = 0; i< todos.length; i++) {
    if (todos[i].id == id) {
      todoIndex = i;
      break;
    }
  }

  if (todoIndex === -1) {
    response.send({success: false});
  }
  else {
    todos.splice(todoIndex, 1);
    response.send({success: true});
  }
});

// Simple in-memory store for now
var todos = [
  { id: 0, text: "Visit Denver" },
  { id: 1, text: "Save Entered Items" },
  { id: 2, text: "Walk Ammy" }
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
