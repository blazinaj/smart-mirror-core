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
import GestureDemo from "../GestureDemo/GestureDemo";
import FaceDemo from "../FaceDemo/FaceDemo";

const RoutingBody = (props) => {

    let appContext = useContext(AppContext);

    let mongoHook = appContext.mongoHook;

    const voiceContext = useContext(VoiceCommandsContext).SpeechRecognitionHook;

    const loggingContext = useContext(LoggingContext).logger;

    const history = useHistory();

    const homePageCommand = {
        command: ["Mirror mirror on the wall Go to home page", "mirror mirror on the wall go home", "mirror mirror on the wall wake up", "Mirror mirror Go to home page", "mirror mirror go home", "mirror mirror wake up"],
        answer: "Routing to Home Page",
        func: () => {
            loggingContext.addLog("Voice Command: Routed to Home Page");
            history.push("/");
        }
    };

    const testPageCommand = {
        command: ["Mirror mirror on the wall Go to test page", "Mirror mirror Go to test page"],
        answer: "Routing to Test Page",
        func: () => {
            loggingContext.addLog("Voice Command: Routed to Test Page");
            history.push("/test");
        }
    };

    const sleepPageCommand = {
        command: ["Mirror mirror on the wall Go to sleep", "Mirror mirror Go to sleep"],
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
            //history.push("/");
        }
    };

    const voiceDemoPageCommand = {
        command: ["Mirror mirror on the wall Go to voice demo page", "Mirror mirror Go to voice demo page"],
        answer: "Going to voice demo",
        func: () => {
            loggingContext.addLog("Voice Command: Going to voice demo");
            history.push("/voice_demo")
        }
    };

    const faceDemoPageCommand = {
        command: ["Mirror mirror on the wall Go to face demo page", "mirror mirror go to face demo page"],
        answer: "Going to face demo",
        func: () => {
            loggingContext.addLog("Voice Command: Going to face demo");
            history.push("/face_demo")
        }
    };

    const gestureDemoPageCommand = {
        command: ["Mirror mirror on the wall go to gesture demo page",  
        "Mirror mirror go to gesture demo page", 
        "Mirror mirror go to motion demo", 
        "mirror mirror go to hand motion"],
        answer: "Alright I will take you to gesture demo page",
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
        voiceContext.addCommand(faceDemoPageCommand);
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
            {/* Art added this gesture_demo path for now but not sure it its set up correctly */}
            <PrivateRoute exact path="/gesture_demo" mongoHook={mongoHook}>
                <GestureDemo/>
            </PrivateRoute>
             
            <PrivateRoute exact path="/face_demo" mongoHook={mongoHook}>
                <FaceDemo/>
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