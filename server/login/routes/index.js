// routes/index.js
// const docs = require('../../../client/dist')
var express = require('express');
var router = express.Router();
const { getUser, newUser } = require('../../database/db');
/* GET home page. */
router.get('/', async (req, res, next) => {
  if (req.user) {
    // send user to db to get
    let { displayName, nickname } = req.user;
    let user = await getUser(displayName, nickname);
    try {
      // return user;
    } catch (err) {
      // return err;
    }
    res.render('todos', { title: 'Todos Page' });
  } else {
    res.render('index', {title: 'Login'});
  }
  // res.render('index1', { title: 'Auth0 Webapp sample Nodejs' });
});

router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

module.exports = router;