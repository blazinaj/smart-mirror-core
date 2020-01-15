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
import {useModal} from "../../hooks/useModal";
import FaceDemo from "../FaceDemo/FaceDemo";

const RoutingBody = (props) => {

    let appContext = useContext(AppContext);

    let mongoHook = appContext.mongoHook;

    const voiceContext = useContext(VoiceCommandsContext).SpeechRecognitionHook;

    const loggingContext = useContext(LoggingContext).logger;

    const history = useHistory();

    const registerVoiceModal = useModal("One moment, logging you in...", "Registration");
    const pinDisplayModal = useModal(<a> WRITE THIS NUMBER DOWN!<br /><br />
                                    <h2 style={{color: "red"}}>{mongoHook.pin}</h2><br />
                                    This will be how you login next time to be able to change your info.<br />
                                    Login using the Pin button on the login screen on any PC or Mobile device.<br /><br />
                                    This will only be shown to you once, and will be deleted within ? days, so remember to change your email and password!<br /><br />
                                    <h5>When finished say: </h5><h4 style={{color: "blue"}}>Mirror mirror close</h4></a>,
            `IMPORTANT - PIN: ${mongoHook.pin}`);

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
            loggingContext.addLog("Voice Command: Logging out");
            mongoHook.logout()
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

    const registerAccountCommand = {
        command: ["Mirror mirror on the wall register new account"],
        answer: "Registering new account, one moment!",
        func: (async () => {
            mongoHook.logout();
            await mongoHook.registerWithVoice()
                .then(() => {
                    registerVoiceModal.setModalIsOpen(true);
                    loggingContext.addLog("PinChanged? : " + mongoHook.pin);
                    setTimeout((() => {
                        history.push("/");
                        registerVoiceModal.setModalIsOpen(false);
                    }),6000);
                    pinDisplayModal.setModalIsOpen(true);
                });
        })
    };

    const closePinCommand = {
        command: ["Mirror mirror close"],
        answer: "Enjoy your New Account!",
        func: () => {
            pinDisplayModal.setModalIsOpen(false);
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

    useEffect(() => {
        voiceContext.addCommand(homePageCommand);
        voiceContext.addCommand(testPageCommand);
        voiceContext.addCommand(sleepPageCommand);
        voiceContext.addCommand(logoutCommand);
        voiceContext.addCommand(voiceDemoPageCommand);
        voiceContext.addCommand(registerAccountCommand);
        voiceContext.addCommand(closePinCommand);
        voiceContext.addCommand(faceDemoPageCommand);
    }, []);

    return (
        <Switch>
            <Route exact path="/login">
                {
                    registerVoiceModal.display
                }
                <Login mongoHook={mongoHook}/>
            </Route>
            <PrivateRoute exact path="/" mongoHook={mongoHook}>
                {
                    pinDisplayModal.display
                }
                <Home/>
            </PrivateRoute>
            <PrivateRoute exact path="/test" mongoHook={mongoHook}>
                <TestPage/>
            </PrivateRoute>
            <PrivateRoute exact path="/voice_demo" mongoHook={mongoHook}>
                <VoiceDemo/>
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