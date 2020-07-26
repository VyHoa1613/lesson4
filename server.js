// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

var todoList = [
      {id: 1, todo: 'Rửa bát'},
      {id: 2, todo: 'Nấu cơm'},
      {id: 3, todo: 'lau nhà'},
      {id: 4, todo: 'Học code trên CodersX'}
    ]

app.set('view engine', 'pug');
app.set('views','./views');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todo", (req, res) => {
  res.render('todos',{
    todoList:todoList
  })
})

app.get("/todo/search", (req, res) => {
  var q = req.query.q;
  var match = todoList.filter(function(todos){
     return todos.todo.toLowerCase().indexOf(q.toLowerCase()) !==-1;
});
  res.render('todos',{
    todoList:match
  });
  })

app.get('/todo/create', (req, res) => {
  res.render('create');
})

app.post('/todo/create', (req, res) => {
  todoList.push(req.body);
  res.redirect('/todo');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
