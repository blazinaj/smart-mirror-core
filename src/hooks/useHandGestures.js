import React, {useState, useEffect} from "react";
import * as handTrack from "handtrackjs";
import {Spinner} from "reactstrap";
import {Button} from "reactstrap";
import pointer from "../pointer.png";

export const useHandGestures = () => {

    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [model, setModel] = useState(null);

    const video = document.getElementById('video') ? document.getElementById('video') : null;
    const canvas = document.getElementById('video-canvas') ? document.getElementById('video-canvas') : null;
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

        if (video && canvas && context) {
            model.detect(video).then(predictions => {

                model.renderPredictions(predictions, canvas, context, video);
                if (Array.isArray(predictions)) {
                    predictions.map((item) => {

                        let xLocal = item.bbox[0] + (item.bbox[2] / 2);
                        let yLocal = item.bbox[1] + (item.bbox[3] / 2);

                        mouseClick(xLocal, yLocal);

                        setX(item.bbox[0] + (item.bbox[2] / 2));
                        setY(item.bbox[1] + (item.bbox[3] / 2));

                    })
                }
                requestAnimationFrame(runDetection);
            });
        }
    };


    useEffect(() => {

        let canvas = document.getElementById('draw-canvas') ? document.getElementById('draw-canvas') : null;

        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            document.body.style.margin = "0";

            setCtx(canvas.getContext('2d'));
        }
    }, []);

    useEffect(() => {

        if (x && y && ctx) {

            ctx.beginPath(); // begin

            ctx.lineWidth = 10;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'white';

            ctx.moveTo(x, y); // from

            ctx.lineTo(x, y); // to

            ctx.stroke(); // draw it!
        }
    }, [x]);

    const mouseClick = (x, y) => {

        let ev = document.createEvent("MouseEvent");

        let el = document.elementFromPoint(x, y);

        ev.initMouseEvent(
            "click",
            true /* bubble */, true /* cancelable */,
            window, null,
            x, y, 0, 0, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        if (el && el.dispatchEvent && ev) {
            el.dispatchEvent(ev);
        }
    };

    const handUI =
        <div>
            <h1 style={{color: "white"}}>Gesture Paint Page</h1>
            {
                model ? null : <Spinner color="primary"/>
            }

            <canvas id="video-canvas"></canvas>
            <canvas id="draw-canvas" style={{display: "none"}}></canvas>

            <video autoPlay="autoplay" style={{display: "none"}} id="video" width="1000px"
                   height="720px">
            </video>
        </div>;

    const paintUI =
        <div>
            <h1 style={{color: "white"}}>Gesture Paint Page</h1>
            {
                model ? null : <Spinner color="primary"/>
            }

            <canvas id="video-canvas" style={{display: "none"}}></canvas>
            <canvas id="draw-canvas" style={{backgroundColor: "black"}}></canvas>

            <video autoPlay="autoplay" style={{display: "none"}} id="video" width={window.innerWidth}
                   height={window.innerHeight}>
            </video>
        </div>;

    const [click, setClick] = useState(0);
    const [outOfTime, setOutOfTime] = useState(false);

    const clicked = () => {

        if (!outOfTime) {
            setClick(click + 1);
            document.getElementById("score").innerHTML = click;

            let randomTop = Math.random() * (700 - 200) + 200;
            let randomLeft = Math.random() * (700 - 200) + 200;

            document.getElementById("increaseScoreButton").style.top = `${randomTop}px`;
            document.getElementById("increaseScoreButton").style.left = `${randomLeft}px`;
        }
    };

    useEffect(() => {

        let time = 60; //time in seconds
        let timer = setInterval(() => {

            time--;

            if (document && document.getElementById("timer") && document.getElementById("timer").innerHTML) {
                document.getElementById("timer").innerHTML = time + "s";

                if (time === 0) {
                    clearInterval(timer);
                    document.getElementById("timer").innerHTML = "Time's up!";
                    setOutOfTime(true);
                }
            }
        }, 1000);
    }, []);

    const clickUI =
        <div>
            <h1 style={{color: "white"}}>Click Me Game</h1>
            {
                model ? null : <Spinner color="primary"/>
            }

            <canvas id="video-canvas" style={{display: "none"}}></canvas>

            <img src={pointer} id="pointer" alt="pointer"
                 style={{
                     position: "absolute",
                     top: y,
                     left: x,
                     zIndex: 99
                 }}/>

            <h1 style={{color: "white"}}>Time remaining: {' '}
                <span id="timer" style={{color: "yellow"}}> 60s</span></h1>
            <br/>
            <h2 style={{color: "white"}}>Score: {' '}
                <span id="score" style={{color: "yellow"}}>0</span></h2>
            <br/>

            <Button color="primary" id="increaseScoreButton" onClick={() => clicked()}
                    style={{zIndex: 1, position: "absolute", top: "50%", left: "50%"}}>Click
                Me!</Button>

            <canvas id="draw-canvas" style={{backgroundColor: "black", display: "none"}}></canvas>

            <video autoPlay="autoplay" style={{display: "none"}} id="video" width={window.innerWidth}
                   height={window.innerHeight}>
            </video>
        </div>;

    return {
        paintUI,
        clickUI,
        handUI
    }
};