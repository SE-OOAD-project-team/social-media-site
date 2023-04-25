import React, { useState, useEffect } from 'react';
import './HomeFeed.css';
import ViewPostSmall from '../view-post/ViewPostSmall';
import ViewPost from '../view-post/ViewPost';
import Header from '../header/Header';
import CreatePost from '../create-post/CreatePost';

import { Navigate } from 'react-router-dom';
import { join_path } from '../../api/api';

import { server_v2_uri } from '../../index.js';

function HomeFeed() {
    if (localStorage.getItem('username') == null) {
        return <Navigate to="/login" />;
    }

    const [viewFullPost, setViewFullPost] = useState(false);
    const [createPost, setCreatePost] = useState(false);
    const [viewFullPostId, setViewFullPostId ] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(join_path(server_v2_uri, 'api/v2', `recommendations?username=${localStorage.getItem('username')}`));
            const json = await res.json();

            setPosts(json);
        })();
    }, []);

    return (
        <>
            <Header title="Social Media Site" setCreatePost={setCreatePost} />
            <div id="home-feed-container">
                <div id="home-feed-post-container">
                    {posts.map((post_id) => (
                        <ViewPostSmall
                            key={post_id}
                            post_id={post_id}
                            setViewFullPost={setViewFullPost}
                            setViewFullPostId={setViewFullPostId}
                        />
                    ))}
                </div>
                {/* Replace the one below with show more insted of home feed loader */}
                {/* <div className="home-feed-loader"></div> */}
                {viewFullPost && viewFullPostId && (
                    <div id="home-feed-vp-full-container">
                        <ViewPost setViewFullPost={setViewFullPost} viewFullPostId={viewFullPostId}/>
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
