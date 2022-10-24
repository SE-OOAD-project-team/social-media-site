import mongoose from 'mongoose';

import User from '../models/user.js';

const verify_password = (username, password) => {
    // for (let user of users) {
    //     if (username === user.username) {
    //         return password === user.password;
    //     }
    // }
    return false;
};

const create_user = async (username, password) => {
    if ((await User.findOne({ username })) != null) {
        throw new Error('User already exists');
    } else {
        const user = new User({ username, passwordHash: password });
        await user.save();
    }
};

export { verify_password, create_user };
