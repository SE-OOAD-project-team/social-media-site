import React from 'react';
import { useState, useEffect } from 'react';

import { get_profile, follow_user, unfollow_user } from '../../api/api.js';

import style from './Settings.module.css';

const Followed = ({ username }) => {
    const [isFollowing, setIsFollowing] = useState(true);

    const toggleIsFollowing = () => {
        try {
            isFollowing ? unfollow_user(username) : follow_user(username);
            setIsFollowing(!isFollowing);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={style.Followed}>
            <div>{username}</div>
            <button onClick={toggleIsFollowing} style={{fontSize: 'small'}} className={style.Button}>
                {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
};

const FollowingSettings = ({ username }) => {
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const profile = await get_profile(username);
                setFollowing(profile.following);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <div className={style.TabComponent}>
            <h2 className={style.H2}>Following</h2>
            {following.map((elem) => (
                <Followed username={elem} key={elem} />
            ))}
        </div>
    );
};

export default FollowingSettings;
