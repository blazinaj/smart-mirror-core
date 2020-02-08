import React, {useState, useEffect, useContext, useRef, useCallback} from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {Input, Label, Button, Row, Col} from 'reactstrap';
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import {useModal} from "../../hooks/useModal";
import Search from "../../hooks/useImageSearch";
import Webcam from "react-webcam";

const PhotoBooth = (props) => {

    ////take picture section  //////////////

    const [imageArray, setImageArray] = useState([]);

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
                setImageArray(imageArray => [...imageArray, imageSrc]);
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
                    <img src={imageArray[0]}/>
                </>
            );
        };

        ////end of section ///////////////


        return (
            <div style={{height: "100%", background: "black", padding: "2vw", color: "white"}}>
                <WebcamCapture/>
                <Row style={{border: "solid blue 1px"}}>
                    <Col>
                        <div>
                            <h1>Photo Booth</h1>
                            <label style={{
                                position: "absolute",
                                left: "50%",
                                "-webkit-transform": "translateX(-50%)",
                                transform: "translateX(-50%)",
                                color: "white",
                            }}
                            >Photo Booth</label>
                        </div>
                    </Col>
                </Row>
                <Row style={{height: "80%", border: "solid green 1px"}}>
                    <Col lg={3}>
                        <h1>Flash</h1>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Col style={{height: "20vh"}}>
                                {imageArray[0] ?
                                    <img src={imageArray[0]}/>
                                    : null
                                }
                            </Col>

                        </Row>
                        <Row>
                            <Col style={{height: "20vh"}}>
                                <img src={imageArray[1]}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{height: "20vh"}}>
                                <img src={imageArray[2]}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{height: "20vh"}}>
                                <img src={imageArray[3]}/>
                            </Col>
                        </Row>
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