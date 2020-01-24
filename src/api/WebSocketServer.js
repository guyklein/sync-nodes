const WebSocket = require('ws');

const setupWebSocketServer = options => {
    // console.log(options);
    // const wss = new WebSocket.Server({port: options.port});
    const wss = new WebSocket.Server({
        port: options.port
        // port: process.env.WSS_1_PORT
    });

    wss.on('connection', async (ws, req) => {
        // const ip = req.connection.remoteAddress;
        // console.log(ws.url);
        const {
            address,
            port
        } = wss.address();
        // console.log(req.connection);
        // console.log(port);
        // console.log(ip);
        console.log('WebSocket connection opened on %s:%s', address, port);

        ws.on('message', options.onmessage);

        ws.on('error', function (err) {
            console.log(err);
        });
    });

    // console.log(wss.address());

    return wss;
};

module.exports = setupWebSocketServer;
