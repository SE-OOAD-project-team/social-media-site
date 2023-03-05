import mongoose from 'mongoose';

//schema for the database
const PostSchema = new mongoose.Schema(
	{
		username: {
			type: String,
		},

		desc: {
			type: String,
		},

		pic: {
			type: String,
		},

		comments: [
			{
				username: {
					type: String,
				},
				comment: {
					type: String,
				},
			},
		],

		likes_count: {
			type: Number,
		},

		comments_count: {
			type: Number,
		},
	}
);

export default mongoose.model('posts', PostSchema);
