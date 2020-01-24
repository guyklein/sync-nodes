require('dotenv').config();
const createNodeApp = require('./app');

createNodeApp({
    port: process.env.SERVER_1_PORT,
    url: process.env.SERVER_1_ADDRESS,
    wsPort: process.env.WSS_1_PORT,
});

createNodeApp({
    port: process.env.SERVER_2_PORT,
    url: process.env.SERVER_2_ADDRESS,
    wsPort: process.env.WSS_2_PORT,
});

