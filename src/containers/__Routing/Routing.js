import React, {useEffect, useContext, useState} from "react";
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
import Devotions from "../../components/Devotions/Devotions";
import GesturePaintDemo from "../GestureDemo/GesturePaintDemo";
import GestureClickMeGame from "../GestureDemo/GestureClickMeGame";
import {useGreetingMessage} from "../../hooks/useGreetingMessage";
import HelpPage from "../HelpPage/HelpPage";
import WikipediaSearchPage from "../Wikipedia/WikipediaSearchPage";
import GestureShowHands from "../GestureDemo/GestureShowHands";
import Header from "../Home/Header";
import RussianDemoPage from "../RussianDemoPage/RussianDemoPage";
import FrenchDemoPage from "../FrenchDemoPage/FrenchDemoPage";
import GestureDemo from "../GestureDemo/GestureDemo";
import SnowStorm from 'react-snowstorm';

const RoutingBody = (props) => {

    let appContext = useContext(AppContext);

    let {webcamTools} = appContext;

    let mongoHook = appContext.mongoHook;

    const voiceContext = useContext(VoiceCommandsContext).SpeechRecognitionHook;

    const loggingContext = useContext(LoggingContext).logger;

    const history = useHistory();

    const greetingHook = useGreetingMessage();

    const registerVoiceModal = useModal("One moment, logging you in...", "Registration");
    const pinDisplayModal = useModal(<a> WRITE THIS NUMBER DOWN!<br/><br/>
            <h2 style={{color: "red"}}>{mongoHook.pin}</h2><br/>
            This will be how you login to your account.<br/>
            Login using the Pin button on the login screen on any PC or Mobile device.<br/><br/>
            Otherwise make sure to setup your face login to login hands free!<br/><br/>
            {/*This will only be shown to you once, and will be deleted within ? days, so remember to change your email and password!<br /><br />*/}
            <h5>Do you want to set up Face Login? Say: </h5><h4 style={{color: "blue"}}>🎤 Mirror mirror go to my
                account</h4>
            <h5>When finished say: </h5><h4 style={{color: "blue"}}>🎤 Mirror mirror hide message</h4></a>,
        `IMPORTANT - PIN: ${mongoHook.pin}`);

    const [isRaining, setIsRaining] = useState(false);
    const [isSnowing, setIsSnowing] = useState(false);
    const [weatherAnimationsEnabled, setWeatherAnimationsEnabled] = useState(false);
    const [weatherAnimationsCheck, setWeatherAnimationsCheck] = useState(false);

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
        command: ["mirror mirror on the wall logout", "mirror mirror logout", "mirror mirror log me out"],
        answer: "Logging out",
        func: () => {
            loggingContext.addLog("Voice Command: Logging out");
            appContext.mongoHook.logout();
        }
    };

    const devotionsCommand = {
        command: ["mirror mirror go to devotion", "mirror mirror I want to see devotion", "mirror mirror take me to devotion"],
        answer: "Alright! Ill take you to devotion",
        func: () => {
            loggingContext.addLog("Voice Command: Alright! Ill take you to devotion")
            history.push("/devotions")
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
        command: ["Mirror mirror on the wall register new account", "Mirror mirror register new account"],
        answer: "Registering new account, one moment!",
        func: (async () => {
            webcamTools.setDisableWebCam(true);
            mongoHook.logout();
            await mongoHook.registerWithVoice()
                .then(() => {
                    registerVoiceModal.setModalIsOpen(true);
                    loggingContext.addLog("PinChanged? : " + mongoHook.pin);
                    setTimeout((() => {
                        history.push("/");
                        registerVoiceModal.setModalIsOpen(false);
                        webcamTools.setDisableWebCam(false);
                    }), 6000);
                    pinDisplayModal.setModalIsOpen(true);
                });
        })
    };

    const closePinCommand = {
        command: ["Mirror mirror hide message", "Mirror mirror I promise I actually wrote it down"],
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

    const gestureDemoPaintPageCommand = {
        command: ["mirror mirror I want to paint"],
        answer: "Alright I will take you to paint page",
        func: () => {
            loggingContext.addLog("Voice Command: Going to gesture demo page");
            history.push("/gesture_paint")
        }
    };

    const gestureShowHandsPageCommand = {
        command: ["mirror mirror detect my hand"],
        answer: "Hold on, detecting your hands",
        func: () => {
            loggingContext.addLog("Voice Command: Going to gesture demo page");
            history.push("/gesture_show_hands")
        }
    };

    const gestureMouseDemoPageCommand = {
        command: ["mirror mirror I want to play a game"],
        answer: "Sounds good! I will take you to the Play Click game",
        func: () => {
            loggingContext.addLog("Voice Command: Going to the Play Click game");
            history.push("/gesture_click_me_game")
        }
    };

    const goBackCommand = {
        command: ["mirror mirror I want to go back", "mirror mirror go back", "mirror mirror go to previous page"],
        answer: "Alright taking you back!",
        func: () => {
            loggingContext.addLog("Voice Command: Alright taking you back");
            history.goBack();
        }
    };

    const helpPageCommand = {
        command: ["mirror mirror help page", "mirror mirror on the wall help page", "mirror mirror go to help page", "mirror mirror take me to help page",
            "mirror mirror I have fallen and need a help page"],
        answer: "Help is on it's way!",
        func: () => {
            loggingContext.addLog("Voice Command: Going to help page");
            history.push("/help_page")
        }
    };

    const russianDemoPage = {
        command: ["mirror mirror go to Russian Demo page", "mirror mirror on the wall go to Russian Demo page"],
        answer: "Let me learn some Russian!",
        func: () => {
            loggingContext.addLog("Voice Command: Going to Russian page");
            history.push("/russian_page");
        }
    };

    const searchWikipediaCommand = {
        command: ["mirror mirror wikipedia page"],
        answer: "Moving to wikipedia page!",
        func: () => {
            loggingContext.addLog("Voice Command: Going to search wikipedia page");
            history.push("/search_wikipedia")
        }
    };

    const frenchDemoPage = {
        command: ["mirror mirror go to French Demo page", "mirror mirror on the wall go to French Demo page"],
        answer: "Let's party with the French",
        func: () => {
            loggingContext.addLog("Voice Command: Going to French page");
            history.push("/french_page");
        }
    };

    const swipeDemoPage = {
        command: ["mirror mirror swipe demo page"],
        answer: "Moving to swipe demo page!",
        func: () => {
            loggingContext.addLog("Voice Command: Going to swipe demo page");
            history.push("/swipe_demo")
        }
    };

    const rainCommand = {
        command: ["mirror mirror rain"],
        answer: "Raining",
        func: () => {
            setIsSnowing(false);
            setIsRaining(true);
        }
    };

    const stopRainCommand = {
        command: ["mirror mirror stop raining"],
        answer: "Raining",
        func: () => {
            setIsRaining(false);
        }
    };

    const snowCommand = {
        command: ["mirror mirror snow"],
        answer: "Snowing",
        func: () => {
            setIsRaining(false);
            setIsSnowing(true);
        }
    };

    const stopSnowCommand = {
        command: ["mirror mirror stop snowing"],
        answer: "Snowing",
        func: () => {
            setIsSnowing(false);
        }
    };

    const enableWeatherAnimationsCommand = {
        command: ["mirror mirror enable weather animation"],
        answer: "Enabling weather animations",
        func: () => {
            setWeatherAnimationsEnabled(true);
        }
    };

    const disableWeatherAnimationsCommand = {
        command: ["mirror mirror disable weather animation"],
        answer: "Disabling weather animations",
        func: () => {
            setWeatherAnimationsEnabled(false);
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
        voiceContext.addCommand(gestureDemoPaintPageCommand);
        voiceContext.addCommand(gestureMouseDemoPageCommand);
        voiceContext.addCommand(faceDemoPageCommand);
        voiceContext.addCommand(goBackCommand);
        voiceContext.addCommand(devotionsCommand);
        voiceContext.addCommand(helpPageCommand);
        voiceContext.addCommand(searchWikipediaCommand);
        voiceContext.addCommand(gestureShowHandsPageCommand);
        voiceContext.addCommand(russianDemoPage);
        voiceContext.addCommand(frenchDemoPage);
        voiceContext.addCommand(swipeDemoPage);
        voiceContext.addCommand(rainCommand);
        voiceContext.addCommand(stopRainCommand);
        voiceContext.addCommand(snowCommand);
        voiceContext.addCommand(stopSnowCommand);
        voiceContext.addCommand(enableWeatherAnimationsCommand);
        voiceContext.addCommand(disableWeatherAnimationsCommand);
    }, []);

    useEffect(() => {
        loggingContext.addLog("Route UseEffect");
        if (mongoHook.firstName !== "" && mongoHook.lastName !== "" && mongoHook.lastName !== "user") {
            console.log("Name");
            console.log(mongoHook.firstName + " " + mongoHook.lastName);
            greetingHook.changeName(`${mongoHook.firstName} ${mongoHook.lastName}`);
        } else if (mongoHook.firstName !== "") {
            console.log("Name");
            console.log(mongoHook.firstName);
            greetingHook.changeName(`${mongoHook.firstName}`);
        } else {
            greetingHook.changeName("");
        }
    }, [mongoHook.firstName && mongoHook.lastName]);

    // Triggers weather animation
    useEffect(() => {
        setTimeout(() => setWeatherAnimationsCheck(weatherAnimationsCheck => !weatherAnimationsCheck), 300000);
        async function fetchData() {
            const res = await fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + 99004 + ",us&units=imperial&APPID=91057845b758d5c8a2aa21315a9ae881");
            res
                .json()
                .then(res => {
                    let weather = res.weather[0].main;
                    loggingContext.addLog(weather);
                    switch(weather){
                        case "Rain": {
                            setIsSnowing(false);
                            setIsRaining(true);
                            break;
                        }
                        case "Snow": {
                            setIsRaining(false);
                            setIsSnowing(true);
                            break;
                        }
                        case "Clear": {
                            setIsRaining(false);
                            setIsSnowing(false);
                            break;
                        }
                        default: break;
                    }
                })
                .catch(err => loggingContext.addLog(err));
        }
        if(weatherAnimationsEnabled){
            fetchData();
        }
        else {
            setIsRaining(false);
            setIsSnowing(false);
        }
    }, [weatherAnimationsEnabled, weatherAnimationsCheck]);

    return (
        <div>
            {isRaining &&
            <SnowStorm followMouse={false} flakesMax={100} vMaxY={35} vMaxX={5.5} snowCharacter={"•"} snowStick={false}
                       snowColor={"blue"}/>}
            {isSnowing && <SnowStorm followMouse={false} flakesMax={48} vMaxY={3} snowCharacter={"*"}/>}
            {mongoHook.isLoggedIn && <Header history={history}/>}
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
                <PrivateRoute exact path="/gesture_paint" mongoHook={mongoHook}>
                    <GesturePaintDemo/>
                </PrivateRoute>
                <PrivateRoute exact path="/gesture_click_me_game" mongoHook={mongoHook}>
                    <GestureClickMeGame/>
                </PrivateRoute>
                <PrivateRoute exact path="/gesture_show_hands" mongoHook={mongoHook}>
                    <GestureShowHands/>
                </PrivateRoute>
                <PrivateRoute exact path="/devotions" mongoHook={mongoHook}>
                    <Devotions/>
                </PrivateRoute>
                <PrivateRoute exact path="/face_demo" mongoHook={mongoHook}>
                    <FaceDemo/>
                </PrivateRoute>
                <PrivateRoute exact path="/russian_page" mongoHook={mongoHook}>
                    <RussianDemoPage/>
                </PrivateRoute>
                <PrivateRoute exact path="/french_page" mongoHook={mongoHook}>
                    <FrenchDemoPage/>
                </PrivateRoute>
                <PrivateRoute exact path="/search_wikipedia" mongoHook={mongoHook}>
                    <WikipediaSearchPage/>
                </PrivateRoute>
                <Route exact path="/sleep">
                    <Sleep/>
                </Route>
                <Route exact path="/help_page">
                    <HelpPage/>
                </Route>
                <Route exact path="/swipe_demo">
                    <GestureDemo/>
                </Route>
            </Switch>
        </div>
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