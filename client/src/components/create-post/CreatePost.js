import React from "react";
import { useState, useRef } from "react";
import "./CreatePost.css";

function CreatePost(){

  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const dragInputRef = useRef(null);
  
  // handle drag events
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // triggers when file is dropped
  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
    }
  };
  
  // triggers when file is selected with click
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
    }
  };
  
// triggers the input when the button is clicked
  const onButtonClick = () => {
    dragInputRef.current.click();
  };

    return (
      <div id="create-post-container">
        <p className="heading">Create a post</p>
        <textarea className="create-post-input" placeholder="What do you wanna talk about?" maxLength={1000}></textarea>
        <input className="create-post-input" type="text" placeholder="Hashtag" />
        {/* Allow users to upload images here */}

        <input ref={dragInputRef} type="images" id="input-file-upload" multiple={false} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
        {/* <div> */}
          <p>Drag and drop your file here or</p>
          <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
        {/* </div>  */}
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      
        {/* Post visible to -> everyone, followers, private */}
        <div id="post-btn-container">
            <div className="btn post-ptn">POST</div>
            <div className="btn discard-btn">DISCARD</div>
        </div>
      </div>  
    );
}

export default CreatePost;