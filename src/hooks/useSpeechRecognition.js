import React, {
    useRef,
    useEffect,
    useState
} from 'react';
import {Alert} from "reactstrap";
import useSpeechSynthesis from "./useSpeechSynthesis";

const languageOptions = [
    {label: 'Cambodian', value: 'km-KH'},
    {label: 'Deutsch', value: 'de-DE'},
    {label: 'English', value: 'en-AU'},
    {label: 'Farsi', value: 'fa-IR'},
    {label: 'Français', value: 'fr-FR'},
    {label: 'Italiano', value: 'it-IT'},
    {label: '普通话 (中国大陆) - Mandarin', value: 'zh'},
    {label: 'Portuguese', value: 'pt-BR'},
    {label: 'Español', value: 'es-MX'},
    {label: 'Svenska - Swedish', value: 'sv-SE'},
    {label: 'Русский (Россия)', value: 'ru-RU'}
];
//This is just a test comment. JH

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const useSpeechRecognition = () => {

    const speechSynthesisHook = useSpeechSynthesis();

    const recognition = useRef(null);
    const [listening, setListening] = useState(false);
    const supported = !!window.SpeechRecognition;

    const [lang, setLang] = useState('en-AU');
    const [value, setValue] = useState('');

    const intendArray = useRef([
        {
            command: ["mirror mirror on the wall what time is it", "mirror mirror what time is it"],
            answer: "Current time is " + new Date().toLocaleString()
        }
    ]);

    const setIntendArray = (intend) => {

        let intendFound = intendArray.current.some((item) => JSON.stringify(item) === JSON.stringify(intend));

        if (!intendFound) {
            intendArray.current.push(intend);
        }
    };

    const onEnd = () => {
        // You could do something here after listening has finished
    };

    const onResult = (result) => {
        setValue(result);
    };

    const changeLang = (event) => {
        setLang(event.target.value);
    };

    const processResult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        onResult(transcript);
    };

    const listen = (args = {}) => {
        if (listening) return;
        const {lang = '', interimResults = true} = args;
        setListening(true);
        recognition.current.lang = lang;
        recognition.current.interimResults = interimResults;
        recognition.current.onresult = processResult;
        // SpeechRecognition stops automatically after inactivity
        // We want it to keep going until we tell it to stop
        recognition.current.onend = () => recognition.current.start();
        recognition.current.start();
    };

    const stop = () => {
        if (!listening) return;
        recognition.current.onresult = () => {
        };
        recognition.current.onend = () => {
        };
        setListening(false);
        recognition.current.stop();
        onEnd();
    };

    useEffect(() => {
        if (!supported) {
            console.log("Oh no, it looks like your browser doesn't support Speech Recognition.");
            return;
        }
        recognition.current = new window.SpeechRecognition();
    }, []);

    useEffect(() => {
        listen({lang})
    }, []);

    useEffect(() => {
        let commandFound = false;

        intendArray.current.map((intent) => {
            let commands = [].concat(intent.command);
            for (let command of commands) {
                if (value.toString().toLocaleLowerCase().match(command.toString().toLocaleLowerCase())) {
                    if (value.length === command.length) {
                        if (!commandFound) {
                            if (intent["answer"]) {
                                speechSynthesisHook.speak(intent["answer"]);
                            }
                            if (intent.func) {
                                intent.func(value);
                            }
                        }
                        commandFound = true;
                    }
                }
                if ((value.toString().toLocaleLowerCase().includes("mirror mirror search for") && command.toString().toLocaleLowerCase()
                        .includes("mirror mirror search for")
                || (value.toString().toLocaleLowerCase().includes("mirror mirror search wikipedia for") && command.toString().toLocaleLowerCase()
                        .includes("mirror mirror search wikipedia for")))
                    || (value.toString().toLocaleLowerCase().includes("mirror mirror accent") && command.toString().toLocaleLowerCase()
                        .includes("mirror mirror accent"))) {
                        if (!commandFound) {
                            if (intent["answer"]) {
                                speechSynthesisHook.speak(intent["answer"]);
                            }
                            if (intent.func) {
                                intent.func(value);
                            }
                        }
                        commandFound = true;
                }
            }
        });
    }, [value]);

    const addCommand = (command) => {
        setIntendArray(command);
    };

    const removeCommand = (command) => {
        let index = intendArray.current.findIndex((item) => JSON.stringify(item) === JSON.stringify(command));

        if (index > -1) {
            intendArray.current.splice(index, 1);
        }
    };

    const selectLanguage =
        <>
            <label htmlFor="language">
                Language
            </label>
            <select
                form="speech-recognition-form"
                id="language"
                value={lang}
                onChange={changeLang}
            >
                {languageOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </>;

    const changeLanguage = (speakLang) => {
        if (recognition.current.lang) {
            recognition.current.lang = speakLang;
        }
    };

    const displayTranscript =
        supported ?
            <Alert color="dark">
                {
                    value ? value : null
                }
            </Alert>
            : null;

    return {
        listen,
        listening,
        stop,
        supported,
        displayTranscript,
        selectLanguage,
        intendArray,
        setIntendArray,
        addCommand,
        removeCommand,
        setLang,
        setLangVoice: speechSynthesisHook.setLangVoice,
        speak: speechSynthesisHook.speak,
        changeLanguage
    };
};

export default useSpeechRecognition;