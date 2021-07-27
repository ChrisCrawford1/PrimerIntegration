require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/create', async (req, res) => {
    const paymentUrl = process.env.SANDBOX_API + "/payments";

    const config = {
        headers: { "X-API-KEY": process.env.PRIMER_API_KEY}
    };

    const payload = {
        amount: req.body.amount,
        currencyCode: req.body.currencyCode,
        orderId: req.body.orderId,
        paymentInstrument: {
            token: req.body.token
        },
        statementDescriptor: req.body.statement
    }

    axios.post(paymentUrl, payload, config)
    .then((response) => {
        res.send(response.data);
    }).catch(error => {
        console.log('Error ' + JSON.stringify(error.response.data));
        res.send(error);
    })
});


module.exports = router;