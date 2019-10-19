const express = require("express");
const path = require("path");
var session = require('express-session');
const port = 3000;
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();
// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var userInViews = require('./server/login/lib/middleware/userInViews');
var authRouter = require('./server/login/routes/auth');
var indexRouter = require('./server/login/routes/index');
var usersRouter = require('./server/login/routes/users');
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

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/login'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const app = express();
// View engine setup
app.set('views', path.join(__dirname, '/server/login/views'));
app.set('view engine', 'pug');

app.use(cookieParser());

// config express-session
var sess = {
  secret: 'Cuando regreses al giga ranch',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

// ..


if (app.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}
app.use( express.static(path.join(__dirname, './client/dist')));

// app.use('/images')
app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);
// app.use(express.static('public'))
// var aa = require('./client/dist')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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

module.exports.app = app;
