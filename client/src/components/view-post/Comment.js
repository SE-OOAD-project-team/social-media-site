import React from "react";
import "./Comment.css";

function Comment ({data}) {
    // const sample = {
    //     name: "profileName",
    //     profile_pic: "https://picsum.photos/30/30",
    //     comment: "Well Done"
    // }
    return (
        <div className="comment-container">
            <div className="comment-profile-container">
                <img className="comment-profile-pic" src={data.profile_pic} />
                <p className="comment-profile-name">{data.name}</p>
            </div>
            <p className="comment-comment">{data.comment}</p>
        </div>
    )
}

export default Comment;