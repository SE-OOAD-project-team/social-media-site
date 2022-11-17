import React, { useRef, useState, useEffect } from "react";
import "./ViewPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import axios from "axios";

function ViewPost({setViewFullPost, viewFullPostId}) {
    const sample = {
        post_id: "ABC123",
        user_details: {
            name: "profileName",
            profile_pic: "https://picsum.photos/30/30?random=2",
        },
        desc: "post description goes here",
        pic: "https://picsum.photos/300/450?random=3",
        comments: [
            {
                name: "user1",
                profile_pic: "/temp/wallpaper.jpg",
                comment: "Well done. Crazy."
            },
            {
                name: "user2",
                profile_pic: "https://picsum.photos/30/30",
                comment: "Well done. jfdnsfklds jkfndsknfa aasaa."
            },
            {
                name: "user3",
                profile_pic: "https://picsum.photos/30/30",
                comment: "Well done. jfdnsfklds jkfndskn fasasadasd."
            },
        ],
        likes_count: 233,
        comments_count: 45,
    };
    const [post, setPost] = useState(null);
    const [forceReload, setForceReload] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:8000/api/post/get/${viewFullPostId}`);
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
            post_id: post._id,
            commented_user_name: curr_user,
            comment: comment,
        }
        // console.log(comment_data);
        try{
            await axios.post("http://localhost:8000/api/postComment", comment_data)
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
                <p className="view-post-user-name">{post.user_details && post.user_details.name}</p>
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