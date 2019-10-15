const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('"we\'re connected!"');
});
 
const TodoSchema = new mongoose.Schema({
  todo: String,
  isComplete: { type: Boolean, default: false },
  username: String,
  date: { type: Date, default: Date.now },
  userId: String,
});

const Users = new mongoose.Schema({
    username: String,
    password: String,
    date: { type: Date, default: Date.now }
})
const Todo = mongoose.model('todo', TodoSchema);
const User = mongoose.model('user', Users);

const newUser = async (username) => {
    let response = await User.insertMany(username)
    try {
        return response;
    } catch(err) {
        return err;
    }
};

const addTodo = async (body) => {
    const response = await Todo.insertMany(body);
    try {
        // console.log(response,  `inside server`);
        return response;
    } catch(err) {
        return err;
    }
};

const editTodo = async (body) => {
    const id = body._id;
    console.log(body.todo, `before update`);
    const todo = await Todo.findByIdAndUpdate(id, {todo: body.todo})
    try {
        const updated = await Todo.findById(id); 
        console.log(updated)
        return updated;
    } catch(err) {
        console.log(err)
        return err;
    }
}; 


module.exports = {
    newUser,
    addTodo,
    editTodo
}

