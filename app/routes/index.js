const express = require('express');
const router = express.Router();

/* GET home page. */
/* router.get('/', function(req, res, next) {
    res.render('index', {title:'OG-YOGA', error: ""});
}); */

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', {title: 'Login'});
});

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', {title: 'Dashboard'});
});

router.post('/login', async function(req, res, next) {
    if(req.body.secret_key !== process.env.TOKEN_SECRET){
        const error = "wrong secret key";
        res.render('login', {title: 'Login', data: error});
    }else{
        const token = await generateToken({secret_key: req.body.secret_key, error: ""});
        req.cookie('token', token);
        res.json({ token });
    }
});

module.exports = router;
