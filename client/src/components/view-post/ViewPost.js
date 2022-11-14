import React from "react";
import "./ViewPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faRetweet } from "@fortawesome/free-solid-svg-icons";

function ViewPost() {
    const sample = {
        user_details: {
            name: "photosbyean",
            profile_pic: "/temp/wallpaper.jpg"
        },
        title: "Post Heading 123",
        pic: "/temp/wallpaper.jpg",
        description: "jcnjknkscn jcnsdcnsdk sdnvcsivnsmdv sivnskdv dsvnjopghsu gojerhihuybcjmvje fuh fn sdhfudshjsmdnfsduh",
        comments: [{
            name: "user1",
            profile_pic: "/temp/wallpaper.jpg",
            comment: "Well done. jfdnsfklds jkfndsknf."
        }],
        likes_count: 233
    };
    return(
        <div className="view-post-container">
            <div className="view-post-user-details-container">
                <div className="view-post-user-profile-pic-container">
                    <img className="view-post-user-profile-pic" src={sample.user_details.profile_pic} alt="profile-pic" />
                </div>
                <p className="view-post-user-name">{sample.user_details.name}</p>
            </div>
            <div className="view-post-details-container">
                <p className="view-post-title">{sample.title}</p>
                <img className="view-post-pic" src={sample.pic} alt="post-pic" />
                <p className="view-post-description">{sample.description}</p>
            </div>
            <div className="view-post-interactions-container">
                {/* Change the text to an icon later */}
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faComment} />
                <FontAwesomeIcon icon={faRetweet} />
            </div>
        </div>
    )
}

export default ViewPost;