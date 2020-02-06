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
            SpeechRecognitionHook.setLangVoice('en-AU');
        }
    };

    const kakDela = {
        command: ["зеркала зеркала как твои дела", "Зеркала зекрала на стене как твои дела"],
        answer: "У меня все хорошо, спасибо что интересуетесь!"
    };

    const whoIsPutin = {
        command: ["зеркало зеркало кто такой Владимир Путин", "зеркало зеркало на стене кто такой Владимир Путин"],
        answer: "Влади́мир Влади́мирович Пу́тин российский государственный и политический деятель, действующий президент Российской Федерации и верховный главнокомандующий Вооружёнными силами Российской Федерации"
    };

    useEffect(() => {

        SpeechRecognitionHook.changeLanguage('ru-RU');
        SpeechRecognitionHook.setLangVoice('ru-RU');

        SpeechRecognitionHook.addCommand(speakEnglish);
        SpeechRecognitionHook.addCommand(kakDela);
        SpeechRecognitionHook.addCommand(whoIsPutin);

        return () => {
            SpeechRecognitionHook.removeCommand(speakEnglish);
            SpeechRecognitionHook.removeCommand(kakDela);
            SpeechRecognitionHook.removeCommand(whoIsPutin);
        }

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
                    <h2>Команда: Зеркало Зеркало кто такой Владимир Путин?</h2>
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