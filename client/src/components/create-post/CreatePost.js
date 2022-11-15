import React, { useEffect } from "react";
import { useState, useRef } from "react";
import "./CreatePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Capture from "./Capture";

function CreatePost({setCreatePost}){
  const fileRef = useRef(null);
  const canvasRef = useRef(null);
  const [ hasUploadedImg, setHasUploadedImg ] = useState(false);
  const [ hasOpenedCamera, sethasOpenedCamera ] = useState(false);
  const [ imgObjectURL, setImgObjectURL ] = useState(null);

  // useEffect(() => {
  //   if(hasUploadedImg && imgObjectURL) {
  //     // Displaying the image on canvas and enabling cropping and editing the image.
  //     // ERROR: Image is not being displayed!! Check here
  //     const ctx = canvasRef.current.getContext("2d");
  //     let img = new Image();
  //     img.src = "/images/login-page-background.jpg"
  //     ctx.drawImage(img, 0, 0);
  //   }
  // }, [hasUploadedImg, imgObjectURL])

  const handleSelectedImage = (img) => {
    // Things that need to be done on the image after uploading it
    console.log(img.name);
    if(imgObjectURL !== null)
      URL.revokeObjectURL(imgObjectURL);
      const img_obj_url = window.URL.createObjectURL(img)
      console.log(img_obj_url)
    setImgObjectURL(img_obj_url);
    
    setHasUploadedImg(true);
  }

  const handleFileSelectorChange = () => {
    // On clicking select file button (which is triggered by the handleFileBtnClick)
    const file = fileRef.current.files[0];
    handleSelectedImage(file); // Performs actions to the image
    
  }

  const handleFileBtnClick = () => {
    // Upload input trigger from clicking the dropbox
    if(fileRef)
      fileRef.current.click();
  }

  const stopDefault = (e) => {
    // Preventing default behaviour of the events
    e.stopPropagation();
    e.preventDefault();
  }

  const handleFileDrop = (e) => {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    handleSelectedImage(file); // Performs actions to the image
    stopDefault(e);
  }

  const closeCreatePost = () => {
    setCreatePost(false);
  }

  return (
    <div id="create-post-container">
      <p className="cp-heading">Create a post</p>
      <FontAwesomeIcon icon={faXmark} className="fa-icon-x-mark" onClick={closeCreatePost}/>
      <textarea className="create-post-input" placeholder="Say something about it..." maxLength={100}></textarea>
      {/* Allow users to upload images here */}
      <input type="file" id="img-upload" name="img-upload" accept="image/png, image/jpeg" ref={fileRef} onChange={handleFileSelectorChange} />
      
      {(hasUploadedImg === false && hasOpenedCamera === false) && (<>
        <div className="cp-drop-zone" onClick={handleFileBtnClick} onDragEnter={stopDefault} onDragOver={stopDefault} onDrop={handleFileDrop}>
          <p>Drag and drop your image here</p>
          <p>OR</p>
          <p>Click here to upload an image</p>
          <p className="cp-img-upload-box-note">Note: Aspect Ratio Expected is 2:3</p>
        </div>
        <div className="cp-open-camera-btn" onClick={() => sethasOpenedCamera(true)}>click here to open your camera</div>
      </>)}

      {(hasUploadedImg === false && hasOpenedCamera === true) && (
        <div className="cp-capture-container">
          <Capture />
        </div>
      )}

      {(hasUploadedImg === true && hasOpenedCamera === false) && (
        <img id="cp-preview-img" src={imgObjectURL} />  // This works!!
        // <canvas id="cp-canvas" ref={canvasRef}></canvas>
      )}

      <div id="post-btn-container">
        <div className="cp-btn">POST</div>
      </div>
    </div>  
  );
}

export default CreatePost;