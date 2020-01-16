import React, {useState, useEffect} from "react";
import {Col, Row} from "reactstrap";
import * as handTrack from "handtrackjs";

export const useHandGestures = () => {

    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [model, setModel] = useState(null);

    const video = document.getElementById('video');
    const canvas = document.getElementById('video-canvas');
    const context = canvas && canvas.getContext("2d");

    const [ctx, setCtx] = useState(null);

    const modelParams = {
        flipHorizontal: true, // flip e.g for video
        imageScaleFactor: 0.7, // reduce input image size for gains in speed.
        maxNumBoxes: 20, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.79, // confidence threshold for predictions.
    };

    useEffect(() => {
        handTrack.load(modelParams).then(modelLocal => {
            console.log("model loaded");
            setModel(modelLocal);
        });
    }, []);

    useEffect(() => {
        if (model) {
            startVideo();
        }
    }, [model]);

    const startVideo = () => {
        handTrack.startVideo(video).then(function (status) {
            console.log("video started", status);
            if (status) {
                runDetection();
            } else {
                console.log("Please enable video");
            }
        });
    };

    const runDetection = () => {
        model.detect(video).then(predictions => {

            model.renderPredictions(predictions, canvas, context, video);
            if (Array.isArray(predictions)) {
                predictions.map((item) => {
                    setX(item.bbox[0] + (item.bbox[2] / 2));
                    setY(item.bbox[1] + (item.bbox[3] / 2));
                })
            }
            requestAnimationFrame(runDetection);
        });
    };

    // useEffect(() => {
    //
    //     let constraints = {video: {width: 450, height: 380}};
    //
    //     navigator.mediaDevices.getUserMedia(constraints)
    //         .then(function (mediaStream) {
    //             let video = document.querySelector('video');
    //             video.srcObject = mediaStream;
    //             video.onloadedmetadata = function (e) {
    //                 video.play();
    //             };
    //         })
    //         .catch(function (err) {
    //             console.log(err.name + ": " + err.message);
    //         });
    // }, []);


    useEffect(() => {

        let canvas = document.getElementById('draw-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        document.body.style.margin = "0";

        setCtx(canvas.getContext('2d'));

    }, []);

    useEffect(() => {

        if (x && y) {

            ctx.beginPath(); // begin

            ctx.lineWidth = 10;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'white';

            ctx.moveTo(x, y); // from

            ctx.lineTo(x, y); // to

            ctx.stroke(); // draw it!
        }
    }, [x]);

    const paintUI =
        <div>
            <h1 style={{color: "white"}}>Gesture Paint Page</h1>

            <canvas id="video-canvas" style={{display: "none"}}></canvas>

            <canvas id="draw-canvas" style={{backgroundColor: "black"}}></canvas>

            <video autoPlay="autoplay" style={{display: "none"}} id="video" width={window.innerWidth}
                   height={window.innerHeight}>
            </video>
        </div>;

    return {
        paintUI
    }
};