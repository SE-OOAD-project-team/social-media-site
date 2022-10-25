import express from 'express';

import { login, signup, verify_token, login_required } from './auth.js';
import posts_router from '../Routes/posts.js';

const router = express.Router();

router.use(express.json());
router.use(verify_token);

router.post('/login', login);
router.post('/signup', signup);

router.use('/post', posts_router);

// Routes for testing, will be removed later
router.get('/xyz', login_required, (req, res) => {
    console.log('Token:', res.locals.token_data);
    res.send({ status: 'Success', data: 'Login required, Valid Token' });
});

router.get('/abc', (req, res) => {
    console.log('Token:', res.locals.token_data);
    res.send({ status: 'Success', data: 'Login optional' });
});

router.get('/user/:username', (req, res) => {
    res.send({
        username: req.params.username,
        name: 'Abc Def',
        description: 'hello world',
    });
});

export default router;
