import React, {useState, useEffect, useContext} from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {Input, Label, Button, Row, Col} from 'reactstrap';
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import {useModal} from "../../hooks/useModal";
import Search from "../../hooks/useImageSearch";

const VoiceDemo = (props) => {

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const speechSynthesisHook = useSpeechSynthesis();
    const [showJoke, setShowJoke] = useState(true);
    const [joke, setJoke] = useState("");
    const [query, setQuery] = useState("");
    const search = Search();

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
    }, []);



    return (

        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>🎤 Voice Demo Page</h1>
            <>
                {
                    SpeechRecognitionHook.displayTranscript
                }
            </>
            <Col>
                <Row>
                    <Col lg={6}>

                        <Row style={{height: "25vh", align:"top"}}>

                            <pre>
                               <h2 style={{color: "white"}}> Example Voice Commands: </h2>
                               <h4 style={{color: "white"}}>"Mirror Mirror tell me a joke."</h4>
                               <h4 style={{color: "white"}}>"Mirror Mirror who is the man?"</h4>
                               <h4 style={{color: "white"}}>"Mirror Mirror search for puppies."</h4>
                            </pre>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <Row style={{height: "25vh"}}>
                            <div style={{height: "25vh", margin: "auto auto", background: "black"}}>
                                <h2 style={{color: "white"}}>Joke</h2>
                                <h3 style={{color: "white"}}>{showJoke && joke}</h3>
                            </div>
                        </Row>
                    </Col>

                        <Row style={{height: "75vh"}}>
                            {search.mySearchBox}
                            {search.renderSearchResults()}
                        </Row>

                </Row>
            </Col>
        </div>
    );
};
export default VoiceDemo;