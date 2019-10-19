// routes/index.js
// const docs = require('../../../client/dist')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index1', { title: 'Auth0 Webapp sample Nodejs' });
  // res.render('index1', { title: 'Auth0 Webapp sample Nodejs' });
});

router.get('/about', function (req, res, next) {
  if (req.user) {
    res.render('layout', {title: 'This works for about'});
  } else {
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
  }
});

module.exports = router;