import React, { useRef, useEffect, useState } from "react";
import "./Capture.css";

function Capture() {
    const width = 300;
    const height = 450;

    const [ streaming, setStreaming ] = useState(false);
    const [ imgSrc, setImgSrc ] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const startBtnRef = useRef(null);

    useEffect(() => {
        if(imgSrc === null){
            navigator.mediaDevices.getUserMedia({video: true, audio: false})
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                })
                .catch(err => {
                    console.log(err);
                })
            }
    }, [imgSrc]);

    const handleCanPlay = (e) => {
        if(!streaming){
            // videoRef.current.setAttribute("width", width);
            // videoRef.current.setAttribute("height", height);
            setStreaming(true)
            
        }
    }

    const clearPhoto = () => {
        const context = canvasRef.current.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const data = canvasRef.current.toDataURL("image/png");
        setImgSrc(data);
    }

    const takePicture = () => {
        const context = canvasRef.current.getContext("2d");
        if (width && height) {
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            context.drawImage(videoRef.current, 0, 0, width, height);
            // context.drawImage(videoRef.current, 0, 0);

            const data = canvasRef.current.toDataURL("image/png");
            setImgSrc(data);
        } else {
            clearPhoto();
        }
    }

    const retakePicture = () => {
        clearPhoto();
        setImgSrc(null);
    }

    return (
        <div id="capture-container">
            {imgSrc === null && (
            <>
                {/* <div id="capture-video-container"> */}
                    <video id="capture-video" ref={videoRef} onCanPlay={handleCanPlay}>Video stream not available.</video>
                    {/* <div id="capture-video-frame"></div> */}
                {/* </div> */}
                <div id="capture-btn" ref={startBtnRef} onClick={takePicture}>Capture Photo</div>
            </>)}
            <canvas id="capture-canvas" ref={canvasRef}></canvas>
            {imgSrc !== null && (<>
                <img id="capture-preview" src={imgSrc} alt="The screen capture will appear in this box." />
                <div id="capture-btn" onClick={retakePicture}>Retake Photo</div>
            </>)}
        </div>
    )
}

export default Capture;