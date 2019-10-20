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
      console.log(user, `user after validation line 13 in index.js`);
      // return user;
    } catch (err) {
      console.log(err, `error in line 15`)
      // return err;
    }
  }
  res.render('index1', { title: 'Auth0 Webapp sample Nodejs' });
  // res.render('index1', { title: 'Auth0 Webapp sample Nodejs' });
});

router.get('/about', function (req, res, next) {
  if (req.user) {
    res.render('layout', { title: 'This works for about' });
  } else {
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
  }
});

module.exports = router;