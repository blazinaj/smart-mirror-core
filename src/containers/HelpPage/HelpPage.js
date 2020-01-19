import React, {useState, useContext, useEffect} from "react"
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {LoggingContext} from "../../context/LoggingContext";
import {Col, Row} from "reactstrap";

// WIP
// Display most desireable info
// Have command to show all commands (with certain amount per page and can say previous/next to change page)
const HelpPage = () => {

    const voiceContext = useContext(VoiceCommandsContext).SpeechRecognitionHook;
    const loggingContext = useContext(LoggingContext).logger;

    // const [pageAmount, setPageAmount] = useState(1);
    // const [currentPage, setCurrentPage] = useState(0);
    const [commandList, setCommandList] = useState([[{}]]);

    // useEffect(() => {
    //     setPageAmount(voiceContext.intendArray.length / 15);
    //     let newCommands = [];
    //     for(let i=0; i < pageAmount; i++){
    //         newCommands[i] = voiceContext.intendArray.slice(i, voiceContext.intendArray.length ? ((i+1) * 15)-1 : voiceContext.intendArray.length);
    //     }
    //     setCommandList(newCommands);
    // }, [voiceContext.intendArray]);



    //Test page not included
    // Sleep/Logout/VoiceRegistration
    return (
        <div>
            <h1 style={{color: "teal"}}>Primary Voice Commands</h1>
            <Row>
                <Col lg={5}>
                    <h3 style={{color: "blue"}}>Page Commands</h3>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Home: </label> Mirror mirror go home</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Voice Demo: </label> Mirror mirror go to voice demo page</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Face Demo: </label> Mirror mirror go to face demo page</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Gesture Demo 1: </label> Mirror mirror I want to paint</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Help page: </label> Mirror mirror help page</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Sleep: </label> Mirror mirror go to sleep</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Logout: </label> Mirror mirror logout</h5>

                </Col>
                <Col>
                    <h3 style={{color: "blue"}}>General</h3>
                    <label style={{color: "red", fontSize: "28px"}}>Show Speech to Text: </label><h5> Mirror mirror show transcript</h5>
                    <label style={{color: "red", fontSize: "28px"}}>Hide Speech to Text: </label><h5> Mirror mirror hide transcript</h5>
                    {/*<h5>*/}
                    {/*    It was our desire that our device could work entirely hands free using only voice and facial recognition.*/}
                    {/*    Therefore we don't have any option to reset email/password currently as we have other goals to reach within our timeframe.*/}
                    {/*</h5>*/}
                </Col>
                <Col>
                    <h3 style={{color: "blue"}}>Misc Commands</h3>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Time: </label> Mirror mirror what time is it?</h5>
                </Col>
                <div>
                    {/*<h4>Say: <h2 style={{color: "blue"}}>Mirror mirror close command list</h2> when finished.</h4>*/}
                    <h3 style={{color: "blue"}}>All Commands</h3>
                    <h5 style={{color: "blue"}}>(Not all commands function all the time)</h5>
                    {
                        voiceContext.intendArray.map((command) => {
                            return <div>
                                {
                                    command.command.map((command) => {
                                        return <a style={{fontSize: "18px"}}> {JSON.stringify(command)} </a>
                                    })
                                }
                                <hr style={{backgroundColor: "red"}}/>
                                {/*<li id={command}>{JSON.stringify(command.command[0])}</li>*/}
                                {/*<br />*/}
                            </div>
                        })
                    }
                </div>
            </Row>
            <hr />
        </div>
    )

};

export default HelpPage;