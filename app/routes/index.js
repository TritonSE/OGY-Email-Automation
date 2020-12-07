require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title:'OG-YOGA'});
});

router.post('/login', function(req, res, next) {
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
