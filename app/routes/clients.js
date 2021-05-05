const express = require('express');
const router = express.Router();
const clientsModel = require('../models/clientsModel');

router.put('/toggle_notif/:id', async function(req, res){
    try {
        updated_notif_status = await clientsModel.toggleClientNotification(req.params.id);
        return res.status(200).json({is_recipient : updated_notif_status});
    } catch(err) {
        return res.status(400);
    }
});

module.exports = router;
