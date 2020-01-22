import React, {useState, useEffect, useContext, Fragment} from "react";
import ReactDOM from 'react-dom';
import {Input, Label, Button, Row, Col} from 'reactstrap';
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import AnalogClock from 'analog-clock-react';
import axios from 'axios';



const Devotions = (props)=>{
    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const [quote,setQuote] =  useState(null); //1
    

// clock widget colors
    let options = {
        width: "300px",
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#17a2b8",
        centerColor: "#459cff",
        handColors: {
          second: "#d81c7a",
          minute: "#fff",
          hour: "#fff"
        }
    };

   //Jacobs vertion
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
// Anatolys vertion
useEffect(() => {

    axios.get("https://beta.ourmanna.com/api/v1/get/?format=text&order=random")
    .then(responce => {
        const quote = responce.data; 
        console.log(quote)
        setQuote(quote) ;
        //console.log("Todays Quotes :"+todaysQuote)
        
    });
},[]);


    return (
        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>DEVOTIONS</h1>
            <><AnalogClock {...options} /></>
            {/*<>
                {
                    SpeechRecognitionHook.displayTranscript
                }
            </>
            */}
            <Col>
                <h1>{JSON.stringify(quote)}</h1>
            </Col>

        </div>

    )
};
export default Devotions;