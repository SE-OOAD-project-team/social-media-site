import React, { useRef, useEffect, useState } from "react";
import "./Capture.css";

function Capture({setImageFile, imgObjectURL, setImgObjectURL, setHasUploadedImg}) {
    const width = 300;
    const height = 450;

    const [ streaming, setStreaming ] = useState(false);
    const [ stream, setStream ] = useState(null);
    const [ imgSrc, setImgSrc ] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const startBtnRef = useRef(null);

    // imgSrc will contain the image in the form of base64 string

    // useEffect(() => {
    //     if(imgSrc === null){
    //         navigator.mediaDevices.getUserMedia({video: true, audio: false})
    //             .then((stream) => {
    //                 videoRef.current.srcObject = stream;
    //                 videoRef.current.play();
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //         }
    // }, [imgSrc]);

    useEffect(() => {
        async function create_or_delete_stream(){
            if(imgSrc === null){
                try {
                    const _stream = await navigator.mediaDevices.getUserMedia({video: {width, height}, audio: false});
                    setStream(_stream)
                    videoRef.current.srcObject = _stream;
                    videoRef.current.play();
                }
                catch(err) {
                    console.log(err);
                }
            }
            else {
                if(stream != null)
                    stopBothVideoAndAudio();
                setStream(null);
            }
        }
        console.log(imgSrc)
        create_or_delete_stream();
        convertBase64ToFile();
        return function cleanup() {
            if(stream != null)
                stopBothVideoAndAudio();
            setStream(null);
        };
    }, [imgSrc]);

    const handleSelectedImage = (img) => {
        // Things that need to be done on the image after uploading it
        console.log(img);
        setImageFile(img)
        if(imgObjectURL !== null)
          URL.revokeObjectURL(imgObjectURL);
        const img_obj_url = window.URL.createObjectURL(img)
        console.log(img_obj_url)
        setImgObjectURL(img_obj_url);
        
        setHasUploadedImg(true);
    }

    // Convert base64 image to type File and store it in imageFile state variable.
    // This is then uploaded into the server on post button being clicked
    const convertBase64ToFile = async () => {
        if (imgSrc !== null){
            const resp = await fetch(imgSrc);
            const blob = await resp.blob();
            const file = new File([blob], "capture", { type: "image/png" });
            // console.log(file);
            // setImageFile(file);
            handleSelectedImage(file);
        }
    }

    // stop both mic and camera
    const stopBothVideoAndAudio = () => {
        stream.getTracks().forEach(function(track) {
            // if (track.readyState == 'live') {
            //     track.stop();
            // }
            track.stop();
        });
        
    }

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
                    <video id="capture-video" ref={videoRef} onCanPlay={handleCanPlay} width={width} height={height}>Video stream not available.</video>
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