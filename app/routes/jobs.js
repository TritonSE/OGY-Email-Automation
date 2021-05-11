const express = require('express');
const router = express.Router();
const jobsModel = require('../models/jobsModel');

router.post('/:id', async function(req, res){
    await jobsModel.updateById(req.params.id, req.body);
    console.log(req.params.id);
    console.log(req.body);
});

module.exports = router;
