import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        username: { type: String, required: true, index: { unique: true } },
        passwordHash: { type: String, required: true },
        passwordSalt: { type: String, required: true },
        displayName: String,
        description: String,
        followers: Array,
        following: Array,
        posts: Array
    }
);

const User = mongoose.model('User', UserSchema);

export default User;
