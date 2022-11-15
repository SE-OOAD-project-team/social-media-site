import User from '../models/user.js';

const search = async (req, res) => {
    const string = req.params.string;

    const results = (await User.find({username: string})).map(user => user.username);

    res.send(results);
};

export { search };
