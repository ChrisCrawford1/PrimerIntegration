require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/fetch-token', async (req, res) => {
    const tokenUrl = process.env.SANDBOX_API + "/auth/client-token";

    const config = {
        headers: { "X-API-KEY": process.env.PRIMER_API_KEY}
    };
    axios.post(tokenUrl, [], config)
    .then((response) => {
        res.send(response.data)
    }).catch(error => {
        console.log('Error ' + error);
        res.send(error).statusCode(400)
    })
});


module.exports = router;