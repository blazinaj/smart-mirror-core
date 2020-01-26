/**
 * Author: Jacob Blazina
 *
 * Description: The dashboard component. Displays the selected widgets in a defined layout.
 *
 */

import React, {useState, useRef, useEffect, useContext} from "react";
import GridLayout from "react-grid-layout";
import CameraWidget from "camera-widget";
import DigitalClock from "react-digital-clock";
import {Clock} from "react-clock";
import CameraSettings from "../CameraSettings/CameraSettings";
import ReactWeather from "react-open-weather";
import Calendar from 'react-calendar';
import GoogleCalendarWrapper from "../Google/GoogleCalendarWrapper";
import {Row, Col} from "reactstrap";
import {HighContrastSelectorWhite, HighContrastSelectorBlack} from "office-ui-fabric-react";
import Webcam from "react-webcam";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {LoggingContext} from "../../context/LoggingContext";
import {AppContext} from "../../context/AppContext";
import axios from "axios";
// import GoogleCalendarWrapper from "../Google/GoogleCalendarWrapper";

const Dashboard = (props) => {

    const [widthConstraint, setWidthConstraint] = useState(1280);
    const [heightConstraint, setHeightConstraint] = useState(720);
    const [componentWidth, setComponentWidth] = useState(500);
    const [componentHeight, setComponentHeight] = useState(500);
    const [componentAudio, setComponentAudio] = useState(false);
    const [showWebcamFeed, setShowWebcamFeed] = useState(true);

    const [newsArray, setNewsArray] = useState([]);
    const [news, setNews] = useState("");

    const {logger} = useContext(LoggingContext);
    const {webcamTools} = useContext(AppContext);

    useEffect(() => {

        getJoke();

        setInterval(() => {
            getJoke();
        }, 10000)

    }, []);

    const [joke, setJoke] = useState("");

    useEffect(() => {

        axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=56b421342f49477b931f8d1929c3de83")
            .then(responce => {
                const news = responce.data;
                setNewsArray(news && news.articles)


            });
    }, []);

    useEffect(() => {
        if (newsArray.length > 0) {

            setNews(newsArray[Math.floor(Math.random() * newsArray.length)]);

            setInterval(() => {
                setNews(newsArray[Math.floor(Math.random() * newsArray.length)]);
            }, 30000);
        }
    }, [newsArray]);

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
                    setJoke(myJson.joke);
                } else {
                    //alert(myJson.setup + " " +  myJson.delivery)
                    const twoPartJoke = myJson.setup + myJson.delivery;
                    setJoke(twoPartJoke);
                }
            });
    };

    const webcamRef = useRef(null);

    let videoConstraints = {
        width: widthConstraint,
        height: heightConstraint,
        facingMode: "user"
    };

    const coreAPI = {
        "webcamRef": webcamRef,
        "videoConstraints": videoConstraints,
        "width": componentWidth,
        "height": componentHeight,
        "audio": componentAudio,
        "googleCalendarURL": "https://mysterious-cliffs-04726.herokuapp.com/google-calendar",
        "googleCalendarWidth": "100%",
        "googleCalendarHeight": "100%"
    };

    const cameraAPI = {
        setWidthConstraint,
        setHeightConstraint,
        setComponentWidth,
        setComponentHeight,
        setComponentAudio
    };

    const style = {
        background: "black",
        width: "50%",
        margin: "auto",
    };

    const selectedWidgets = [
        <div key="camera-widget" data-grid={{x: 4, y: 4, w: 5, h: 10}}>
            <CameraWidget coreAPI={coreAPI}/>
        </div>,
        <div key="clock-widget" id="clock-widget" data-grid={{x: 12, y: 0, w: 2, h: 4}} style={style}>
            <ClockWidget coreAPI={coreAPI}/>
        </div>,
        <div key="camera-settings" data-grid={{x: 0, y: 10, w: 2, h: 10}}>
            <CameraSettings cameraAPI={cameraAPI} coreAPI={coreAPI}/>
        </div>,
        <div key="weather-widget" data-grid={{x: 12, y: 10, w: 2, h: 13}}>
            <ReactWeather
                style={{color: "white"}}
                forecast="5days"
                apikey="3a672a5bca657693859413a963d7b698"
                type="city"
                city="Spokane"
                unit="imperial"
            />
        </div>,
        <div key="calendar-widget" data-grid={{x: 0, y: 0, w: 3, minW: 3, h: 8}}>
            <Calendar
                value={new Date()}
            />
        </div>,
        <div key="digital-clock-widget" id="digital-clock-widget" data-grid={{x: 6, y: 0, w: 2, h: 1}}>
            <DigitalClock/>
        </div>,
        <div key="google-calendar-widget" data-grid={{x: 3, y: 0, w: 3, h: 5}}>
            <GoogleCalendarWrapper googleCalendarAPI={coreAPI}/>
        </div>
    ];


    const showWebcamCommand = {
        command: ["mirror mirror on the wall show webcam", "mirror mirror show webcam"],
        answer: "Showing Webcam in Upper right corner",
        func: () => {
            logger.addLog("Voice Command: Showing webcam");
            setShowWebcamFeed(true);
        }
    };

    const hideWebcamCommand = {
        command: ["mirror mirror on the wall hide webcam", "mirror mirror hide webcam"],
        answer: "Hiding Webcam",
        func: () => {
            logger.addLog("Voice Command: Hiding webcam");
            setShowWebcamFeed(false);
        }
    };

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);

    useEffect(() => {
        SpeechRecognitionHook.addCommand(showWebcamCommand);
        SpeechRecognitionHook.addCommand(hideWebcamCommand);

        return () => {
            SpeechRecognitionHook.removeCommand(showWebcamCommand);
            SpeechRecognitionHook.removeCommand(hideWebcamCommand);
        }
    }, []);

    return (
        <div id="main-div">
            <Row>
                <Col sm={4} style={style}>
                    <div key="calendar-widget" style={{...style}}>
                        <Calendar
                            value={new Date()}
                        />
                    </div>
                </Col>
                <Col sm={4} style={style}>

                </Col>
                <Col sm={4} style={style}>
                    {
                        !webcamTools.disableWebCam && showWebcamFeed ?
                            <div key="webcam-feed" id="webcam-feed" style={{...style, marginBottom: "3em"}}>
                                <Webcam
                                    width="40%"
                                />
                            </div>
                            : null
                    }
                    <div key="digital-clock-widget" id="digital-clock-widget" style={style}>
                        <DigitalClock/>
                    </div>
                    <br/>
                    <br/>
                    <div key="clock-widget" id="clock-widget" style={{...style, marginRight: "12%"}}>
                        <ClockWidget coreAPI={coreAPI}/>
                    </div>
                    <br/>
                    <br/>
                    <div key="weather-widget" style={style}>
                        <ReactWeather
                            style={{color: "white"}}
                            forecast="1day"
                            apikey="3a672a5bca657693859413a963d7b698"
                            type="city"
                            city="Spokane"
                            unit="imperial"
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <div key="google-calendar-widget" style={style}>
                        <GoogleCalendarWrapper googleCalendarAPI={coreAPI}/>
                    </div>
                </Col>
                <Col sm={4} style={style}>
                    <div style={{position: "relative", bottom: "0px"}}>
                        {
                            joke ? joke : null
                        }
                    </div>
                </Col>
                <Col sm={4} style={style}>
                </Col>
            </Row>
            <Row>
                <Col sm={4}>

                </Col>
                <Col sm={4}>
                    {
                        news ?
                            <>
                                <h4>News Feed:</h4>
                                <p>{"Title: " + (news.title ? news.title : null)}</p>
                                <p>{"Description: " + (news.description ? news.description : null)}</p>
                                <p>{"Author: " + (news.author ? news.author : null)}</p>
                            </> : null
                    }
                </Col>
                <Col sm={4}>

                </Col>
            </Row>
        </div>
    )
};

{/*<div style={{"background":"black", height: "100vh"}}>*/
}
{/*    <GridLayout style={{"background":"black"}} cols={12} rowHeight={30} width={1200}>*/
}
{/*        {*/
}
{/*            selectedWidgets.map((widget) =>*/
}
{/*                    React.cloneElement(widget)*/
}
{/*            )*/
}
{/*        }*/
}
{/*    </GridLayout>*/
}
{/*</div>*/
}

// Temporary to check out Anatoli's widget
export const ClockWidget = (props) => {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setInterval(
            () => setTime(new Date()),
            1000
        );
    }, []);

    return (
        <Clock value={time}/>
    )
};

export default Dashboard;