import React, {useState, useEffect, useContext, Fragment} from "react";
import ReactDOM from 'react-dom';
import {Input, Label, Button, Row, Col} from 'reactstrap';
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import axios from 'axios';
import AnalogClock from "analog-clock-react";



const Inspiration = (props)=>{
    //const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
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




//JSON suggested version
// const getQuote =()=>{
// fetch("https://type.fit/api/quotes")
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//   });
// } ;


//functioning version
useEffect(() => {

    axios.get("https://type.fit/api/quotes")
    .then(responce => {
        const quote = responce.data; 
        console.log(quote)
        setQuote(quote) ;
    });
},[]);

    return (
        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>Inspiration</h1>
            <><AnalogClock {...options} /></>
            <Col>
            <h1></h1>
            </Col>
            <Col>
                <h1>{JSON.stringify(quote[1])}</h1>
                {/* <h1>{quote? quote:"Loading ..."}</h1> */}
            </Col>

        </div>

    )
};
export default Inspiration;