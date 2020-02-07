import React, {useState, useEffect, useContext, useRef, useCallback} from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {Input, Label, Button, Row, Col} from 'reactstrap';
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import {useModal} from "../../hooks/useModal";
import Search from "../../hooks/useImageSearch";
import Webcam from "react-webcam";

const PhotoBooth = (props) => {

    ////take picture section  //////////////

    const [imageState, setImageState] = useState(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const WebcamCapture = () => {
        const webcamRef = useRef(null);

        const capture = useCallback(
            () => {
                const imageSrc = webcamRef.current.getScreenshot();
                setImageState(imageSrc);
                // alert("image captured");
            },
            [webcamRef]
        );

        return (
            <>
                <Webcam
                    audio={false}
                    height={72}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={128}
                    videoConstraints={videoConstraints}
                />
                <button onClick={capture}>Capture photo</button>
                <img src={imageState}/>
            </>
        );
    };

    ////end of section ///////////////


    return(
        <div style={{height: "100%", background: "black", padding: "2vw", color: "white"}}>
            <Row style={{ border: "solid blue 1px"}}>
                <Col>
                    <div>
                    <h1>Photo Booth</h1>
                    <label  style={{
                        position: "absolute",
                        left: "50%",
                        "-webkit-transform": "translateX(-50%)",
                        transform: "translateX(-50%)",
                        color: "white",
                    }}
                    >Photo Booth</label>
                    </div>
                </Col>
            </Row >
            <Row style={{height: "80%", border: "solid green 1px"}}>
                <Col lg={3}>
                    <h1>Flash</h1>
                </Col>
                <Col lg={6}>
                    <h1>Pic strip ...</h1>
                </Col>
                <Col lg={3}>
                    <h1>Flash</h1>
                </Col>
            </Row>
        </div>
        // <WebcamCapture/>


    );
};

export default PhotoBooth;