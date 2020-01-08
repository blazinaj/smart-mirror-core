/**
 * Description: The Default Layout for the core app.
 *              Currently displays the Dashboard component.
 */

import React, { useContext, useState, useEffect } from 'react';
import Dashboard from "../../views/Dashboard/Dashboard";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import { useHistory } from "react-router-dom";
import {LoggingContext} from "../../context/LoggingContext";
import {Col, Row} from "reactstrap";

const DefaultLayout = (props) => {

    const [showLogger, setShowLogger] = useState(false);

    const voiceContext = useContext(VoiceCommandsContext);

    const loggingContext = useContext(LoggingContext);

    const history = useHistory();

    const command1 = {
        command: "Go to test page",
        answer: "Yes sir, going there now",
        func: () => history.push("/test")
    };

    const command2 = {
        command: "Go to demo page",
        answer: "Yes sir, going there now",
        func: () => history.push("/demo_page")
    };

    const command3 = {
        command: "mirror mirror on the wall log",
        answer: "Showing Logger",
        func: () => {
            loggingContext.logger.addLog("Opening Logger..");
            setShowLogger(true);
        }
    };

    useEffect(() => {
        voiceContext.SpeechRecognitionHook.addCommand(command1);
        voiceContext.SpeechRecognitionHook.addCommand(command2);
        voiceContext.SpeechRecognitionHook.addCommand(command3);
    }, []);

    return (
        <div>
            <Row>
                {
                    showLogger &&
                        <Col lg={3}>
                            {loggingContext.logger.display}
                        </Col>
                }
                {(
                    () => {
                        let status = "true";
                        switch (status) {
                            case "true":
                                <div>TRUE</div>
                        }
                    })()
                }
                <Col>
                    <Dashboard/>
                    {voiceContext.SpeechRecognitionHook.displayTranscript}
                </Col>
            </Row>
        </div>
    )
};

export default DefaultLayout;