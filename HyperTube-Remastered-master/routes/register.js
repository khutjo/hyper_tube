let express = require('express')
let router = express.Router()

router.get('/', (req, res, next) => {
    res.render('register', { title : 'Register'} )
});

module.exports = router;