const express = require('express');
const request = require('supertest');
const api_router = require('./api.js').default;

const app = express();
app.use('/api', api_router);
process.env.TOKEN_KEY = 'secret';

describe('test api/login', () => {
    test('Responds with success if credentials are correct', async () => {
        const res = await request(app)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({ username: 'abc', password: 'abcdef' });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('Success');
        expect(res.body.token).toBeDefined();
    });

    test('Responds with failure if credentials are incorrect', async () => {
        const res = await request(app)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({ username: 'abc', password: 'abc' });

        expect(res.statusCode).toBe(401);
        expect(res.body.status).toBe('Failed');
        expect(res.body.token).toBeUndefined();
    });
});

describe('test api/signup', () => {
    test('Creates new user', async () => {
        const res = await request(app)
            .post('/api/signup')
            .set('Content-Type', 'application/json')
            .send({ username: 'user1', password: 'user1' });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('Success');
    });

    test('Users cannot have same username', async () => {
        const res1 = await request(app)
            .post('/api/signup')
            .set('Content-Type', 'application/json')
            .send({ username: 'user2', password: '12345' });

        const res2 = await request(app)
            .post('/api/signup')
            .set('Content-Type', 'application/json')
            .send({ username: 'user2', password: '12345' });

        expect(res2.statusCode).toBe(400);
        expect(res2.body.status).toBe('Failed');
    });
});

describe('test if server responds to api/abc', () => {
    test('Responds with success', async () => {
        const res = await request(app).get('/api/abc');

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('Success');
    });
});

describe('test if server validates token at api/xyz', () => {
    let token = '';

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({ username: 'abc', password: 'abcdef' });

        token = res.body.token;
    });

    test('Responds with success when login token is sent', async () => {
        const res = await request(app)
            .get('/api/xyz')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('Success');
    });

    test('Responds with failure when login token is not sent', async () => {
        const res = await request(app).get('/api/xyz');

        expect(res.statusCode).toBe(401);
        expect(res.body.status).toBe('Failed');
    });
});
