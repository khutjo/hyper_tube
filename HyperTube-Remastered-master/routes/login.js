let router = require('express').Router();
let passport = require('passport');

router.get('/github', passport.authenticate('github', { scope : 'read' }));

router.get('/github', (req, res, next) => {
    res.send("Login using github");
});

router.get('/intra', passport.authenticate('42', { scope : 'public'} ));

router.get('/intra', (req, res, next) => {
    res.send('Login using intra 42');
})

router.get('/', (req, res, next) => {
    res.render('login', { title : 'Login' });
});

router.post('/', (req, res, next) => {
    res.send(req.body);
});

router.get('/WTC', (req, res, next) => {
    res.send('Login using WTC')
});

module.exports = router;