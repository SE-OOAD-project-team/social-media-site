import mongoose from 'mongoose';

import User from '../models/user.js';

import crypto from 'crypto';

/**
 * Hashes the password using sha256
 * @param {string} password 
 * @param {base64string} salt 
 * @returns {base64string} hash digest
 */
const hashPassword = (password, salt) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(Buffer.from(salt, 'base64'));
    return hash.digest('base64');
}

/**
 * Verifies password
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean} true if password is verifies, false otherwise
 */
const verify_password = async (username, password) => {
    const user = await User.findOne({ username });
    return user != null && user.passwordHash === hashPassword(password, user.passwordSalt);
};

/**
 * Creates new user \
 * Throws error if user already exists
 * @param {string} username 
 * @param {string} password 
 */
const create_user = async (username, password) => {
    if ((await User.findOne({ username })) != null) {
        throw new Error('User already exists');
    } else {
        const salt = crypto.randomBytes(512).toString('base64');
        const user = new User({ username, passwordSalt: salt, passwordHash: hashPassword(password, salt) });
        await user.save();
        // console.log(user);
    }
};

export { verify_password, create_user };
