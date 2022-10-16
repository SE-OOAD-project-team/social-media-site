import React from "react";
import "./CreatePost.css";

function CreatePost(){
    return (
      <div id="create-post-container">
        <p className="heading">Create a post</p>
        <textarea className="create-post-input" placeholder="What do you wanna talk about?" maxLength={1000}></textarea>
        <input className="create-post-input" type="text" placeholder="Hashtag" />
        {/* Allow users to upload images here */}
        {/* Post visible to -> everyone, followers, private */}
        <div id="post-btn-container">
            <div className="btn post-ptn">POST</div>
            <div className="btn discard-btn">DISCARD</div>
        </div>
      </div>  
    );
}

export default CreatePost;