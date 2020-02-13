import React, {useState, useEffect, useContext, Fragment} from "react";
import ReactDOM from 'react-dom';
import {Input, Label, Button, Row, Col} from 'reactstrap';
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import axios from 'axios';
import AnalogClock from "analog-clock-react";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";





const Inspiration = (props)=>{

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const [quote,setQuote] =  useState(null);
    const [readText, setReadText] = useState( null);
    const speechSynthesisHook = useSpeechSynthesis();

    //NEEDS WORK
    const readCommand = {
        command: ["mirror mirror read my quote"],
        answer: "ok reading again!",
        func: () => readMyQuote(JSON.stringify(readText))
    };
    

    const [quote,setQuote] =  useState(null);
    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const [readText, setReadText] = useState( null);
    const speechSynthesisHook = useSpeechSynthesis();

    //NEEDS WORK
    const readCommand = {
        command: ["mirror mirror read my quote"],
        answer: "ok reading again!",
        func: () => readMyQuote(JSON.stringify(readText))
    };

// clock widget colors
    let options = {
        width: "200px",
        border:  true,
        borderColor: "#2e2e2e",
        baseColor: "black",//"#17a2b8",
        centerColor: "#459cff",
        handColors: {
            second: "#d81c7a",
            minute: "#fff",
            hour: "#fff"
        }
    };

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
//NEEDS WORK
    function readMyQuote(readText){
        console.log(readText)
        speechSynthesisHook.speak(readText)
    }


    const getRandomQuote=() => {
        axios.get("https://type.fit/api/quotes")

        // axios.get("http://quotes.rest/qod.json?category=funny") // only 10 per hr
        .then(responce => {
            const myJSON = responce.data;
            const qindex = getRandomInt(myJSON.length);
            const sayThis = JSON.stringify(myJSON[(qindex)].text + " said " +myJSON[(qindex)].author )
            setReadText(JSON.stringify(myJSON[(qindex)].text + " said " +myJSON[(qindex)].author ));
            //console.log(myJSON)
            //console.log(sayThis)
            speechSynthesisHook.speak(sayThis)// TEMP for voice read
            setQuote(myJSON[(qindex)].text +' - '+ myJSON[(qindex)].author) ;
        });
    }


// i need this for categorized fetch of quotes
//"categories": {
//             "inspire": "Inspiring Quote of the day",
//             "management": "Management Quote of the day",
//             "sports": "Sports Quote of the day",
//             "life": "Quote of the day about life",
//             "funny": "Funny Quote of the day",
//             "love": "Quote of the day about Love",
//             "art": "Art quote of the day ",
//             "students": "Quote of the day for students"
//functioning version

// useEffect(() => { 
//     //axios.get("https://type.fit/api/quotes")

//     axios.get("http://quotes.rest/qod.json?category=funny") // only 10 per hr
//     .then(responce => {
//         const myJASON = responce.data;
//         console.log(myJASON)
//         console.log(myJASON.contents.quotes[0].quote +" "+ myJASON.contents.quotes[0].author)

//         setQuote(myJASON.contents.quotes[0].quote +'\n'+ myJASON.contents.quotes[0].author) ;
//     });
// },[]);

    useEffect(() => {
        getRandomQuote()
        //NEED WORK
        // readMyQuote(JSON.stringify(readText))
    },[]);

    useEffect(() => {
        SpeechRecognitionHook.addCommand(readCommand);
        return () => {
            SpeechRecognitionHook.removeCommand(readCommand);
        }
    }, []);

    return (
        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>Inspiration</h1>
            <><AnalogClock {...options} /></>
            <Col>
                <h1></h1>
            </Col>
            <Col>
                <h1>{JSON.stringify(quote)}</h1>
                {/* <h1>{quote? quote:"Loading ..."}</h1> */}
            </Col>

        </div>

    )
};
export default Inspiration;