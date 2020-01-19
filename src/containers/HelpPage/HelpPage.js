import React, {useState, useContext} from "react"
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {LoggingContext} from "../../context/LoggingContext";

const HelpPage = () => {

    const voiceContext = useContext(VoiceCommandsContext).SpeechRecognitionHook;
    const loggingContext = useContext(LoggingContext).logger;

    return (
        <div>
            {
                voiceContext.intendArray.map((command) => {
                    return <div>
                        <li id={command}>{JSON.stringify(command.command)}</li>
                        <br />
                    </div>
                })
            }
        </div>
    )

};

export default HelpPage;