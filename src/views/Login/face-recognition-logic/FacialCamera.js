//Author Nik while using WebDevSimplified's facial recognition logic using Face-Api.js
//Link to Face-Api.js --> https://github.com/justadudewhohacks/face-api.js/
//Link to WebDevSimplified's code --> https://github.com/WebDevSimplified/Face-Detection-JavaScript
//Link to videos -->
//  https://www.youtube.com/watch?v=CVClHLwv-4I
//  https://www.youtube.com/watch?v=AZ4PdALMqx0&t=401s

import React, {useRef, useEffect} from "react"
import CameraWidget from "camera-widget";
import * as faceapi from "face-api.js";

const FacialCamera = (props) => {

    const webcamRef = useRef(null);

    let videoConstraints = {
        width: '1000px',
        height: '1000px',
        facingMode: "user"
    };

    const coreAPI = {
        "webcamRef": webcamRef,
        "videoConstraints": videoConstraints,
        "audio": false
    };

    const loginCamera = <CameraWidget id={"loginCamera"} coreAPI={coreAPI} />;
    //const WebcamComponent = <CameraWidget videoConstraints={videoConstraints}/>;

    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]);

    const setCamera = () => {
        const canvas = faceapi.createCanvasFromMedia(loginCamera);
        //const canvas = faceapi.createCanvas(videoConstraints);
        document.body.append(canvas);
        const displaySize = { width: videoConstraints, height: videoConstraints };
        faceapi.matchDimensions(canvas, displaySize);
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(loginCamera, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        }, 100)
    };

    //Button below is simply there to activate the facial recognition logic
    //Once working will be replaced!
    return(
        <>
            {loginCamera}
            <button onClick={setCamera}>Test</button>
        </>
    )

};

export default FacialCamera;