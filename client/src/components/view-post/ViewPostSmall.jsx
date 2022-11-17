import React from 'react';
import { useState, useEffect } from 'react';
import './ViewPostSmall.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

function ViewPostSmall({ post_id, seed, setViewFullPost }) {
    const [post, setPost] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:8000/api/post/get/${post_id}`);
            const json = await res.json();

            setPost(json);
        })();
    }, []);

    const postClicked = () => {
        setViewFullPost(true);
    };
    return (
        <div className="vp-small-container" onClick={postClicked}>
            <img
                className="vp-small-img"
                src={`http://localhost:8000/image/${post.pic}`}
            />
            <div className="vp-small-info-container">
                <div className="vp-small-profile-container">
                    <img
                        className="vp-small-profile-pic"
                        src="https://picsum.photos/30/30?random=2"
                    />
                    <p>{post.user_details && post.user_details.name}</p>
                </div>
                <div className="vp-small-interactions-container">
                    <div className="vp-small-like-container">
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="fa-icon-heart"
                        />
                        <p>{post.likes_count}</p>
                    </div>
                    <div className="vp-small-comment-container">
                        <FontAwesomeIcon
                            icon={faComment}
                            className="fa-icon-comment"
                        />
                        <p>{post.comments_count}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPostSmall;
