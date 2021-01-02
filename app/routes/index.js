const express = require('express');
const router = express.Router();

import generateToken from '../middleware/generateToken.js';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title:'OG-YOGA', error: ""});
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

async function getTokenInfo(req, res, next) {
    const authHeader = req.headers['authorization']
    return authHeader && authHeader.split(' ')[1];
}

module.exports = router;
