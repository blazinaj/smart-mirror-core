import React, {useContext, useEffect} from "react";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {Row, Col} from "reactstrap"

const RussianDemoPage = () => {

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);

    const speakEnglish = {
        command: ["Зеркало зеркало ты говоришь на английском", "Зеркало зеркало на стене говори на английском"],
        answer: "Yes! I know English",
        func: () => {
            SpeechRecognitionHook.changeLanguage('en-AU');
            SpeechRecognitionHook.setLangVoice(0);
        }
    };

    const kakDela = {
        command: ["зеркала зеркала как твои дела", "Зеркала зекрала на стене как твои дела"],
        answer: "У меня все хорошо, спасибо что интересуетесь!"
    };

    const whoIsGreg = {
        command: ["зеркало зеркало кто такой Григорий останин", "зеркало зеркало на стене кто такой Григорий останин"],
        answer: "Григорий Останин является студентом университета Eastern Washington University и просто классный пацан!"
    };

    useEffect(() => {

        SpeechRecognitionHook.changeLanguage('ru-RU');
        SpeechRecognitionHook.setLangVoice(18);

        SpeechRecognitionHook.addCommand(speakEnglish);
        SpeechRecognitionHook.addCommand(kakDela);
        SpeechRecognitionHook.addCommand(whoIsGreg);

    }, []);

    return (
        <>
            <Row>
                <Col sm={12}>
                    <h2>Команда: Зеркало зеркало как твои дела?</h2>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <h2>Команда: Зеркало Зеркало кто такой Григорий Останин?</h2>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <h2>Команда: Зеркало зеркало ты говоришь на английском?</h2>
                </Col>
            </Row>
        </>
    );
};

export default RussianDemoPage;