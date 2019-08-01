const express = require('express');

const router = express.Router();

const db = require('../db');


router.get('/health', async (req, res, next) => {

    res.json({ msg: "Server is up." });
});

router.post('/getActiveDispenses', async (req, res, next) => {

    let responseJson = {};

    try {
        let orders = await db.getActiveOrdersForUser(req.body.userId);
        responseJson.orderId = orders[0].orderId;
        responseJson.partnerName = orders[0].partnerName;
        responseJson.orderStatus = orders[0].orderStatus;
        responseJson.orderStartTime = orders[0].orderStartTime;
        responseJson.orderEndTime = orders[0].orderEndTime;
        responseJson.orderExpirationTime = orders[0].orderExpirationTime;
        let orderId = orders[0].orderId;
        let partnerId = orders[0].partnerId;
        try {
            let bevDetails = await db.getBevDetails(orderId, partnerId);
            console.log(bevDetails);
            responseJson.beverages = bevDetails;
        }
        catch (e) {
            console.log(e);
            res.json({ "msg": "Something went wrong in getting order beverages." })
        }
        res.json(responseJson);
    }
    catch (e) {
        res.json({ msg: "Something went wrong" });
    }


});

module.exports = router;