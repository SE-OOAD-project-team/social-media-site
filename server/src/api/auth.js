import jwt from 'jsonwebtoken';

import { create_user, verify_password } from '../database/auth.js';

/**
 * Middleware to verify user token
 * 
 * Sets res.locals.username if token is valid
 * 
 * Sends response with error if token is not recieved or is invalid
 * @example
 * app.get('/route_where_user_needs_to_be_logged_in', verify_token, () => {...})
 */
const verify_token = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const data = jwt.verify(token, process.env.TOKEN_KEY);

        res.locals.username = data.username;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ status: 'Failed', reason: 'Invalid token' });
    }
};

/**
 * Middleware that verifies username and password
 * 
 * Sends a token if verified
 * 
 * Sends response with error if token is not recieved or is invalid
 */
const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log({ username, password });

    if (verify_password(username, password)) {
        const token = jwt.sign(
            {
                username,
            },
            process.env.TOKEN_KEY,
            { expiresIn: '30d' }
        );
        res.setHeader('Authorization', `Bearer ${token}`);
        res.send({ status: 'Success' });
    } else {
        res.status(401).send({ status: 'Failed' });
    }
};

/**
 * Middleware to create new user
 * 
 * Sends response with confirmation if user created
 * 
 * Sends response with error if user could not be created
 */
const signup = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const result = create_user(username, password);
    if (result.status == 'Success') {
        res.send({ status: 'Success' });
    } else {
        res.status(400).send({
            status: 'Failed',
            reason: 'Could not create user',
        });
    }
}

export { login, signup, verify_token };
