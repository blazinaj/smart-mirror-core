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
import TestPage from "./views/TestPage/TestPage";
import Dictaphone from "./views/VoiceRecognition/Dictaphone";

const App = () => {

    const logger = useLogger(["App Initialized"]);

    return (
        <div style={{background: "black"}} className="App">
            <LoggingContext.Provider value={{logger}}>
                <Col>
                    <LoginGate>
                        <DefaultHeader/>
                        <DefaultLayout/>
                    </LoginGate>
                </Col>
            </LoggingContext.Provider>

            <Dictaphone/>
        </div>
    );
};

export default App;