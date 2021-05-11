const express = require('express');
const router = express.Router();
const tokenUtil = require('../auth/tokenUtil');

router.post('/:id', async function(req, res){
    console.log(req.params.id);
    console.log(req.body);
});

module.exports = router;
