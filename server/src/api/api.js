import express from 'express';

import { login, signup, verify_token } from './auth.js';

const router = express.Router();

router.use(express.json());

router.post('/login', login);
router.post('/signup', signup);

router.get('/xyz', verify_token, (req, res) => {
    console.log({username: res.locals.username});
    res.send({ status: 'Success', data: 'Valid Token' });
});

router.get('/user/:username', (req, res) => {
    res.send({
        username: req.params.username,
        name: 'Abc Def',
        description: 'hello world',
    });
});

export default router;
