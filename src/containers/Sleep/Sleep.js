import React, { useState, useEffect, useContext } from "react";
import DigitalClock from "react-digital-clock";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";

const Sleep = (props) => {

    const [showClock, setShowClock] = useState(true);
    const [showLogo, setShowLogo] = useState(true);

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

    const hideLogoCommand = {
        command: ["mirror mirror on the wall hide logo", "mirror mirror on the wall hide the logo", "mirror mirror on the wall close logo", "mirror mirror hide logo", "mirror mirror hide the logo", "mirror mirror close logo"],
        answer: "Hiding Clock",
        func: () => setShowLogo(false)
    };


    const showLogoCommand = {
        command: ["mirror mirror on the wall show logo", "mirror mirror on the wall open logo", "mirror mirror on the wall show the logo", "mirror mirror show logo", "mirror mirror open logo", "mirror mirror show the logo"],
        answer: "Showing Clock",
        func: () => setShowLogo(true)
    };

    useEffect(() => {
        voiceContext.addCommand(hideClockCommand);
        voiceContext.addCommand(showClockCommand);
        voiceContext.addCommand(hideLogoCommand);
        voiceContext.addCommand(showLogoCommand);

        return () => {
            voiceContext.removeCommand(hideClockCommand);
            voiceContext.removeCommand(showClockCommand);
            voiceContext.removeCommand(hideLogoCommand);
            voiceContext.removeCommand(showLogoCommand);
        }
    }, []);

    return (
        <div style={{background: "black", height: "100vh", overflow: "hidden"}}>

        </div>
    )

};

export default Sleep;