import React from 'react';
import { useState, useEffect } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';

import './userPage.css';
import accountImage from '../../assets/account.svg';

import { get_profile } from '../../api/api.js';

const UserPage = () => {
    const navigate = useNavigate();
    const { username } = useParams();

    const [profile, setProfile] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const profile = await get_profile(username);
                setProfile(profile);
            } catch (err) {
                navigate('/notfound');
            }
        })();
    }, []);

    return (
        <>
            <div className="AppName">
                <h1>App Name</h1>
            </div>

            <div className="Profile">
                <div className="alignProfile">
                    <img
                        className="userPic"
                        src="https://www.whatsappimages.in/wp-content/uploads/2021/07/Top-HD-sad-quotes-for-whatsapp-status-in-hindi-Pics-Images-Download-Free.gif"
                        alt="user profile pic loading"
                    />

                    <h1>{profile.displayName}</h1>
                    <h4 className="userName">{profile.username}</h4>

                    <div>{profile.description}</div>

                    <div className="userDetM">
                        {' '}
                        <div className="userDet">
                            <h4>
                                {profile.following
                                    ? profile.following.length
                                    : 0}
                            </h4>{' '}
                            <p> following</p>
                        </div>{' '}
                        <div className="userDet">
                            <h4>
                                {profile.followers
                                    ? profile.followers.length
                                    : 0}
                            </h4>{' '}
                            <p> followers</p>
                        </div>{' '}
                        <div className="userDet">
                            <h4>{profile.posts ? profile.posts.length : 0}</h4>{' '}
                            <p> Posts</p>
                        </div>
                    </div>

                    {username === window.localStorage.getItem('username') ? (
                        <Link to="/settings">
                            <button className="editProfile">
                                Edit Profile
                            </button>
                        </Link>
                    ) : (
                        ''
                    )}
                </div>
            </div>

            <div className="divider1"></div>

            <div className="posts">
                <h1 className="postTitle">Your Posts</h1>
            </div>
        </>
    );
};

export default UserPage;
