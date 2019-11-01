const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@server1-lpsq6.mongodb.net/TodosDB?retryWrites=true&w=majority
  `, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log('"we\'re connected!"');
});

const TodoSchema = new mongoose.Schema({
  todo: String,
  isComplete: { type: Boolean, default: false },
  username: String,
  date: { type: Date, default: Date.now },
  userId: String
});

const Users = new mongoose.Schema({
  username: String,
  email: String,
  date: { type: Date, default: Date.now }
});
const Todo = mongoose.model("todo", TodoSchema);
const User = mongoose.model("user", Users);

const newUser = async username => {
  // console.log(username, `from db line 31`)
  let response = await User.insertMany(username);
  try {
    // console.log(response, `from db line 33`)
    return response;
  } catch (err) {
    return err;
  }
};

const getUser = async (email, username) => {
  const user = await User.find({ email: email });
  try {
    if (!user.length) {
      // create new user in db if not existing based on authentication
      const adduser = {};
      adduser.email = email;
      adduser.username = username;
      const nwUser = await newUser(adduser);
      return nwUser;
    } else {
      return user;
    }
  } catch (err) {
    return err;
  }
};
const addTodo = async body => {
  const response = await Todo.insertMany(body);
  try {
    return response;
  } catch (err) {
    return err;
  }
};

const editTodo = async body => {
  const id = body._id;
  const todo = await Todo.findByIdAndUpdate(id, { todo: body.todo });
  try {
    const updated = await Todo.findById(id);
    // console.log(updated)
    return updated;
  } catch (err) {
    return err;
  }
};
const isComplete = async todo => {
  const id = todo._id;
  const isdone = await Todo.findByIdAndUpdate(id, {
    isComplete: todo.isComplete
  });
  try {
    const updated = await Todo.findById(id);
    return updated;
  } catch (err) {
    return err;
  }
};

const deleteTodo = async id => {
  const todo = await Todo.findByIdAndDelete(id);
  try {
    return todo;
  } catch (err) {
    return err;
  }
};

const allTodos = async id => {
  const all = await Todo.find({ userId: id });
  try {

    return all;
  } catch (err) {
    return err;
  }
};

const incompleteTodos = async id => {
  // find all todos with id
  const todos = await Todo.find({ userId: id, isComplete: { $eq: false } });
  try {
    return todos;
  } catch (err) {
    return err;
  }
};

const completedTodos = async id => {
  const todos = await Todo.find({ userId: id, isComplete: { $eq: true } });
  try {
    return todos;
  } catch (err) {
    return err;
  }
};

const deleteAllTodos = async id => {
  const todos = await Todo.deleteMany({ userId: id });
  try {
    return todos;
  } catch (err) {
    return err;
  }
};

module.exports = {
  newUser,
  addTodo,
  editTodo,
  deleteTodo,
  isComplete,
  allTodos,
  incompleteTodos,
  completedTodos,
  deleteAllTodos,
  getUser
};
