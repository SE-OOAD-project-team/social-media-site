import mongoose from 'mongoose';

import User from '../models/user.js';

import crypto from 'crypto';

/**
 * Hashes the password using sha256
 * @param {string} password
 * @param {base64string} salt
 */
const hash_password = (password, salt) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(Buffer.from(salt, 'base64'));
    return hash.digest('base64');
};

/**
 * Checks password with database
 * @param {string} username
 * @param {string} password
 */
const verify_password = async (username, password) => {
    const user = await User.findOne({ username });
    return (
        user != null &&
        user.passwordHash === hash_password(password, user.passwordSalt)
    );
};

/**
 * Checks if password has atleast 8 characters
 * @param {string} password 
 */
const validate_password = (password) => {
    if (password.length < 8) {
        throw new Error('Password should have atleast 8 characters');
    }
}

/**
 * Creates new user \
 * Throws error if user already exists
 * @param {string} username
 * @param {string} password
 */
const create_user = async (username, password) => {
    validate_password(password);

    if ((await User.findOne({ username })) != null) {
        throw new Error('User already exists');
    } else {
        const salt = crypto.randomBytes(512).toString('base64');
        const user = new User({
            username,
            passwordSalt: salt,
            passwordHash: hash_password(password, salt),
        });
        await user.save();
        // console.log(user);
    }
};

const change_password = async (username, password) => {
    validate_password(password);

    const user = await User.findOne({ username });

    if (user == null) {
        throw new Error('Invalid Username');
    } else {
        const salt = crypto.randomBytes(512).toString('base64');
        user.passwordSalt = salt;
        user.passwordHash = hash_password(password, salt);
        await user.save();
    }
};

export { verify_password, create_user, change_password };
