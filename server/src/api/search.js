import User from '../models/user.js';

const search = async (req, res) => {
    const string = req.params.string;

    const results = (await User.find({ username: new RegExp(`${string}`) })).map(
        (user) => user.username
    );

    res.send({ status: 'Success', data: results });
};

export { search };
