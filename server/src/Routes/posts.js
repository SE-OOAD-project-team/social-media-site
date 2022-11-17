import PostInteraction from '../controllers/posts.js';
import express from 'express';
const router = express.Router();

import PostSchema from '../models/posts.js';
import User from '../models/user.js';

import { login_required } from '../api/auth.js';
import multer_upload from '../lib/multer_upload.js';
// const multer_upload = multer({ dest: 'post-pics/' })

router.get('/get/:post_id', async (req, res, next) => {
    if (req.params.post_id != null) {
        const post = await PostSchema.findOne({ _id: req.params.post_id });

        if (post != null) {
            res.send(post);
        } else {
            next(new Error('Invalid post id'));
        }
    } else {
        next(new Error('Invalid post id'));
    }

});

//routing the path
router.post(
    '/create',
    login_required,
    multer_upload.single('photo'),
    async (req, res) => {
        console.log('Here!!');
        if (!req.file) {
            res.send('File not found.');
            return;
        }
        console.log(req.file);

        const user = await User.findOne({
            username: res.locals.token_data.username,
        });

        const posts1 = {
            user_details: {
                displayName: user.displayName,
                name: user.username,
                profile_pic: user.picture,
            },
            desc: req.body.desc,
            pic: req.file.filename,
            comments: [],
            likes_count: 0,
            comments_count: 0,
        };
        console.log(posts1);

        const Interaction = new PostSchema(posts1); //convert the request body into schema

        try {
            const newInteraction = await Interaction.save(); //save the schema in mongodb
            user.posts.push(Interaction._id);
            await user.save();
            res.status.json(newInteraction);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }
);

export default router;
