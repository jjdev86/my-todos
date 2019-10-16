const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
// const Todo = require('./server/database/db');

const {
  newUser,
  addTodo,
  editTodo,
  deleteTodo,
  isComplete,
  allTodos,
  incompleteTodos,
  completedTodos,
  deleteAllTodos
} = require("./server/database/db");

// console.log(__dirname,'/client/dist')
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/client/dist")));

// Create new user
app.post("/new-user", async (req, res) => {
  // console.log(req.body);
  const user = await newUser(req.body);
  res.status(202).send(user);
});

// Get all user todos
app.get("/all-todos:id", async (req, res) => {
//   console.log(req.params, `BODY`);
  const All = await allTodos(req.params);
  res.status(200).send(All);
});
// Get all incomplete todos
app.get("/incomplete-todos:id", async (req, res) => {
    const incompletes = await incompleteTodos(req.params.id)
    res.status(200).send(incompletes);
});

// Get all completed todos
app.get("/completed-todos:id", async (req, res) => {
    const completed = await completedTodos(req.params.id)
    res.status(200).send(completed);
});

// Add new todo
app.post("/add-todo", async (req, res) => {
  // console.log(req.body)
  const todo = await addTodo(req.body);

  res.status(200).send(todo);
});
// Edit todo
app.patch("/edit-todo", async (req, res) => {
  console.log(req.body);
  const update = await editTodo(req.body);
  res.status(200).send(update);
});
app.patch("/complete-todo", async (req, res) => {
//   console.log(req.body, `in server file`);
  const update = await isComplete(req.body);
  res.status(200).send(update);
});
// Delete Todo
app.delete("/remove-todo", async (req, res) => {
  console.log(req.body);
  const deleted = await deleteTodo(req.body.id);
  // res.status(200).send(JSON.stringify(req.body.id));
  res.status(200).send(deleted);
});

app.delete("/remove-all-todos:id", async (req, res) => {
    const deleteAll = await deleteAllTodos(req.params.id)
    try {
        res.status(200).send('OK');
    } catch(err) {
        res.send(err);
    };

});

app.listen(port, () => console.log("listening on port ", port));
