var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:something', (req, res, next) => {
  res.send('Random users response')
})


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
