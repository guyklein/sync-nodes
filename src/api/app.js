const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');

const app = express();

const state = require('./state');

// parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/resource', async (req, res) => {
    // here I need to get most updated "data"
    res.send(state.appData);
});

app.post('/api/resource', async (req, res) => {

    const messageData = {
        host: `${req.headers.host}`,
        // date: (new Date(Date.now())).toUTCString(),
        data: req.body,
    };

    console.log('in resource: messageData =', messageData);

    try {
        const url = `${process.env.OTHER_SERVER_ADDRESS}:${process.env.OTHER_SERVER_PORT}/api/update`;
        console.log('sending %s to %s', messageData, url);
        await axios.post(url, messageData);

        state.appData = messageData;
        console.log('appData in resource = ', state.appData);
        res.send(req.body);
    }
    catch(error) {
        console.log(error);
        res.send(500);
    }
});

module.exports = app;
