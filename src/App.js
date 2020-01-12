/**
 * Description: The Main entry point for the React app. Uses the Login Gate for Authentication.
 *              This component can handle alternate Layouts, what ever gets passed as children to the
 *              Login Gate will be displayed upon Auth.
 */

import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import {LoggingContext} from "./context/LoggingContext";
import {useLogger} from "./hooks/useLogger";
import {Col, Row} from "reactstrap";
import {VoiceCommandsContext} from "./context/VoiceCommandsContext";
import useSpeechRecognition from "./hooks/useSpeechRecognition";
import {Stitch} from "mongodb-stitch-browser-sdk";
import {useMongo} from "./hooks/useMongo";
import {AppContext} from "./context/AppContext";
import Routing from "./containers/Routing/Routing";

const App = () => {

    const [client, setClient] = useState(null);
    const [showLogger, setShowLogger] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);
    const [showIntendArray, setShowIntendArray] = useState(false);

    const logger = useLogger(["App Initialized"], setShowLogger);
    const SpeechRecognitionHook = useSpeechRecognition();

    useEffect(() => {
        setClient(Stitch.initializeDefaultAppClient('smart-mirror-jshfq'));
        logger.addLog("Client Intitialized")
    }, []);

    const mongoHook = useMongo(client);

    const openLogsCommand = {
        command: ["mirror mirror on the wall open logs", "mirror mirror on the wall show logs"],
        answer: "Showing Logger",
        func: () => {
            logger.addLog("Voice Command: Opening logs..");
            setShowLogger(true);
        }
    };

    const hideLogsCommand = {
        command: ["mirror mirror on the wall hide logs", "mirror mirror on the wall close logs"],
        answer: "Hiding Logger",
        func: () => {
            logger.addLog("Voice Command: Hiding logs..");
            setShowLogger(false);
        }
    };

    const showTranscriptCommand = {
        command: ["mirror mirror on the wall show transcript", "mirror mirror on the wall view transcript"],
        answer: "Showing Transcript",
        func: () => {
            logger.addLog("Voice Command: Showing Transcript");
            setShowTranscript(true);
        }
    };

    const hideTranscriptCommand = {
        command: ["mirror mirror on the wall hide transcript", "mirror mirror on the wall close transcript"],
        answer: "Hiding Transcript",
        func: () => {
            logger.addLog("Voice Command: Hiding Transcript");
            setShowTranscript(false);
        }
    };

    const showIntendArrayCommand = {
        command: "mirror mirror on the wall show commands",
        answer: "Showing Current Command Array",
        func: () => {
            logger.addLog("Voice Command: Showing Current Commands");
            setShowIntendArray(true);
        }
    };

    const hideIntendArrayCommand = {
        command: "mirror mirror on the wall hide commands",
        answer: "Hiding Current Command Array",
        func: () => {
            logger.addLog("Voice Command: Hiding Current Commands");
            setShowIntendArray(false);
        }
    };

    useEffect(() => {
        SpeechRecognitionHook.addCommand(openLogsCommand);
        SpeechRecognitionHook.addCommand(hideLogsCommand);
        SpeechRecognitionHook.addCommand(showTranscriptCommand);
        SpeechRecognitionHook.addCommand(hideTranscriptCommand);
        SpeechRecognitionHook.addCommand(showIntendArrayCommand);
        SpeechRecognitionHook.addCommand(hideIntendArrayCommand);
    }, []);

    return (
        <div style={{background: "black"}} className="App">
            <AppContext.Provider value={{mongoHook}}>
                <LoggingContext.Provider value={{logger}}>
                    <VoiceCommandsContext.Provider value={{SpeechRecognitionHook}}>
                        <Row>
                            <Col>
                                <Routing/>
                            </Col>
                            {
                                showLogger &&
                                <Col>
                                    {logger.display}
                                </Col>
                            }
                        </Row>
                    </VoiceCommandsContext.Provider>
                </LoggingContext.Provider>
            </AppContext.Provider>
            <>
                {
                    showTranscript &&
                    SpeechRecognitionHook.displayTranscript
                }
            </>
            <>
                {
                    showIntendArray &&
                    <div style={{background: "white"}}>{JSON.stringify(SpeechRecognitionHook.intendArray)}</div>
                }
            </>
        </div>
    );
};

export default App;