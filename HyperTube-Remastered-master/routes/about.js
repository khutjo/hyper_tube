let express = require('express');
let router = express.Router();

/* GET champion's About page */
router.get('/:champion', (req, res, next) => {
    try {
        res.render(req.params.champion, { champion : req.params.champion} )
    } catch (error) {
        console.log(error.message)
    }
})

/* GET About main page */
router.get('/', (req, res, next) => {
    res.render('about', {champion : 'Default'})
})

module.exports = router
