import React, { useRef } from "react";
import "./ViewPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";

function ViewPost({setViewFullPost}) {
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

    const commentRef = useRef(null);

    const closePost = () => {
        setViewFullPost(false);
    }


    // Function called on clicking the post comment button
    const addComment = () => {
        const comment = commentRef.current.value;
        const comment_data = {
            name: "yourname",
            profile_pic: "your_profile_pic",
            comment: comment,
        }
        console.log(comment_data);
        sample.comments.push(comment_data)  // Doesnt work. change this
    }

    return(
        <div className="view-post-total-container">
            <FontAwesomeIcon icon={faXmark} className="fa-icon-x-mark" onClick={closePost}/>
        <div className="view-post-container">
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
        <div className="view-post-comments-container">
            <p>Comments</p>
            <div className="vp-comments-posted-container">
                {sample.comments.map(item => <Comment data={item} />)}
            </div>
            <div className="view-post-make-comment-container">
                <input className="vp-comment-box" type="text" placeholder="Enter your comment here..." ref={commentRef} />
                <div className="vp-comment-arrow-container" onClick={addComment}><FontAwesomeIcon icon={faArrowRight} inverse /></div>
            </div>
            
        </div>
        </div>
    )
}

export default ViewPost;