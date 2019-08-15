let router = require('express').Router();
let cookie  = require('cookie-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.cookie('name', 'Cookie test')
  console.log(document.cookie).send('Cookie set')
});

module.exports = router;
