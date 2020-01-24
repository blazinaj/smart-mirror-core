import React, {useEffect, useState, useContext} from "react"
import {AppContext} from "../context/AppContext";
import {VoiceCommandsContext} from "../context/VoiceCommandsContext";
import {LoggingContext} from "../context/LoggingContext";

export const useGreetingMessage = () => {

    const voiceContext = useContext(VoiceCommandsContext);
    const loggingContext = useContext(LoggingContext).logger;

    const [style, setStyle] = useState(0);
    const [name, setName] = useState("");

    const greetingStyles = [
        // 0 Standard Greeting
        `Hello ${name}, welcome back!`,

        // 1 - English Greeting
        `Ello govenor, how is ${name} today?`,

        // 2 - Irish Greeting
        `Top of the morning to you ${name}, how are you today lad?`

        // 3 - Scottish Greeting

        // n - .......
    ];

    const changeName = (newName) => {
        if(newName !== null){
            loggingContext.addLog("Changed Name For Greeting: " + newName.toString());
            setName(newName);
        }
    };

    // Randomized right now
    // Has potential to select specific greetings
    // User can add own?
    useEffect(() => {
        loggingContext.addLog("GreetingMessage: Name Changed");
        setStyle(Math.floor(Math.random() * greetingStyles.length));
        if(name !== ""){
            setTimeout(() => {
                loggingContext.addLog("Greeting User");
                voiceContext.SpeechRecognitionHook.speak(greetingStyles[style])
            }, 2000);
        }
    }, [name]);

    return{
        style,
        setStyle,
        greetingStyles,
        changeName
    }
};