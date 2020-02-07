import React, {useState, useEffect, useContext, Fragment} from "react";
import ReactDOM from 'react-dom';
import {Input, Label, Button, Row, Col} from 'reactstrap';
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import axios from 'axios';
import AnalogClock from "analog-clock-react";
// import Math from Math;




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


    useEffect(() => { 
        axios.get("https://type.fit/api/quotes")
    
        // axios.get("http://quotes.rest/qod.json?category=funny") // only 10 per hr
        .then(responce => {
            const myJASON = responce.data; 
            //console.log(myJASON)
            // console.log(Math.round(Math.random() * 1643)
            console.log(myJASON[1642].text +" "+ myJASON[1642].author)
                 
            setQuote(myJASON[1602].text +' - '+ myJASON[1602].author) ;
        });
    },[]);
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