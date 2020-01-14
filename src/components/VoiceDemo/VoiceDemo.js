import React, { useState, useEffect, useContext } from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";


const VoiceDemo = (props) => {

    const { SpeechRecognitionHook} = useContext(VoiceCommandsContext);

    const whoIsTheManCommand = {
        command: ["mirror mirror on the wall who is the man"],
        answer: "Stu is the man"
    };
    useEffect(() => {
        SpeechRecognitionHook.addCommand(whoIsTheManCommand);
    }, []);
    return (
        <div style={{background: "black", height: "100vh"}}>
            <h1>Voice Demo Page</h1>
            <>
                {
                    SpeechRecognitionHook.displayTranscript
                }
            </>
        </div>
    );
};
export default VoiceDemo;