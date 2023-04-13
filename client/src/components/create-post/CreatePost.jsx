import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import './CreatePost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Capture from './Capture';
import axios from 'axios';
import { join_path } from '../../api/api.js';
import { server_uri, server_v2_uri } from '../..';

function CreatePost({ setCreatePost }) {
	const fileRef = useRef(null);
	const canvasRef = useRef(null);
	const textareaRef = useRef(null);
	const [hasUploadedImg, setHasUploadedImg] = useState(false);
	const [hasOpenedCamera, sethasOpenedCamera] = useState(false);
	const [imgObjectURL, setImgObjectURL] = useState(null);
	const [imageFile, setImageFile] = useState(null);

	// imageFile stores the data in form of a File. This is then uploaded to the server via formData

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
		console.log(img);
		setImageFile(img);
		if (imgObjectURL !== null) URL.revokeObjectURL(imgObjectURL);
		const img_obj_url = window.URL.createObjectURL(img);
		console.log(img_obj_url);
		setImgObjectURL(img_obj_url);

		setHasUploadedImg(true);
	};

	const handleFileSelectorChange = () => {
		// On clicking select file button (which is triggered by the handleFileBtnClick)
		const file = fileRef.current.files[0];
		handleSelectedImage(file); // Performs actions to the image
	};

	const handleFileBtnClick = () => {
		// Upload input trigger from clicking the dropbox
		if (fileRef) fileRef.current.click();
	};

	const stopDefault = (e) => {
		// Preventing default behaviour of the events
		e.stopPropagation();
		e.preventDefault();
	};

	const handleFileDrop = (e) => {
		const dt = e.dataTransfer;
		const file = dt.files[0];
		handleSelectedImage(file); // Performs actions to the image
		stopDefault(e);
	};

	const closeCreatePost = () => {
		setCreatePost(false);
	};

	const submitPost = async () => {
		const formData = new FormData();
		const username = localStorage.getItem('username'); // Fetching login
		const desc = textareaRef.current.value;
		formData.append('username', username);
		formData.append('photo', imageFile); // Because backend has file as photo
		formData.append('desc', desc);

		// console.log(formData)
		// console.log(username)
		// console.log(desc)
		// console.log(imageFile)

		try {
			const res = await axios.post(
				join_path(server_uri, 'api/upload_photo'),
				formData,
				{
					headers: {
						Authorization: `Bearer ${window.localStorage.getItem('token')}`,
					},
				}
			);
			// .then(res => {
			//   console.log(res.data)
			// })
			console.log('Uploaded image', res.data);

			const post_res = await fetch(
				join_path(server_v2_uri, 'api/v2/post/create'),
				{
					method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
					body: JSON.stringify({
						username: username,
						desc: desc,
						pic: res.data.filename,
					}),
				}
			);

			const created_post = await post_res.json();
			console.log('Created post', created_post);
		} catch (err) {
			// .catch(err => {
			console.log(err);
			// })
		}
		closeCreatePost();
	};

	return (
		<div id="create-post-container">
			<p className="cp-heading">Create a post</p>
			<FontAwesomeIcon
				icon={faXmark}
				className="fa-icon-x-mark"
				onClick={closeCreatePost}
			/>
			<textarea
				className="create-post-input"
				placeholder="Say something about it..."
				maxLength={100}
				ref={textareaRef}
			></textarea>
			{/* Allow users to upload images here */}
			<input
				type="file"
				id="img-upload"
				name="img-upload"
				accept="image/png, image/jpeg"
				ref={fileRef}
				onChange={handleFileSelectorChange}
			/>

			{/* Uploading image via image drop */}
			{hasUploadedImg === false && hasOpenedCamera === false && (
				<>
					<div
						className="cp-drop-zone"
						onClick={handleFileBtnClick}
						onDragEnter={stopDefault}
						onDragOver={stopDefault}
						onDrop={handleFileDrop}
					>
						<p>Drag and drop your image here</p>
						<p>OR</p>
						<p>Click here to upload an image</p>
						<p className="cp-img-upload-box-note">
							Note: Aspect Ratio Expected is 2:3
						</p>
					</div>
					<p>OR</p>
					<div
						className="cp-open-camera-btn"
						onClick={() => sethasOpenedCamera(true)}
					>
						click here to open your camera
					</div>
				</>
			)}

			{/* Uploading image via camera */}
			{hasUploadedImg === false && hasOpenedCamera === true && (
				<div className="cp-capture-container">
					<Capture
						setImageFile={setImageFile}
						imgObjectURL={imgObjectURL}
						setImgObjectURL={setImgObjectURL}
						setHasUploadedImg={setHasUploadedImg}
					/>
				</div>
			)}

			{/* Preview of image uploaded via image drop */}
			{/* {(hasUploadedImg === true && hasOpenedCamera === false) && ( */}
			{hasUploadedImg === true && (
				<img id="cp-preview-img" src={imgObjectURL} /> // This works!!
				// <canvas id="cp-canvas" ref={canvasRef}></canvas>
			)}

			<div id="post-btn-container">
				<div className="cp-btn" onClick={submitPost}>
					POST
				</div>
			</div>
		</div>
	);
}

export default CreatePost;
