import React, { useState } from 'react';
import './HomeFeed.css';
import ViewPostSmall from '../view-post/ViewPostSmall';
import ViewPost from '../view-post/ViewPost';
import Header from '../header/Header';
import CreatePost from '../create-post/CreatePost';

import { Navigate } from 'react-router-dom';

function HomeFeed() {
    if (localStorage.getItem('username') == null) {
        return <Navigate to="/login" />;
    }

    const [viewFullPost, setViewFullPost] = useState(false);
    const [createPost, setCreatePost] = useState(false);

    const [posts, setPosts] = useState([]);

    return (
        <>
            <Header title="Social Media Site" setCreatePost={setCreatePost} />
            <div id="home-feed-container">
                <div id="home-feed-post-container">
                    <ViewPostSmall seed={1} setViewFullPost={setViewFullPost} />
                    <ViewPostSmall seed={2} setViewFullPost={setViewFullPost} />
                    <ViewPostSmall seed={3} setViewFullPost={setViewFullPost} />
                    <ViewPostSmall seed={4} setViewFullPost={setViewFullPost} />
                    <ViewPostSmall seed={5} setViewFullPost={setViewFullPost} />
                    <ViewPostSmall seed={6} setViewFullPost={setViewFullPost} />
                    <ViewPostSmall seed={7} setViewFullPost={setViewFullPost} />
                    <ViewPostSmall seed={8} setViewFullPost={setViewFullPost} />
                </div>
                {/* Replace the one below with show more insted of home feed loader */}
                <div className="home-feed-loader"></div>
                {viewFullPost && (
                    <div id="home-feed-vp-full-container">
                        <ViewPost setViewFullPost={setViewFullPost} />
                    </div>
                )}

                {createPost && (
                    <div id="home-feed-vp-full-container">
                        <CreatePost setCreatePost={setCreatePost} />
                    </div>
                )}
            </div>
        </>
    );
}

export default HomeFeed;
