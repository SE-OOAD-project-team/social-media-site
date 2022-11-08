import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    displayName: String,
    description: String,
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

const User = mongoose.model('User', UserSchema);

export default User;
