const express = require('express');
const router = express.Router();

const jobsModel = require('../models/jobsModel');

router.get('/', async function(req, res, next) {
    // TODO: user Interface logic goes here
    const jobs = await jobsModel.getAll();
    res.render('userInterface/headers', {title:'userInterface', jobs});
});
module.exports = router;