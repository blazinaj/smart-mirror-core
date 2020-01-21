import React, {useState, useEffect, useContext} from "react";
import {Input, Label, Button, Row, Col} from 'reactstrap';
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import AnalogClock from 'analog-clock-react';



const Devotions = (props)=>{

    let options = {
        width: "300px",
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#17a2b8",
        centerColor: "#459cff",
        handColors: {
          second: "#d81c7a",
          minute: "#fff",
          hour: "#fff"
        }
    };

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);

    return (
        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>Devotions</h1>
            <>
                {
                    SpeechRecognitionHook.displayTranscript
                }
            </>
            <Col>
                <h2> For God so loved the world...</h2>
            </Col>
            <Col>
                <h2> John 3:16</h2>
            </Col>
            <Col>
                <AnalogClock {...options} />
            </Col>

        </div>
    )
};
export default Devotions;