import PostInteraction from '../controllers/posts.js';
import express from 'express';
const router = express.Router();

//routing the path
router.post('/', PostInteraction);

export default router;
