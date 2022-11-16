import express from 'express';
import path from 'path';
import multer from 'multer';

import {
    login,
    signup,
    verify_token,
    login_required,
    edit_password,
} from './auth.js';
import {
    get_profile,
    update_profile,
    update_profile_picture,
    follow,
    unfollow,
} from './profile.js';
import { search } from './search.js';

import posts_router from '../Routes/posts.js';
import recom_routes from "../Routes/recom.js"

const multer_upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(process.env.UPLOAD_FOLDER));
        },
        filename: (req, file, cb) => {
            const unique_name =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            let extArray = file.mimetype.split('/');
            let extension = extArray[extArray.length - 1];
            cb(null, unique_name + '.' + extension);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
            return cb(new Error('Only images allowed'));
        }

        cb(null, true);
    },
});

const router = express.Router();

router.use(express.json());
router.use(verify_token);

router.post('/login', login);
router.post('/signup', signup);
router.post('/edit_password', login_required, edit_password);

router.get('/search/:string', search);

router.use("/createPost", posts_router);
router.use("/getpost", recom_routes);

router.get('/profile/:username', get_profile);
router.post('/profile', login_required, update_profile);
router.post(
    '/profile_picture',
    login_required,
    multer_upload.single('profile_picture'),
    update_profile_picture
);
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

// Error handler
router.use((err, req, res, next) => {
    res.status(400).send({ status: 'Failed', reason: err.message, a: 99 });
});

export default router;
