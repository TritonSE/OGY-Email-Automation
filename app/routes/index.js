const express = require('express');
const router = express.Router();
const tokenUtil = require('../auth/tokenUtil');

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', {title: 'Login'});
});

router.post('/login', async function(req, res, next) {
    if(req.body.secret_key !== process.env.TOKEN_SECRET){
        const error = "wrong secret key";
        res.render('login', {title: 'Login', data: error});
    }else{
        const token = await tokenUtil.generateToken({secret_key: req.body.secret_key});
        req.cookie('token', token, {expiresIn:'3hr'});
        res.redirect('/userInterface');
    }
});

module.exports = router;
