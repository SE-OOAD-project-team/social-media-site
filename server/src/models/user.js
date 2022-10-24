import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: String,
    passwordHash: String,
    passwordSalt: String,
});

const User = mongoose.model('User', UserSchema);

export default User;
