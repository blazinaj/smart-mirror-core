import React, {useContext, useEffect} from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {Row, Col} from "reactstrap"

const RussianDemoPage = () => {

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);

    const speakFrench = {
        command: ["Speak in French"],
        answer: "Oui, je parle français",
        func: () => {
            SpeechRecognitionHook.changeLanguage('fr-FR');
            SpeechRecognitionHook.setLangVoice('fr-FR');
        }
    };

    const speakEnglish = {
        command: ["parlez-vous anglais"],
        answer: "Yes, I speak English",
        func: () => {
            SpeechRecognitionHook.changeLanguage('en-AU');
            SpeechRecognitionHook.setLangVoice('en-US');
        }
    };

    useEffect(() => {
        SpeechRecognitionHook.changeLanguage('fr-FR');
        SpeechRecognitionHook.setLangVoice('fr-FR');

        SpeechRecognitionHook.addCommand(speakEnglish);
        SpeechRecognitionHook.addCommand(speakFrench);

        return () => {
            SpeechRecognitionHook.removeCommand(speakEnglish);
            SpeechRecognitionHook.removeCommand(speakFrench);
        }

    }, []);

    return (
        <>
            <Row>
                <Col sm={12}>
                    <h2>parles tu français?</h2>
                </Col>
                <Col sm={12}>
                    <h2>Commands</h2>
                    <h5>Speak in French</h5>
                    <h5>parlez-vous anglais</h5>
                </Col>
            </Row>
        </>
    );
};

export default RussianDemoPage;