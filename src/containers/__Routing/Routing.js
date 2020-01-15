import React, { useEffect, useContext } from "react";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import Login from "../../components/Login/Login";
import Home from "../Home/Home";
import PrivateRoute from "./PrivateRoute";
import {AppContext} from "../../context/AppContext";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {LoggingContext} from "../../context/LoggingContext";
import TestPage from "../TestPage/TestPage";
import Sleep from "../Sleep/Sleep";
import VoiceDemo from "../../components/VoiceDemo/VoiceDemo";

const RoutingBody = (props) => {

    let appContext = useContext(AppContext);

    let mongoHook = appContext.mongoHook;

    const voiceContext = useContext(VoiceCommandsContext).SpeechRecognitionHook;

    const loggingContext = useContext(LoggingContext).logger;

    const history = useHistory();

    const homePageCommand = {
        command: ["Mirror mirror on the wall Go to home page", "mirror mirror on the wall go home", "mirror mirror on the wall wake up"],
        answer: "Routing to Home Page",
        func: () => {
            loggingContext.addLog("Voice Command: Routed to Home Page");
            history.push("/");
        }
    };

    const testPageCommand = {
        command: "Mirror mirror on the wall Go to test page",
        answer: "Routing to Test Page",
        func: () => {
            loggingContext.addLog("Voice Command: Routed to Test Page");
            history.push("/test");
        }
    };

    const sleepPageCommand = {
        command: ["Mirror mirror on the wall Go to sleep"],
        answer: "Going to sleep",
        func: () => {
            loggingContext.addLog("Voice Command: Going to sleep");
            history.push("/sleep")
        }
    };

    const logoutCommand = {
        command: ["mirror mirror on the wall logout", "mirror mirror logout"],
        answer: "Logging out",
        func: () => {
            loggingContext.addLog("Voice Command: Logging out")
            appContext.mongoHook.logout()
        }
    };

    const voiceDemoPageCommand = {
        command: ["Mirror mirror on the wall Go to voice demo page"],
        answer: "Going to voice demo",
        func: () => {
            loggingContext.addLog("Voice Command: Going to voice demo");
            history.push("/voice_demo")
        }
    };

    const gestureDemoPageCommand = {
        command: ["Mirror mirror on the wall Go to gesture demo page",  "Mirror mirror go to gesture demo page"],
        answer: "Going to gesture demo page",
        func: () => {
            loggingContext.addLog("Voice Command: Going to gesture demo page");
            history.push("/")// left it blank  for now will need a PrivateRoute for it
        }
    };

    useEffect(() => {
        voiceContext.addCommand(homePageCommand);
        voiceContext.addCommand(testPageCommand);
        voiceContext.addCommand(sleepPageCommand);
        voiceContext.addCommand(logoutCommand);
        voiceContext.addCommand(voiceDemoPageCommand);
        voiceContext.addCommand(gestureDemoPageCommand);
    }, []);

    return (
        <Switch>
            <Route exact path="/login">
                <Login mongoHook={mongoHook}/>
            </Route>
            <PrivateRoute exact path="/" mongoHook={mongoHook}>
                <Home/>
            </PrivateRoute>
            <PrivateRoute exact path="/test" mongoHook={mongoHook}>
                <TestPage/>
            </PrivateRoute>
            <PrivateRoute exact path="/voice_demo" mongoHook={mongoHook}>
                <VoiceDemo/>
            </PrivateRoute>
            <Route exact path="/sleep">
                <Sleep/>
            </Route>
        </Switch>
    )

};

const Routing = (props) => {
    return (
        <Router>
            <RoutingBody/>
        </Router>
    )
};

export default Routing;