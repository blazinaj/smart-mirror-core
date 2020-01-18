import React, {useEffect, useState, useContext} from "react"
import {AppContext} from "../context/AppContext";
import {VoiceCommandsContext} from "../context/VoiceCommandsContext";

export const useGreetingMessage = () => {

    let appContext = useContext(AppContext);
    let mongoHook = appContext.mongoHook;
    const voiceContext = useContext(VoiceCommandsContext);

    const [style, setStyle] = useState(0);

    const setName = (newName) => {

    };

    const greetingStyles = [
        // 0 Standard Greeting
        `Hello ${mongoHook.name}, welcome back!`,

        // 1 - English Greeting
        `Ello govenor ${mongoHook.name}, welcome back`

        // 2 - Norwegian Greeting

        // 3 - Scottish Greeting

        // n - .......
    ];

    useEffect(() => {
        // databaseHook.findOne("users", mongoHook.authenticatedUser.id);
        setStyle(Math.floor(Math.random() * Math.floor(2)));
        if(mongoHook.isLoggedIn === true){
            setTimeout(() => {
                console.log("MongoDB Name: " + mongoHook.name);
                voiceContext.SpeechRecognitionHook.speak(greetingStyles[style])
            }, 2000);
        }
    }, [mongoHook.name]);

    return{
        style,
        setStyle,
        //greetingMessage,
        greetingStyles,
        setName,
    }

};