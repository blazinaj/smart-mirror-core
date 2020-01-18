import React, { useState, useEffect, useContext } from "react";
import DigitalClock from "react-digital-clock";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";

const Sleep = (props) => {

    const [showClock, setShowClock] = useState(true);

    const voiceContext = useContext(VoiceCommandsContext).SpeechRecognitionHook;

    const hideClockCommand = {
        command: ["mirror mirror on the wall hide clock", "mirror mirror on the wall hide the clock", "mirror mirror on the wall close clock", "mirror mirror hide clock", "mirror mirror hide the clock", "mirror mirror close clock"],
        answer: "Hiding Clock",
        func: () => setShowClock(false)
    };


    const showClockCommand = {
        command: ["mirror mirror on the wall show clock", "mirror mirror on the wall open clock", "mirror mirror on the wall show the clock", "mirror mirror show clock", "mirror mirror open clock", "mirror mirror show the clock"],
        answer: "Showing Clock",
        func: () => setShowClock(true)
    };

    useEffect(() => {
        voiceContext.addCommand(hideClockCommand);
        voiceContext.addCommand(showClockCommand);
    }, []);

    return (
        <div style={{background: "black", height: "100vh", overflow: "hidden"}}>
            <div>
                <img src="./Logo1.gif" alt="logo" style={{transform: "scale(0.5)", position: "absolute", left: 0, marginLeft: "-15%", marginTop: "-8%"}}/>
            </div>
            <div style={{overflow: "hidden", position: "fixed", right: 0, marginRight: "10%"}}>
                {
                    showClock &&
                        <h1>
                            <DigitalClock/>
                        </h1>
                }
            </div>
        </div>
    )

};

export default Sleep;