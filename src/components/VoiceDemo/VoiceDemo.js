import React, {useState, useEffect, useContext} from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {Input, Label, Button} from 'reactstrap';
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";


const VoiceDemo = (props) => {

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const speechSynthesisHook = useSpeechSynthesis();

    const whoIsTheManCommand = {
        command: ["mirror mirror on the wall who is the man", "mirror mirror who is the man"],
        answer: "Stu is the man"
    };

    const tellJoke = {
        command: ["mirror mirror on the wall tell me a joke", "mirror mirror tell me a joke"],
        answer: "",
        func: (command) => {
            getJoke();
        }
    };

    const getJoke = () => {
        fetch('https://sv443.net/jokeapi/category/Programming?blacklistFlags=nsfw,religious,political"format=json')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
                // alert(myJson.joke);
                if (myJson.type === "single") {
                    // alert("Single " + myJson.joke)
                    speechSynthesisHook.speak(myJson.joke)
                } else {
                    //alert(myJson.setup + " " +  myJson.delivery)
                    const twoPartJoke = myJson.setup + myJson.delivery;
                    speechSynthesisHook.speak(twoPartJoke)
                }
            });
    }

    useEffect(() => {
        SpeechRecognitionHook.addCommand(whoIsTheManCommand);
        SpeechRecognitionHook.addCommand(tellJoke);
    }, []);


    return (

        <div style={{background: "black", height: "100vh"}}>
            <h1>Voice Demo Page</h1>
            <>
                {
                    SpeechRecognitionHook.displayTranscript
                }
            </>
            <Button onClick={() => getJoke()}>Search</Button>
        </div>
    );
};
export default VoiceDemo;