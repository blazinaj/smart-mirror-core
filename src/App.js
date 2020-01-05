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
import TestPage from "./views/TestPage/TestPage";
import Dictaphone from "./views/VoiceRecognition/Dictaphone";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
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

    useEffect(() => {

        setClient(Stitch.initializeDefaultAppClient('smart-mirror-jshfq'));

        logger.addLog("Client Intitialized")

    }, []);

    const mongoHook = useMongo(client);

    return (
        <div style={{background: "black"}} className="App">
            <AppContext.Provider value={{mongoHook}}>
                <LoggingContext.Provider value={{logger}}>
                    <Router>
                        <Switch>
                            <Route exact path="/login">
                              <Login mongoHook={mongoHook}/>
                              <Dictaphone />
                            </Route>
                            <PrivateRoute path="/" mongoHook={mongoHook}>
                                <Router>
                                    <Switch>
                                       <Route exact path="/test">
                                           <div>TEST PAGE</div>
                                       </Route>
                                    </Switch>
                                </Router>
                                <Col>
                                    <DefaultHeader/>
                                    <DefaultLayout/>
                                    <Dictaphone />

                                </Col>
                            </PrivateRoute>
                        </Switch>
                    </Router>
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
}

export default App;