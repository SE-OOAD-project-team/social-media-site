import React from "react";
import "./ViewPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faXmark } from "@fortawesome/free-solid-svg-icons";

function ViewPost({setViewFullPost}) {
    const sample = {
        user_details: {
            name: "profileName",
            profile_pic: "https://picsum.photos/30/30?random=2",
        },
        desc: "post description goes here",
        pic: "https://picsum.photos/300/450?random=3",
        comments: [{
            name: "user1",
            profile_pic: "/temp/wallpaper.jpg",
            comment: "Well done. jfdnsfklds jkfndsknf."
        }],
        likes_count: 233,
        comments_count: 45,
    };

    const closePost = () => {
        setViewFullPost(false);
    }

    return(
        <div className="view-post-container">
            <FontAwesomeIcon icon={faXmark} className="fa-icon-x-mark" onClick={closePost}/>
            <div className="view-post-user-details-container">
                <img className="view-post-user-profile-pic" src={sample.user_details.profile_pic} alt="profile-pic" />
                <p className="view-post-user-name">{sample.user_details.name}</p>
            </div>
            <div className="view-post-img-container">
                <img className="view-post-pic" src={sample.pic} alt="post-pic" />
            </div>
            <p className="view-post-desc">{sample.desc}</p>
            <div className="view-post-interactions-container">
                <div className="view-post-like-container">
                    <FontAwesomeIcon icon={faHeart} className="fa-icon-heart" />
                    <p>{sample.likes_count}</p>
                </div>
                <div className="view-post-comment-container">
                    <FontAwesomeIcon icon={faComment} className="fa-icon-comment" />
                    <p>{sample.comments_count}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewPost;