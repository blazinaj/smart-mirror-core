import React, { useState, useEffect, useContext } from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";

const VoiceDemo = (props) => {

    const voiceContext = useContext(VoiceCommandsContext).SpeechRecognitionHook;

    const whoIsTheManCommand = {
        command: ["mirror mirror on the wall who is the man"],
        answer: "Stu is the man",
        //func: () => ???
    };

    useEffect(() => {
        voiceContext.addCommand(whoIsTheManCommand);

    }, []);

    return (
        <div style={{background: "black", height: "100vh"}}>
            <h1>Voice Demo Page</h1>
        </div>
    );
};

export default VoiceDemo;