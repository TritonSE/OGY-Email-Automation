const express = require('express');
const router = express.Router();

const jobsModel = require('../models/jobsModel');

router.get('/', async function(req, res, next) {
    // TODO: user Interface logic goes here
    const jobs = await jobsModel.getAll();
    res.render('userInterface/index', {title:'OG Yoga Administration Portal', jobs});
});

router.get('/calendar', async function(req, res, next) {
    res.render('userInterface/calendar');
});

router.get('/getCalendar', async function(req, res, next){
    const jobs = await jobsModel.getAll();
    res.send(jobs);
});

router.put('/deleteNotification/:id', async function(req,res){
    try{
        await jobsModel.deleteJob(req.params.id);
        return res.status(200).json({});
    }
    catch(e){
        return res.status(400).json({});
    }
});

module.exports = router;
