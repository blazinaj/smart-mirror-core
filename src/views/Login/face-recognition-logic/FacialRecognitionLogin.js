import React, {useState} from 'react'
import CameraWidget from "camera-widget";
import {Button} from "reactstrap";
import FacialCamera from "./FacialCamera";

const FacialRecognitionLogin = () => {

    // Testing Purposes - WON'T STAY HERE LIKE THIS...
    // ----------------------------------------
    // Was going to also look into simply recognizing a picture and not live camera
    // Hence why this is currently here
    let testImageEnabled = true;
    // ----------------------------------------

    // Working
    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [cameraButtonText, setCameraButtonText] = useState("Disable Camera");
    const toggleCamera = () => {
        setCameraEnabled(!cameraEnabled);
        switch(cameraButtonText){
            case "Disable Camera": setCameraButtonText("Enable Camera"); break;
            case "Enable Camera": setCameraButtonText("Disable Camera");
        }
        console.log();
    };
    // ----------------------------------------
    // End Testing Purposes

    return(
        <div>
            <>
                {
                    cameraEnabled ?
                        <FacialCamera/>
                        :
                        <h2 id={"loginCameraDisabled"}>Camera Not Enabled</h2>
                }
            </>
            <br />
            <Button className={"authButton"}  onClick={toggleCamera}>{cameraButtonText}</Button>
            <>
                {
                    testImageEnabled ?
                        <>
                            <hr />
                            <img id="testImage" src={require('../images/barney.png')} />
                            <br />
                            <Button className={"authButton"}  >Identify!</Button>
                        </>
                        :
                        <></>
                }
            </>
        </div>
    )

};

export default FacialRecognitionLogin;