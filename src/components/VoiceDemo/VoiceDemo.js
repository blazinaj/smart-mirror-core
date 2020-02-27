import React, {useState, useEffect, useContext} from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {Input, Label, Button, Row, Col} from 'reactstrap';
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import {useModal} from "../../hooks/useModal";
import Search from "../../hooks/useImageSearch";
import {AnimateOnChange} from 'react-animation'

const VoiceDemo = (props) => {

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const speechSynthesisHook = useSpeechSynthesis();
    const search = Search();

    const [showJoke, setShowJoke] = useState(true);
    const [joke, setJoke] = useState("");
    const [query, setQuery] = useState("");
    const [showingCommand, setShowingCommand] = useState("tell me a joke");

    const whoIsTheManCommand = {
        command: ["mirror mirror on the wall who is the man", "mirror mirror who is the man"],
        answer: "Jeff is the man"
    };

    const StuCommand = {
        command: ["mirror mirror on the wall who's the prettiest of them all"],
        answer: "Stu Steiner of course!"
    };

    const showJokeText = {
        command: ["mirror mirror toggle joke text"],
        answer: "toggled",
        func: () => {
            setShowJoke(showJoke => !showJoke);
        }
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
                    setJoke(myJson.joke);
                } else {
                    //alert(myJson.setup + " " +  myJson.delivery)
                    const twoPartJoke = myJson.setup + " " + myJson.delivery;
                    speechSynthesisHook.speak(twoPartJoke);
                    setJoke(twoPartJoke);
                }
            });
    }

    const imageSearch = {
        //example get request https://pixabay.com/api/?key=12413278-79b713c7e196c7a3defb5330e&q=puppies&page=1
        //API key is from the sample code
        command: ["mirror mirror search for"],
        answer: "",
        func: (value) => {

            //const searchForRegExp = /search for/i;
            //let found = value.match(searchForRegExp);
            //alert(value.length);
            //console.log(found.index);
            //alert(value.substring(24))
            setQuery(value.substring(24)); //"mirror mirror search for puppies" is 24 characters long
            search.searchFor(value.substring(24));

        }
    };

    useEffect(() => {
        SpeechRecognitionHook.addCommand(whoIsTheManCommand);
        SpeechRecognitionHook.addCommand(tellJoke);
        SpeechRecognitionHook.addCommand(showJokeText);
        SpeechRecognitionHook.addCommand(imageSearch);
        SpeechRecognitionHook.addCommand(StuCommand);
        return () => {
            SpeechRecognitionHook.removeCommand(whoIsTheManCommand);
            SpeechRecognitionHook.removeCommand(tellJoke);
            SpeechRecognitionHook.removeCommand(showJokeText);
            SpeechRecognitionHook.removeCommand(imageSearch);
            SpeechRecognitionHook.removeCommand(StuCommand);
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            switch (showingCommand) {
                case "tell me a joke": {
                    setShowingCommand("who is the man?");
                    break;
                }
                case "who is the man?": {
                    setShowingCommand("search for puppies");
                    break;
                }
                case "search for puppies": {
                    setShowingCommand("tell me a joke");
                    break;
                }
                default:
                    break;
            }
        }, 5000)
    }, [showingCommand]);

    return (
        <div style={{height: "100vh", background: "black", paddingLeft: "5vw", paddingRight: "5vw"}}>
            <h1>🎤 Voice Demo Page</h1>
            <>
                {
                    SpeechRecognitionHook.displayTranscript
                }
            </>
            <h5>
                Try... "Mirror mirror
                <a> </a>
                <AnimateOnChange
                    animationIn="bounceIn"
                    animationOut="bounceOut"
                    durationOut={500}
                >
                    {showingCommand}
                </AnimateOnChange>
                "
            </h5>
            <Col>
                <Row>
                    <Col>
                        <h3>Joke:</h3>
                    </Col>
                    <Col>
                        <h3>Searching for</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        { showJoke ?
                            joke ?
                                <h3 style={{outline: "1px solid white"}}>
                                    <label style={{padding: "1px"}}>
                                        {joke}
                                    </label>
                                </h3>
                                :
                                <h3 style={{outline: "1px solid white"}}>
                                    <label style={{padding: "1px"}}>
                                        N/A
                                    </label>
                                </h3>
                            :
                            <h3 style={{outline: "1px solid white"}}>
                                <label style={{padding: "1px"}}>
                                    Joke text disabled
                                </label>
                            </h3>
                        }
                    </Col>
                    <Col>
                        <h3 style={{alignItems: "right"}}>
                            { search.query ?
                                <div style={{outline: "1px solid white"}}>
                                    <label style={{padding: "1px"}}>{search.query}</label>
                                </div>
                                :
                                <div style={{outline: "1px solid white"}}>
                                    <label style={{padding: "1px"}}>N/A</label>
                                </div>
                            }
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Row>
                        {search.renderSearchResults()}
                    </Row>
                </Row>
            </Col>
        </div>
    );
};
export default VoiceDemo;