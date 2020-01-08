/**
 * Description: The Main entry point for the React app. Uses the Login Gate for Authentication.
 *              This component can handle alternate Layouts, what ever gets passed as children to the
 *              Login Gate will be displayed upon Auth.
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import DefaultHeader from "./containers/DefaultLayout/DefaultHeader";
import DefaultLayout from "./containers/DefaultLayout/DefaultLayout";
import LoginGate from "./views/Login/LoginGate";
import {LoggingContext} from "./context/LoggingContext";
import {useLogger} from "./hooks/useLogger";
import {Col} from "reactstrap";
import {VoiceCommandsContext} from "./context/VoiceCommandsContext";
import useSpeechRecognition from "./hooks/useSpeechRecognition";
import TestPage from "./views/TestPage/TestPage";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import {Stitch} from "mongodb-stitch-browser-sdk";
import {useMongo} from "./hooks/useMongo";
import {AppContext} from "./context/AppContext";
import Login from "./views/Login/Login";

/**
 *
 * @returns {*}
 * @constructor
 */
const App = () => {

    const [client, setClient] = useState(null);

    const logger = useLogger(["App Initialized"]);
    const SpeechRecognitionHook = useSpeechRecognition();

    useEffect(() => {

        setClient(Stitch.initializeDefaultAppClient('smart-mirror-jshfq'));

        logger.addLog("Client Intitialized")

    }, []);

    const mongoHook = useMongo(client);

    return (
        <div style={{background: "black"}} className="App">
            <AppContext.Provider value={{mongoHook}}>
                <LoggingContext.Provider value={{logger}}>
                    <VoiceCommandsContext.Provider value={{SpeechRecognitionHook}}>
                        <Router>
                            <Switch>
                                <Route exact path="/login">
                                    <Login mongoHook={mongoHook}/>
                                </Route>
                                <PrivateRoute exact path="/" mongoHook={mongoHook}>
                                    <Col>
                                        <DefaultHeader/>
                                        <DefaultLayout/>
                                    </Col>
                                </PrivateRoute>
                                <PrivateRoute exact path="/test" mongoHook={mongoHook}>
                                    <div>TEST PAGE</div>
                                </PrivateRoute>
                                <PrivateRoute exact path="/voice_demo" mongoHook={mongoHook}>
                                    <div style={{height: "100vh", "backgroundColor": "red"}}>voice demo page</div>
                                </PrivateRoute>
                            </Switch>
                        </Router>
                    </VoiceCommandsContext.Provider>
                </LoggingContext.Provider>
            </AppContext.Provider>
        </div>
    );
};

const PrivateRoute = ({children, ...props}) => {
    return (
        <Route
            {...props}
            render={({ location }) =>
               props.mongoHook.isLoggedIn ? (
                   children
               ) : (
                   <Redirect
                       to={{
                           pathname: "/login",
                           state: { from: location }
                       }}
                   />
               )
            }
        />
    )
};

export default App;