import React from 'react';
import { useState, useEffect } from 'react';
import './ViewPostSmall.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { join_path } from '../../api/api';
import { server_uri, server_v2_uri } from '../..';

function ViewPostSmall({ post_id, seed, setViewFullPost, setViewFullPostId }) {
    const [post, setPost] = useState(null);
    const [ postLiked, setPostLiked ] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(join_path(server_v2_uri, `/api/v2/post/get/${post_id}`));
            const json = await res.json();

            setPost(json);
            
        })();
    }, [postLiked]);

    const postClicked = () => {
        setViewFullPost(true);
        setViewFullPostId(post_id);
    };

    const likePost = async(e) => {
        if(postLiked === false){
            console.log("clicked like post")
            const username = localStorage.getItem("username");
            const obj = {
                username: username,
                post_id: post_id,
            };
            const url = join_path(server_v2_uri, `/api/v2/post/inc-like`)
            try{
                const ret = await axios.post(url, obj);
                if(ret.data.status === "Success")
                    setPostLiked(true);
                else
                    console.error("Error: Liking a post - not working");
            }
            catch(err){
                console.log(err);
            }
            // .then(res => {console.log(res)})
            // .catch(err => { console.log(err)})

            
        }
        setViewFullPost(false);
        e.preventDefault();
    }

    return (
        post && (<div className="vp-small-container" onClick={postClicked} onDoubleClick={likePost}>
            <img
                className="vp-small-img"
                src={join_path(server_v2_uri, `api/v2/image/${post.pic}`)}
            />
            <div className="vp-small-info-container">
                <div className="vp-small-profile-container">
                    <img
                        className="vp-small-profile-pic"
                        // src={`http://localhost:8000/image/${post.user_details.profile_pic}`}
                        src={"https://picsum.photos/300/450"}
                    />
                    <p>{post.username}</p>
                </div>
                <div className="vp-small-interactions-container">
                    <div className="vp-small-like-container">
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={postLiked ? "fa-icon-heart-liked" : "fa-icon-heart"}
                            onClick={likePost}
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
        </div>)
    );
}

export default ViewPostSmall;
