import React, {useState, useEffect} from "react";
import * as handTrack from "handtrackjs";
import {Spinner} from "reactstrap";

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
        canvas.width = "720";
        canvas.height = "480";

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

    const mouseClick = () => {
        document.elementFromPoint(x, y).click();
    };

    function click(x,y){
        let ev = document.createEvent("MouseEvent");
        let el = document.elementFromPoint(x,y);
        ev.initMouseEvent(
            "click",
            true /* bubble */, true /* cancelable */,
            window, null,
            x, y, 0, 0, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        el.dispatchEvent(ev);
    }

    const paintUI =
        <div>
            <h1 style={{color: "white"}}>Gesture Paint Page</h1>
            {
                model ? null : <Spinner color="primary"/>
            }

            <canvas id="video-canvas"></canvas>

            <canvas id="draw-canvas" style={{backgroundColor: "black"}}></canvas>

            <video autoPlay="autoplay" style={{display: "none"}} id="video" width="720"
                   height="480">
            </video>
        </div>;

    return {
        paintUI
    }
};