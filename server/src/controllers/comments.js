import postSchema from '../models/posts.js';
import Mongoose from 'mongoose';

const comments = async (req, res) => {
	const body = req.body;
	const post_id = body.post_id;
	const comment = req.body.comment;
	const user = req.body.commented_user_name;
	const obj = {
		username: user,
		comment: comment,
	};

	const post = await postSchema.findOne({ _id: post_id });

    post.comments.push(obj)
    post.comments_count += 1

	// const data = await postSchema.updateOne(
	// 	{ _id: Mongoose.Types.ObjectId(post_id) },
	// 	{ $push: { comments: obj }, $inc: { comments_count: 1 } }
	// );

    const data = await post.save();

    console.log(data);

	res.send(data);
};

export default comments;
