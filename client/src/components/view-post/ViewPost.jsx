import React, { useRef, useState, useEffect } from "react";
import "./ViewPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import axios from "axios";
import { join_path } from "../../api/api";
import { server_uri, server_v2_uri } from "../..";

function ViewPost({setViewFullPost, viewFullPostId: postId}) {
    const [post, setPost] = useState(null);
    const [forceReload, setForceReload] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(join_path(server_v2_uri, `api/v2/post/get/${postId}`));
            const json = await res.json();
            // console.log(json)
            setPost(json);
            // console.log(post);
            
        })();
    }, [forceReload]);

    const commentRef = useRef(null);

    const closePost = () => {
        setViewFullPost(false);
    }


    // Function called on clicking the post comment button
    const addComment = async () => {
        const comment = commentRef.current.value;
        const curr_user = localStorage.getItem("username");
        const comment_data = {
            post_id: postId,
            username: curr_user,
            comment: comment,
        }
        // console.log(comment_data);
        try{
            // await axios.post("http://localhost:8000/api/postComment", comment_data)
            await axios.post(join_path(server_v2_uri, "api/v2", "post/comments/add", postId), comment_data);
            setForceReload(!forceReload);
        }
        catch(err) {
            console.log(err)
        }
        // sample.comments.push(comment_data)  // Doesnt work. change this
    }

    return(
        post && (<div className="view-post-total-container">
            <FontAwesomeIcon icon={faXmark} className="fa-icon-x-mark" onClick={closePost}/>
        <div className="view-post-container">
            <div className="view-post-user-details-container">
                <img className="view-post-user-profile-pic" src={"https://picsum.photos/30/30?random=2"} alt="profile-pic" />
                <p className="view-post-user-name">{post.username}</p>
            </div>
            <div className="view-post-img-container">
                <img className="view-post-pic" src={`http://localhost:8000/image/${post.pic}`} alt="post-pic" />
            </div>
            <p className="view-post-desc">{post.desc}</p>
            <div className="view-post-interactions-container">
                <div className="view-post-like-container">
                    <FontAwesomeIcon icon={faHeart} className="fa-icon-heart" />
                    <p>{post.likes_count}</p>
                </div>
                <div className="view-post-comment-container">
                    <FontAwesomeIcon icon={faComment} className="fa-icon-comment" />
                    <p>{post.comments_count}</p>
                </div>
            </div>
            
        </div>
        <div className="view-post-comments-container">
            <p>Comments</p>
            <div className="vp-comments-posted-container">
                {post.comments.map(item => <Comment data={item} />)}
            </div>
            <div className="view-post-make-comment-container">
                <input className="vp-comment-box" type="text" placeholder="Enter your comment here..." ref={commentRef} />
                <div className="vp-comment-arrow-container" onClick={addComment}><FontAwesomeIcon icon={faArrowRight} inverse /></div>
            </div>
            
        </div>
        </div>)
    )
}

export default ViewPost;