import React, {useState, useEffect, useContext, Fragment} from "react";
import ReactDOM from 'react-dom';
import {Input, Label, Button, Row, Col} from 'reactstrap';
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import axios from 'axios';
import AnalogClock from "analog-clock-react";





const Devotions = (props)=>{
    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const [quote,setQuote] =  useState(null); 
    
    const refreshPageCommand = {
        command: ["mirror mirror change quote", "mirror mirror change verse","mirror mirror change devotion", "Mirror mirror give me a new verse"],
        answer: "",
        // func: () => window.location.reload()
        func: () => getQuote()
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

   //Json vertion
   /*
    const getRandomQuote = () => {
        fetch("https://beta.ourmanna.com/api/v1/get/?format=text&order=random")
        .then(response => console.log(JSON.stringify(response))
        .then(quotes =>{
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return quotes[randomIndex];
        }));
}
*/
const getQuote = () => {  
    axios.get("https://beta.ourmanna.com/api/v1/get/?format=text&order=random")  
    .then(responce => {  
    const quote = responce.data;  
    console.log(quote)  
    setQuote(quote) ;  
    })
}


useEffect(() => {
    getQuote()
},[]);

useEffect(() => {
    SpeechRecognitionHook.addCommand(refreshPageCommand);
}, []);

    return (
        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>DEVOTIONS</h1>
            <><AnalogClock {...options} /></>
            {/*<>{SpeechRecognitionHook.displayTranscript}</>
            */}
            <Col>
            <h1></h1>
            </Col>
            <Col>
                {/* <h1>{JSON.stringify(quote)}</h1> */}
                <h1>{quote? quote:"Loading ..."}</h1>
            </Col>
            <Col><h1> </h1>
                <h4> To reload say: "Mirror mirror give me a new verse"</h4>
            </Col>

        </div>

    )
};
export default Devotions;