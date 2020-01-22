import React, {useState, useEffect, useContext, Fragment} from "react";
import ReactDOM from 'react-dom';
import {Input, Label, Button, Row, Col} from 'reactstrap';
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import AnalogClock from 'analog-clock-react';



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

    function useQuote() {
        const [quote, setQuote] = React.useState(null)
      
        return quote
      }

    useEffect(()=>{
        fetch("https://beta.ourmanna.com/api/v1/get/?format=text&order=random")
        .then(response => response.json())
        .then(quotes =>{
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[randomIndex]);
        });
    },[]);

    /*fetchQuotes = () => {
        setState({...state, isFetching: true})
        fetch('https://beta.ourmanna.com/api/v1/get/?format=text&order=random')
          .then((response => {
              return response.json()
          })
          .then(result => setState({quotes: result, 
                                         isFetching: false}))
          .catch(e => console.log(e)));
      }
    */

    return (
        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>Devotions</h1>
            <>
                {
                    SpeechRecognitionHook.displayTranscript
                }
            </>
            <Col>
                <h2> For God so loved the world...</h2>
            </Col>
            <Col>
                <h2> John 3:16</h2>
            </Col>
            <Col>
                <AnalogClock {...options} />
            </Col>
            <Col>
               quote; 
        </Col>

        </div>

    )
};
export default Devotions;