// import mongoose from 'mongoose';

// Using array instead of database, need to integrate with mongodb later
const users = [{ username: 'abc', password: 'abcdef' }];

const verify_password = (username, password) => {
    for (let user of users) {
        if (username === user.username) {
            return password === user.password;
        }
    }
    return false;
};

const create_user = (username, password) => {
    for (let user of users) {
        if (username === user.username) {
            return { status: 'Failed', reason: 'User already exists' };
        }
    }

    users.push({ username, password });
    return { status: 'Success' };
};

export { verify_password, create_user };
