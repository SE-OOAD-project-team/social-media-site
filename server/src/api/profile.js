import User from '../models/user.js';

const get_profile = async (req, res) => {
    const user = await User.findOne({ username: req.params.username });

    if (user != null) {
        console.log(`Get api/profile/${req.params.username}`);
        res.send({
            username: user.username,
            displayName: user.displayName,
            description: user.description,
            followers: user.followers,
            following: user.following,
            posts: user.posts,
        });
    } else {
        res.status(404).send({ status: 'Failed' });
    }
};

const update_profile = async (req, res) => {
    const user = await User.findOne({
        username: res.locals.token_data.username,
    });

    const updates = Object.assign(
        {},
        req.body.displayName ? { displayName: req.body.displayName } : null,
        req.body.description ? { description: req.body.description } : null
    );
    console.log('Update', res.locals.token_data.username, updates);

    await user.updateOne(updates);

    res.send({ status: 'Success' });
};

export { get_profile, update_profile };
