require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/create', async (req, res) => {
    const paymentUrl = process.env.SANDBOX_API + "/payments";

    const config = {
        headers: { "X-API-KEY": process.env.PRIMER_API_KEY}
    };

    // const paymentInstrumentToken = req.body.token;

    const testToken = 'h0a4WNxfQT6UuWwan5_CY3wxNjI3MzczNjkw';
    const payload = {
        amount: 2000,
        currencyCode: "GBP",
        orderId: "Order 2",
        paymentInstrument: {
            token: testToken,
        },
        statementDescriptor: "Test Purchase 2"
    }

    axios.post(paymentUrl, payload, config)
    .then((response) => {
        res.send(response.data);
    }).catch(error => {
        console.log('Error ' + JSON.stringify(error.response.data));
        res.send(error);
    })
});

router.post('/check', async (req, res) => {
    console.log(req.body);
})


module.exports = router;