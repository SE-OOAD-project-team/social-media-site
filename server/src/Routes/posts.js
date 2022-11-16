import { PostInteraction, upload_single } from '../controllers/posts.js';
import express from 'express';
const router = express.Router();
import { login_required } from '../api/auth.js';

//routing the path
router.post('/', login_required, upload_single, PostInteraction);

export default router;
