require('dotenv').config();
const WebSocket = require('ws');

const connection1 = new WebSocket(`ws://${process.env.SERVER_1_ADDRESS}:${process.env.WSS_1_PORT}`);
const connection2 = new WebSocket(`ws://${process.env.SERVER_2_ADDRESS}:${process.env.WSS_2_PORT}`);

const handler = async (req, res) => {

    const messageDataStr = JSON.stringify({
        host: `${req.headers.host}`,
        // date: (new Date(Date.now())).toUTCString(),
        data: req.body,
    });
    connection1.send(messageDataStr);
    connection2.send(messageDataStr);

    res.send(req.body);
};

module.exports = handler;
