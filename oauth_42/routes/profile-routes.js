const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
    res.redirect('/auth/login');
    }else{
        console.log("your good");
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', {
        user: req.user.username,
        picture: req.user.thumbnail
    }); 
})

module.exports = router;