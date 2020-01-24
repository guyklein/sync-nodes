const bodyParser = require('body-parser');
const express  = require('express');
const handler = require('./handler');
const setupWebSocketServer = require('./WebSocketServer');

const createNodeApp = options => {

    const app = express();

    const url = options.url || 'localhost';

    let appData = {
        host: `${url}:${options.port}`,
        // date: (new Date(Date.now())).toUTCString(),
        data: null,
    };

    const onMessage = (message) => {
        // console.log('Message received on Websocket (%s): %s', port, message);
        const res = JSON.parse(message);
        appData=res;
    };

    // parse request body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/resource', async (req, res) => {
        // here I need to get most updated "data"
        res.send(appData);
    });

    app.post('/api/resource', handler);

    // const wsPort = options.wsPort;
        // options.wsPort ? options.wsPort : options.port+2;

    const wss = //options.wss ? options.wss :
        setupWebSocketServer({
        port: options.wsPort,
        onmessage: onMessage,
    });

    app.listen(options.port, () => console.log(`Example backend API listening on port ${options.port}!`));

    return {
        app: app,
        // appData: appData,
        // onMessage: onMessage,
        // wss: wss,
    }
};

module.exports = createNodeApp;
