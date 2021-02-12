const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
    // TODO: user Interface logic goes here
    res.render('userInterface/index', {title:'userInterface'});
});

module.exports = router;
