/**
 * @jest-environment node
 */

const createNodeApp = require('./app');

let request1, request2;
let app1, app2;
let response;

app1 = createNodeApp({
    port: process.env.SERVER_1_PORT,
    url: process.env.SERVER_1_ADDRESS,
    wsPort: process.env.WSS_1_PORT,
});

app2 = createNodeApp({
    port: process.env.SERVER_2_PORT,
    url: process.env.SERVER_2_ADDRESS,
    wsPort: process.env.WSS_2_PORT,
});

request1 = require('supertest')(app1.app);
request2 = require('supertest')(app2.app);

const initialResponseData = {
    host: 'localhost:4000',
    // date: (new Date(Date.now())).toUTCString(),
    data: null,
};

const postData = {
    someText: 'Hello World!'
};

describe('Sync two NodsJS servers', () => {
    // beforeEach(async done => {
    //     // app1 = createNodeApp({
    //     //     port: process.env.SERVER_1_PORT,
    //     //     url: process.env.SERVER_1_ADDRESS,
    //     //     wsPort: process.env.WSS_1_PORT,
    //     //     wsUrl: process.env.WSS_1_ADDRESS,
    //     //     postHandler: handler,
    //     // }).app;
    //     //
    //     // app2 = createNodeApp({
    //     //     port: process.env.SERVER_2_PORT,
    //     //     url: process.env.SERVER_2_ADDRESS,
    //     //     wsPort: process.env.WSS_2_PORT,
    //     //     wsUrl: process.env.WSS_2_ADDRESS,
    //     //     postHandler: handler,
    //     // }).app;
    //
    //     // request1 = require('supertest')(app1);
    //     // request2 = require('supertest')(app2);
    //
    //     response = null;
    //     done();
    // });

    // beforeAll(async done => {
    //     // app1 = createNodeApp({
    //     //     port: process.env.SERVER_1_PORT,
    //     //     url: process.env.SERVER_1_ADDRESS,
    //     //     wsPort: process.env.WSS_1_PORT,
    //     //     wsUrl: process.env.WSS_1_ADDRESS,
    //     //     postHandler: handler,
    //     // });
    //     //
    //     // app2 = createNodeApp({
    //     //     port: process.env.SERVER_2_PORT,
    //     //     url: process.env.SERVER_2_ADDRESS,
    //     //     wsPort: process.env.WSS_2_PORT,
    //     //     wsUrl: process.env.WSS_2_ADDRESS,
    //     //     postHandler: handler,
    //     // });
    //     //
    //     // request1 = require('supertest')(app1.app);
    //     // request2 = require('supertest')(app2.app);
    // });

    // afterAll((done) => {
    //     //close the connections?
    //     // app1.app.close(done);
    //     // app2.app.close(done);
    //     done();
    // });

    test('Update first server and see it is updated', async () => {

        // Get the initial data from server1 -> sanity
        response = await request1.get('/api/resource');
        expect(response.body).toEqual(initialResponseData);

        // Send a post message with data to server1
        response = await request1.post('/api/resource')
            .send(postData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(postData);

        // Send a get command to server1 (Send a get command)
        response = await request1.get('/api/resource');

        // Expect to see the updated data
        expect(response.body.data).toEqual(postData);
    });

    test('Update second server and see it is updated', async () => {

        // Get the initial data from server2 -> sanity
        // response = await request2.get('/api/resource');
        // expect(response.body).toEqual(initialResponseData);

        // Send a post message with data to server2
        response = await request2.post('/api/resource')
            .send(postData)
            .set('Accept', 'application/json');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(postData);

        // Send a get command to server2 (Send a get command)
        response = await request2.get('/api/resource');

        // Expect to see the updated data
        expect(response.body.data).toEqual(postData);
    });

    test('Update first server and see the second is updated', async () => {

        // Get the initial data from server2 -> sanity
        // response = await request2.get('/api/resource');
        // expect(response.body).toEqual(initialResponseData);

        // Send a post message with data to server1
        response = await request1.post('/api/resource')
            .send(postData)
            .set('Accept', 'application/json');

        // Send a get command to server2 (Send a get command)
        response = await request2.get('/api/resource');

        // Expect to see the updated data
        expect(response.body.data).toEqual(postData);
    });

    test('Update second server and see the first is updated', async () => {
        // Get the initial data from server1 -> sanity
        // response = await request1.get('/api/resource');
        // expect(response.body).toEqual(initialResponseData);

        // Send a post message with data to server2
        response = await request2.post('/api/resource')
            .send(postData)
            .set('Accept', 'application/json');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(postData);

        // Send a get command to server1 (Send a get command)
        response = await request1.get('/api/resource');

        // Expect to see the updated data
        expect(response.body.data).toEqual(postData);
    });
});
