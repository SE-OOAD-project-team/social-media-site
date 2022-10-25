import User from '../models/user.js';

const get_profile = async (req, res) => {
    const user = await User.findOne({ username: req.params.username });

    if (user != null) {
        res.send({ username: user.username });
    } else {
        res.status(404).send({ status: 'Failed' });
    }
};

export { get_profile };
