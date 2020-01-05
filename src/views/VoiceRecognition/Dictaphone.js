import React, {useEffect} from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const Dictaphone = ({transcript, resetTranscript, browserSupportsSpeechRecognition}) => {

    const intendArray = [
        {
            key: "0",
            command: "mirror mirror on the wall next layout",
            answer: "Changing layout!",
            func: "testFunc"
        },
        {
            key: "1",
            command: "mirror mirror on the wall what time is it",
            answer: "Current time is " + new Date().toLocaleString()
        },
        {
            key: "2",
            command: "mirror mirror on the wall logout",
            answer: "Logging out!",
            func: "logout"
        },
        {
            key: "3",
            command: "mirror mirror on the wall what is my name",
            answer: "Your name is Anatoli!"
        },
        {
            key: "4",
            command: "mirror mirror on the wall who is Stuart Steiner",
            answer: "Stuart Steiner is experienced Senior Lecturer with a demonstrated history of working in the higher education industry. Skilled in Computer Science, PHP, Linux, Python, and Java. Strong education professional with a Doctor of Philosophy (PhD) focused in Computer Science from University of Idaho."
        },
        {
            key: "5",
            command: "mirror mirror on the wall turn off display",
            answer: "Turning off!",
            func: "turnOff"
        }
    ];

    useEffect(() => {
        intendArray.map((intent) => {
            if (transcript.toString().toLocaleLowerCase().includes(intent["command"].toString().toLocaleLowerCase())) {

                speak(intent["answer"]);

                if (intent.func) {
                    intent.func();
                }

                resetTranscript();
            }
        });

    }, [transcript]);

    intendArray[2].func = function () {
        document.getElementById('button-logout').click()
    };

    intendArray[5].func = function () {
        document.body.style.backgroundColor = "black";
    };

    const speak = (msgText) => {
        let msg = new SpeechSynthesisUtterance(msgText);
        window.speechSynthesis.speak(msg);
    };

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    return (
        <div id="dictaphone">
            {/*<button id="reset" onClick={resetTranscript}>Reset</button>*/}
            {/*<span>{transcript}</span>*/}
        </div>
    );
};

Dictaphone.propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
};

export default SpeechRecognition(Dictaphone);