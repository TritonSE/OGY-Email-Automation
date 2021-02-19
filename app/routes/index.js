const express = require('express');
const router = express.Router();
const tokenUtil = require('../auth/tokenUtil');

/* GET login page. */
router.get('/', function(req, res, next) {
    const errorMessage = "none";
    res.render('login', {title: 'Login', errorMessage});
});

router.post('/login', async function(req, res, next) {
    if(req.body.secret_key !== process.env.LOGIN_SECRET){
        const errorMessage = "Wrong secret key";
        res.render('login', {title: 'Login', errorMessage});
    }else{
        const token = await tokenUtil.generateToken({secret_key: req.body.secret_key});
        res.cookie('token', token, {expiresIn:'3hr'});
        res.redirect('/userInterface');
    }
});

module.exports = router;
