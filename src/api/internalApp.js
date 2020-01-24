const bodyParser = require('body-parser');
const express = require('express');
const state = require('./state');

const internalApp = express();
// parse request body
internalApp.use(bodyParser.json());
internalApp.use(bodyParser.urlencoded({ extended: true }));
internalApp.post('/api/update', async (req, res) => {

    console.log('in update:', req.body);
    state.appData = req.body;
    console.log('appData in update = ', state.appData);

    res.send(req.body);
});

module.exports = internalApp;
