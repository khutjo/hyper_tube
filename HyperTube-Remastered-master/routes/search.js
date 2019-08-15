let router = require('express').Router()

router.get('/', (req, res, next) => {
    res.render('search', { movies : "an movie" } )
});

router.post('/', (req, res, next) => {

});

module.exports = router;