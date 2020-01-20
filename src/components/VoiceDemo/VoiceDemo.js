import React, {useState, useEffect, useContext} from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {Input, Label, Button, Row, Col} from 'reactstrap';
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import Search from "./Search";

//Starting google image search PR.
const VoiceDemo = (props) => {

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const speechSynthesisHook = useSpeechSynthesis();
    const [showJoke, setShowJoke] = useState(true);
    const [joke, setJoke] = useState("");

    const whoIsTheManCommand = {
        command: ["mirror mirror on the wall who is the man", "mirror mirror who is the man"],
        answer: "Jeff is the man"
    };

    const showJokeText = {
        command: ["mirror mirror toggle joke text"],
        answer: "toggled",
        func: () => {
            showJoke ? setShowJoke(false) : setShowJoke(true);
        }
    };

    const tellJoke = {
        command: ["mirror mirror on the wall tell me a joke", "mirror mirror tell me a joke"],
        answer: "",
        func: (command) => {
            getJoke();
        }
    };

    const imageSearch = {
        command: ["mirror mirror search for"],
        answer: "",
        func: (value) => {

            const searchForRegExp = /search for/i;
            let found = value.match(searchForRegExp);
            //alert(value.length);
            //console.log(found.index);
            alert(value.substring(24)) //"mirror mirror search for puppies" is 24 characters long
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
                    setJoke(myJson.joke);
                } else {
                    //alert(myJson.setup + " " +  myJson.delivery)
                    const twoPartJoke = myJson.setup + myJson.delivery;
                    speechSynthesisHook.speak(twoPartJoke)
                    setJoke(twoPartJoke);
                }
            });
    }

    useEffect(() => {
        SpeechRecognitionHook.addCommand(whoIsTheManCommand);
        SpeechRecognitionHook.addCommand(tellJoke);
        SpeechRecognitionHook.addCommand(showJokeText);
        SpeechRecognitionHook.addCommand(imageSearch);
    }, []);


    return (

        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>Voice Demo Page</h1>
            <>
                {
                    SpeechRecognitionHook.displayTranscript
                }
            </>
            <Search/>
            <Col>
                <Row>
                    <Col lg={3}>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Example Voice Commands:
                            </h4>
                            <h6 style={{color: "white"}}>"Mirror Mirror tell me a joke."</h6>
                            <h6 style={{color: "white"}}>"Mirror Mirror who is the man?"</h6>
                            <h6 style={{color: "white"}}>"Mirror Mirror toggle joke text."</h6>
                        </Row>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Other info:
                            </h4>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <div style={{height: "50vh", margin: "auto auto", background: "black"}}>
                            <h2 style={{color: "white"}}>Joke</h2>
                            <h3 style={{color: "white"}}>{showJoke && joke}</h3>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Voice command and answer:
                            </h4>
                            <h5>{}</h5>
                        </Row>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Fill stuff in:
                            </h4>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </div>
    );
};
export default VoiceDemo;