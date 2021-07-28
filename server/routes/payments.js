require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/create', async (req, res) => {
    const paymentUrl = process.env.SANDBOX_API + "/payments";

    const config = {
        headers: { "X-API-KEY": process.env.PRIMER_API_KEY }
    };

    const payload = {
        amount: req.body.amount,
        currencyCode: req.body.currencyCode,
        orderId: req.body.orderId,
        paymentInstrument: {
            token: req.body.token
        },
        statementDescriptor: req.body.statement
    };

    try {
        let response = await axios.post(paymentUrl, payload, config);
        res.send(response.data);
    } catch (error) {
        res.send(error);
    }
});

router.post('/capture', async (req, res) => {
    const paymentId = req.body.id;
    const captureUrl = process.env.SANDBOX_API + `/payments/${paymentId}/capture`;

    const config = {
        headers: { "X-API-KEY": process.env.PRIMER_API_KEY }
    };

    const payload = {
        amount: req.body.amount
    };

    try {
        let response = await axios.post(captureUrl, payload, config);
        res.send(response.data);
    } catch (error) {
        res.send(error);
    }
    
});


module.exports = router;