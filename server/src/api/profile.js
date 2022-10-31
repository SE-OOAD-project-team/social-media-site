import User from '../models/user.js';

const get_profile = async (req, res) => {
    const user = await User.findOne({ username: req.params.username });

    if (user != null) {
        console.log(`Get api/profile/${req.params.username}`);
        res.send({ username: user.username, displayName: user.displayName, description: user.description });
    } else {
        res.status(404).send({ status: 'Failed' });
    }
};

const update_profile = async (req, res) => {
    if (req.params.username !== res.locals.token_data.username) {
        res.status(401).send({ status: 'Failed', reason: 'Invalid token' });
    } else {
        const user = await User.findOne({ username: req.params.username });

        const updates = Object.assign({}, req.body.displayName ? { displayName: req.body.displayName } : null, req.body.description ? { description: req.body.description } : null);
        console.log('Update', req.params.username, updates);

        await user.updateOne(updates);

        res.send({ status: 'Success' });
    }
}

export { get_profile, update_profile };
