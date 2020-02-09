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
                    <h5><label style={{color: "red", fontSize: "28px"}}>Voice Demo: </label> Mirror mirror go to voice
                        demo page</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Face Demo: </label> Mirror mirror go to face
                        demo page</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Painting Canvas: </label> Mirror mirror I want
                        to paint</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Click Game: </label> Mirror mirror I want to
                        play click me game</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Help page: </label> Mirror mirror help page</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Sleep: </label> Mirror mirror go to sleep</h5>
                    <h5><label style={{color: "red", fontSize: "28px"}}>Logout: </label> Mirror mirror logout</h5>

                </Col>
                <Col>
                    <h3 style={{color: "blue"}}>Misc Commands</h3>
                    <label style={{color: "red", fontSize: "28px"}}>Show/Hide Speech to Text: </label><h5> Mirror mirror
                    show/hide transcript</h5>
                    <label style={{color: "red", fontSize: "28px"}}>Create new Account: </label><h5> Mirror mirror
                    register new account</h5>
                    <label style={{color: "red", fontSize: "28px"}}>Tell Time: </label><h5> Mirror mirror what time is
                    it?</h5>
                    <label style={{color: "red", fontSize: "28px"}}>Setup Facial Recognition: </label><h5> Mirror mirror
                    ?</h5>
                </Col>
                <Col>
                    <h3 style={{color: "blue"}}>Other</h3>
                    <h5>
                        To setup your Google calendar, do so from the Account Manager on the Home Page.
                        <hr/>
                        From the Account manager you can also change your name so we know what to call you when you
                        login.
                        <hr/>
                        Thank you for using our
                        <br/>
                        Magic Mirror, by OpTech.
                    </h5>
                </Col>
                <div>
                    <h3 style={{color: "blue"}}>All Commands</h3>
                    <h5 style={{color: "blue"}}>(Some commands only work on certain pages)</h5>
                    {
                        voiceContext && voiceContext.intendArray && voiceContext.intendArray.current && voiceContext.intendArray.current.map((intend) => {
                            return <div>
                                {
                                    intend && intend.command && intend.command.map((command) => {
                                        return <a
                                            style={{fontSize: "18px"}}> {JSON.stringify(command ? command : null)} </a>
                                    })
                                }
                                <hr style={{backgroundColor: "red"}}/>
                            </div>
                        })
                    }
                </div>
            </Row>
            <hr/>
        </div>
    )

};

export default HelpPage;