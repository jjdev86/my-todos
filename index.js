const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
// const Todo = require('./server/database/db');

const { newUser, addTodo, editTodo } = require('./server/database/db');

// console.log(__dirname,'/client/dist')
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'/client/dist')))

// Create new user
app.post('/new-user', async (req, res) => {
    // console.log(req.body);
    const user = await newUser(req.body);
    res.status(202).send(user);
});

// Get all user todos
app.get('/all-todos', (req, res) => {
  
});
// Get all incomplete todos
app.get('/incomplete-todos', (req, res) => {

});

// Get all completed todos
app.get('/completed-todos', (req, res) => {

});

// Add new todo
app.post('/add-todo', async (req, res) => {
    // console.log(req.body)
    const todo = await addTodo(req.body);

    res.status(200).send(todo);
});
// Edit todo
app.patch('/edit-todo', async (req, res) => {
    console.log(req.body)
    const update = await editTodo (req.body);
    res.status(200).send(update);

});
// Delete Todo
app.delete('/remove-todo', (req, res) => {

});

app.delete('/remove-all-todos', (req, res) => {

});


app.listen(port, () => console.log('listening on port ', port));