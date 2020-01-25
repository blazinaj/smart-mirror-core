import React, {useState, useEffect, useContext, Fragment} from "react";
import ReactDOM from 'react-dom';
import {Input, Label, Button, Row, Col} from 'reactstrap';
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import AnalogClock from 'analog-clock-react';
import axios from 'axios';



const Devotions = (props)=>{
    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const [quote,setQuote] =  useState(null); 
    

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

   //J vertion
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

useEffect(() => {

    axios.get("https://beta.ourmanna.com/api/v1/get/?format=text&order=random")
    .then(responce => {
        const quote = responce.data; 
        console.log(quote)
        setQuote(quote) ;
        
        
    });
},[]);

function Quote (props){
    return <h1>{JSON.stringify(quote)}</h1>
}

function Loading (props){
    return <h1>Loading ... </h1>
}

function showQuote(props) {
    const isNull = (JSON.stringify(quote)== null)
    if (isNull) {
      return <Loading />;
    }
    return <Quote />;
  }


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
                {/* <h1>{JSON.stringify(quote)}</h1> */}
                {showQuote()}
            </Col>

        </div>

    )
};
export default Devotions;