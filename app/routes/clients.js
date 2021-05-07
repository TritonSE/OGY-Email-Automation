const express = require('express');
const router = express.Router();
const clientsModel = require('../models/clientsModel');

router.put('/toggle_notif/:id', async function(req, res){
    try {
        await clientsModel.toggleIsRecipient(req.params.id);
        const client = await clientsModel.getClientById(req.params.id);
        return res.status(200).json({is_recipient : client.is_recipient});
    } catch(err) {
        return res.status(400);
    }
});

module.exports = router;
