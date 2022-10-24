import mongoose from 'mongoose';

import User from '../models/user.js';

import crypto from 'crypto';

const hashPassword = (password, salt) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('base64');
}

const verify_password = async (username, password) => {
    const user = await User.findOne({ username });
    return user != null && user.passwordHash === hashPassword(password, user.passwordSalt);
};

const create_user = async (username, password) => {
    if ((await User.findOne({ username })) != null) {
        throw new Error('User already exists');
    } else {
        const salt = crypto.randomBytes(512).toString();
        const user = new User({ username, passwordSalt: salt, passwordHash: hashPassword(password, salt) });
        await user.save();
        // console.log(user);
    }
};

export { verify_password, create_user };
