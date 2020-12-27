require('dotenv').config();
const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

dotenv.config();

process.env.TOKEN_SECRET;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title:'OG-YOGA', error: ""});
});

router.post('/login', async function(req, res, next) {
    if(req.body.secret_key !== process.env.TOKEN_SECRET){
        const error = "wrong secret key";
        const token = await generateToken({username: req.body.username, error: error});
        res.cookie('token', token, { httpOnly: true });
        res.json({ token });
    }else{
        const token = await generateToken({username: req.body.username, error: ""});
        res.cookie('token', token, { httpOnly: true });
        res.json({ token });
    }
});

//idk where to put this rn so I'll hold it here
function generateToken(username, error) {
    return jwt.sign({username: username, error: error}, process.env.TOKEN_SECRET, { expiresIn: '1800s'});
}

async function getTokenInfo(req, res, next) {
    const authHeader = req.headers['authorization']
    return authHeader && authHeader.split(' ')[1];
}

module.exports = router;
