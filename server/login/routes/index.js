// routes/index.js
// const docs = require('../../../client/dist')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index1', { title: 'Auth0 Webapp sample Nodejs' });
});

module.exports = router;