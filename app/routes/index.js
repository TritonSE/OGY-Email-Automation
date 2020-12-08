require('dotenv').config();
const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

dotenv.config();

process.env.TOKEN_SECRET;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title:'OG-YOGA'});
});

router.post('/login', function(req, res, next) {
    const token = await generateToken({username: req.body.username});
    res.json(token);
    localStorage.setItem('token', token);

});

//idk where to put this rn so I'll hold it here
function generateToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s'});
}

function getTokenInfo(req, res, next) {
    const authHeader = req.headers['authorization']
    return authHeader && authHeader.split(' ')[1];
}

module.exports = router;
