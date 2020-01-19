import React, {useContext} from "react"
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {Col, Row} from "reactstrap";

const HelpPage = () => {

    const voiceContext = useContext(VoiceCommandsContext).SpeechRecognitionHook;

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
                    <label style={{color: "red", fontSize: "28px"}}>Create new Account: </label><h5> Mirror mirror register new account</h5>
                </Col>
                <Col>
                    <h3 style={{color: "blue"}}>Misc Commands</h3>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Time: </label> Mirror mirror what time is it?</h5>
                </Col>
                <div>
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