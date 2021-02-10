const express = require('express');
const router = express.Router();
const jobsModel = require('../models/jobsModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const data = await jobsModel.getAll();
    res.render('userInterface/index', {title:'userInterface', data: data});
});

module.exports = router;
