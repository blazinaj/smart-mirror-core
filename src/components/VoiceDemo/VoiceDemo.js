import React, {useState, useEffect, useContext, useRef} from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {Input, Label, Button, Row, Col} from 'reactstrap';
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import {useModal} from "../../hooks/useModal";
import Search from "../../hooks/useImageSearch";
import Webcam from "react-webcam";
//starting WIP PR
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

    const StuCommand = {
        command: ["mirror mirror on the wall who's the prettiest of them all"],
        answer: "Stu Steiner of course!"
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


    ////take picture section  //////////////

    const [imageState, setImageState] = useState(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const WebcamCapture = () => {
        const webcamRef = React.useRef(null);

        const capture = React.useCallback(
            () => {
                const imageSrc = webcamRef.current.getScreenshot();
                setImageState(imageSrc);
               // alert("image captured");
            },
            [webcamRef]
        );

        return (
            <>
                <Webcam
                    audio={false}
                    height={72}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={128}
                    videoConstraints={videoConstraints}
                />
                <button onClick={capture}>Capture photo</button>
                <img src={imageState}/>
            </>
        );
    };

    ////end of section ///////////////


    useEffect(() => {
        SpeechRecognitionHook.addCommand(whoIsTheManCommand);
        SpeechRecognitionHook.addCommand(tellJoke);
        SpeechRecognitionHook.addCommand(showJokeText);
        SpeechRecognitionHook.addCommand(imageSearch);
        SpeechRecognitionHook.addCommand(StuCommand);
    }, []);



    return (

        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>🎤 Voice Demo Page</h1>
            <>
                {
                    SpeechRecognitionHook.displayTranscript
                }
            </>
            <br/>
            <Col>
                <Row>
                    <Col lg={6}>
                        <Row style={{height: "20vh", align:"top"}}>
                            <WebcamCapture />

                            {/*
                             <Webcam
                                    audio={false}
                                    height={72}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width={128}
                                    videoConstraints={videoConstraints}
                                />
                                <button onClick={capture}>Capture photo</button>
                                */}

                            <pre>
                               <h2 style={{color: "white"}}> Example Voice Commands: </h2>
                               <h4 style={{color: "white"}}>"Mirror Mirror tell me a joke."</h4>
                               <h4 style={{color: "white"}}>"Mirror Mirror who is the man?"</h4>
                               <h4 style={{color: "white"}}>"Mirror Mirror search for puppies."</h4>
                            </pre>
                        </Row>
                    </Col>

                    <Col lg={6}>
                        <Row style={{height: "20vh", align:"center"}}>
                                <h2 style={{color: "white",align:"top"}}>Joke:</h2>
                                <h4 style={{color: "white", align:"top", }}>{showJoke && joke}</h4>
                        </Row>
                    </Col>

                    <Row style={{height: "20vh"}}>
                        {search.mySearchBox}
                        {search.renderSearchResults()}
                    </Row>

                </Row>
            </Col>
        </div>
    );
};
export default VoiceDemo;