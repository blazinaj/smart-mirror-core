/**
 * Description: The Main entry point for the React app. Uses the Login Gate for Authentication.
 *              This component can handle alternate Layouts, what ever gets passed as children to the
 *              Login Gate will be displayed upon Auth.
 */

import React from 'react';
import './App.css';
import DefaultHeader from "./containers/DefaultLayout/DefaultHeader";
import DefaultLayout from "./containers/DefaultLayout/DefaultLayout";
import LoginGate from "./views/Login/LoginGate";
import {LoggingContext} from "./context/LoggingContext";
import {useLogger} from "./hooks/useLogger";
import {Col} from "reactstrap";
import {VoiceCommandsContext} from "./context/VoiceCommandsContext";
import useSpeechRecognition from "./hooks/useSpeechRecognition";

const App = () => {

    const logger = useLogger(["App Initialized"]);
    const SpeechRecognitionHook = useSpeechRecognition();

    return (
        <div style={{background: "black"}} className="App">
            <LoggingContext.Provider value={{logger}}>
                <VoiceCommandsContext.Provider value={{SpeechRecognitionHook}}>
                    <Col>
                        <LoginGate>
                            <DefaultHeader/>
                            <DefaultLayout/>
                        </LoginGate>
                    </Col>
                </VoiceCommandsContext.Provider>
            </LoggingContext.Provider>
        </div>
    );
};

export default App;