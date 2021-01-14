const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title:'OG-YOGA', error: ""});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('../views/login');
});

router.post('/login', async function(req, res, next) {
    if(req.body.secret_key !== process.env.TOKEN_SECRET){
        const error = "wrong secret key";
        console.log(error);
    }else{
        const token = await generateToken({secret_key: req.body.secret_key, error: ""});
        console.log("right");
        req.cookie('token', token);
        res.json({ token });
    }
});

module.exports = router;
