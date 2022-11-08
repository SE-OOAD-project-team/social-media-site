import express from 'express';
import morgan from 'morgan';

import { login, signup, verify_token, login_required, edit_password } from './auth.js';
import posts_router from '../Routes/posts.js';
import { get_profile, update_profile, follow, unfollow } from './profile.js';

const router = express.Router();

router.use(express.json());
router.use(verify_token);
router.use(morgan('dev'));

router.post('/login', login);
router.post('/signup', signup);
router.post('/edit_password', login_required, edit_password);

router.use('/post', posts_router);

router.get('/profile/:username', get_profile);
router.post('/profile', login_required, update_profile);
router.post('/follow', login_required, follow);
router.post('/unfollow', login_required, unfollow);

// Routes for testing, will be removed later
router.get('/xyz', login_required, (req, res) => {
    console.log('Token:', res.locals.token_data);
    res.send({ status: 'Success', data: 'Login required, Valid Token' });
});

router.get('/abc', (req, res) => {
    console.log('Token:', res.locals.token_data);
    res.send({ status: 'Success', data: 'Login optional' });
});

export default router;
