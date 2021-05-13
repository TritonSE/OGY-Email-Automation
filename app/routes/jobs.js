const express = require('express');
const router = express.Router();
const jobsModel = require('../models/jobsModel');

router.post('/:id', async function(req, res){
    await jobsModel.updateById(req.params.id, req.body);
    res.redirect('/userInterface');
});

module.exports = router;
