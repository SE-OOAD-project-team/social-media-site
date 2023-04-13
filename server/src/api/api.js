import express from 'express';

import multer_upload from '../lib/multer_upload.js';

import comments from '../controllers/comments.js';

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
import recom_routes from '../Routes/recom.js';
import likes from '../controllers/likes.js';

const router = express.Router();

router.use(express.json());
router.use(verify_token);

router.post('/login', login);
router.post('/signup', signup);
router.post('/edit_password', login_required, edit_password);

router.get('/search/:string', search);

router.use('/post', posts_router);
router.post(
	'/upload_photo',
	login_required,
	multer_upload.single('photo'),
	async (req, res) => {
		if (!req.file) {
			res.send('File not found.');
			return;
		}
		console.log(req.file);

		res.status(200).json({ filename: req.file.filename });
	}
);
router.use('/getallposts', recom_routes);

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
router.post('/incLike', likes);

router.post('/postComment', comments);
// router.get('/postComment', comments);

// Error handler
router.use((err, req, res, next) => {
	res.status(400).send({ status: 'Failed', reason: err.message });
});

export default router;
