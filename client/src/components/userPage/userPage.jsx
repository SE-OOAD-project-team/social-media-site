import React from 'react';
import { useState, useEffect } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';

import './userPage.css';
import '../home-feed/HomeFeed.css';
import accountImage from '../../assets/account.svg';

import { server_uri } from '../../index.js';
import {
    join_path,
    get_profile,
    follow_user,
    unfollow_user,
} from '../../api/api.js';

import Header from '../header/Header';
import ViewPostSmall from '../view-post/ViewPostSmall';
import ViewPost from '../view-post/ViewPost';
import CreatePost from '../create-post/CreatePost';

const UserPage = () => {
    const navigate = useNavigate();
    const { username } = useParams();

    const [profile, setProfile] = useState({});

    const [viewFullPostId, setViewFullPostId ] = useState(null);
    const [viewFullPost, setViewFullPost] = useState(false);
    const [createPost, setCreatePost] = useState(false);

    const current_username = window.localStorage.getItem('username');

    let following = false;
    if (
        profile != null &&
        current_username != null &&
        username !== current_username
    ) {
        if (
            profile.followers instanceof Array &&
            profile.followers.find((elem) => elem === current_username)
        ) {
            following = true;
        }
    }

    const toggleFollowing = () => {
        try {
            following ? unfollow_user(username) : follow_user(username);
            setProfile({
                ...profile,
                followers: following
                    ? profile.followers.filter(
                          (elem) => elem !== current_username
                      )
                    : [...profile.followers, current_username],
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const fetched_profile = await get_profile(username);
                setProfile(fetched_profile);
            } catch (err) {
                navigate('/notfound', { replace: true });
            }
        })();
    }, [username]);

    return (
        <>
            <Header title="Social Media Site" style={{ gridArea: 'a' }}  setCreatePost={setCreatePost}/>

            <div className="Profile">
                <div className="alignProfile">
                    <img
                        className="userPic"
                        src={
                            profile.picture
                                ? join_path(
                                      server_uri,
                                      '/image',
                                      profile.picture
                                  )
                                : accountImage
                        }
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

                    {window.localStorage.getItem('username') != null ? (
                        username === window.localStorage.getItem('username') ? (
                            <Link to="/settings">
                                <button className="editProfile">
                                    Edit Profile
                                </button>
                            </Link>
                        ) : (
                            <button
                                className="editProfile"
                                onClick={toggleFollowing}
                            >
                                {following ? 'Unfollow' : 'Follow'}
                            </button>
                        )
                    ) : (
                        ''
                    )}
                </div>
            </div>

            <div className="divider1"></div>

            <div className="posts">
                <h1 className="postTitle">Posts</h1>
                <div id="home-feed-post-container">
                    {profile.posts && profile.posts.map((post_id) => (
                        <ViewPostSmall
                            post_id={post_id}
                            setViewFullPostId={setViewFullPostId}
                            setViewFullPost={setViewFullPost}
                        />
                    ))}
                </div>
            </div>

            {viewFullPost && (
                <div id="home-feed-vp-full-container">
                    <ViewPost setViewFullPost={setViewFullPost} viewFullPostId={viewFullPostId} />
                </div>
            )}

            {createPost && (
                <div id="home-feed-vp-full-container">
                    <CreatePost setCreatePost={setCreatePost} />
                </div>
            )}
        </>
    );
};

export default UserPage;
