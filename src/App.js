/**
 * Description: The Main entry point for the React app. Uses the Login Gate for Authentication.
 *              This component can handle alternate Layouts, what ever gets passed as children to the
 *              Login Gate will be displayed upon Auth.
 */

import React, {useState, useEffect} from 'react';
import './App.css';
import {LoggingContext} from "./context/LoggingContext";
import {useLogger} from "./hooks/useLogger";
import {VoiceCommandsContext} from "./context/VoiceCommandsContext";
import useSpeechRecognition from "./hooks/useSpeechRecognition";
import {Stitch} from "mongodb-stitch-browser-sdk";
import {useMongo} from "./hooks/useMongo";
import {AppContext} from "./context/AppContext";
import Routing from "./containers/__Routing/Routing";
import Inspiration from "./components/Inspiration/Inspiration"

const App = () => {

    const [client, setClient] = useState(null);
    const [showLogger, setShowLogger] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);
    const [showIntendArray, setShowIntendArray] = useState(false);
    const [disableWebCam, setDisableWebCam] = useState(false);

    const webcamTools = {
        disableWebCam,
        setDisableWebCam
    };

    const debuggingTools = {
        showLogger,
        setShowLogger,
        showTranscript,
        setShowTranscript,
        showIntendArray,
        setShowIntendArray
    };

    const logger = useLogger(["App Initialized"]);
    const SpeechRecognitionHook = useSpeechRecognition();

    useEffect(() => {
        setClient(Stitch.initializeDefaultAppClient('smart-mirror-jshfq'));
        logger.addLog("Client Intitialized")
    }, []);

    const mongoHook = useMongo(client, logger);

    const openLogsCommand = {
        command: ["mirror mirror on the wall open logs", "mirror mirror on the wall show logs", "mirror mirror open logs", "mirror mirror show logs"],
        answer: "Showing Logger",
        func: () => {
            logger.addLog("Voice Command: Opening logs..");
            setShowLogger(true);
        }
    };

    const hideLogsCommand = {
        command: ["mirror mirror on the wall hide logs", "mirror mirror on the wall close logs", "mirror mirror hide logs", "mirror mirror close logs"],
        answer: "Hiding Logger",
        func: () => {
            logger.addLog("Voice Command: Hiding logs..");
            setShowLogger(false);
        }
    };

    const showTranscriptCommand = {
        command: ["mirror mirror on the wall show transcript", "mirror mirror on the wall view transcript", "mirror mirror show transcript", "mirror mirror view transcript"],
        answer: "Showing Transcript",
        func: () => {
            logger.addLog("Voice Command: Showing Transcript");
            setShowTranscript(true);
        }
    };

    const hideTranscriptCommand = {
        command: ["mirror mirror on the wall hide transcript", "mirror mirror on the wall close transcript", "mirror mirror hide transcript", "mirror mirror close transcript"],
        answer: "Hiding Transcript",
        func: () => {
            logger.addLog("Voice Command: Hiding Transcript");
            setShowTranscript(false);
        }
    };

    const showIntendArrayCommand = {
        command: ["mirror mirror on the wall show commands", "mirror mirror show commands"],
        answer: "Showing Current Command Array",
        func: () => {
            logger.addLog("Voice Command: Showing Current Commands");
            setShowIntendArray(true);
        }
    };

    const hideIntendArrayCommand = {
        command: ["mirror mirror on the wall hide commands", "mirror mirror hide commands"],
        answer: "Hiding Current Command Array",
        func: () => {
            logger.addLog("Voice Command: Hiding Current Commands");
            setShowIntendArray(false);
        }
    };

    const refreshCommand = {
        command: ["mirror mirror refresh"],
        answer: "",
        func: () => window.location.reload()
    };

    useEffect(() => {
        SpeechRecognitionHook.addCommand(openLogsCommand);
        SpeechRecognitionHook.addCommand(hideLogsCommand);
        SpeechRecognitionHook.addCommand(showTranscriptCommand);
        SpeechRecognitionHook.addCommand(hideTranscriptCommand);
        SpeechRecognitionHook.addCommand(showIntendArrayCommand);
        SpeechRecognitionHook.addCommand(hideIntendArrayCommand);
        SpeechRecognitionHook.addCommand(refreshCommand);
    }, []);

    return (
        <LoggingContext.Provider value={{logger}}>
            <AppContext.Provider value={{mongoHook, debuggingTools, webcamTools}}>
                <VoiceCommandsContext.Provider value={{SpeechRecognitionHook}}>
                    <div style={{background: "black", color: "white"}} className="App">
                        <>
                            {
                                showTranscript &&
                                SpeechRecognitionHook.displayTranscript
                            }
                        </>
                        <Routing/>
                    </div>
                </VoiceCommandsContext.Provider>
            </AppContext.Provider>
        </LoggingContext.Provider>

    );
};

export default App;