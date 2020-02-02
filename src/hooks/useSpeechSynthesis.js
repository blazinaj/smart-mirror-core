import React, {
    useEffect,
    useState,
    useCallback,
    useRef
} from 'react';

const useSpeechSynthesis = () => {

    const [voices, setVoices] = useState([]);
    const [speaking, setSpeaking] = useState(false);
    const supported = !!window.speechSynthesis;

    const [text, setText] = useState('');
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);

    const onEnd = () => {
        // You could do something here after speaking has finished
    };

    const voice = useRef(voices[0] ? voices[0] : null);

    const styleFlexRow = {display: 'flex', flexDirection: 'row'};
    const styleContainerRatePitch = {display: 'flex', flexDirection: 'column', marginBottom: 12};


    const processVoices = (voiceOptions) => {
        setVoices(voiceOptions);
    };

    const getVoices = () => {
        // Firefox seems to have voices upfront and never calls the
        // voiceschanged event
        let voiceOptions = window.speechSynthesis.getVoices();
        if (voiceOptions.length > 0) {
            processVoices(voiceOptions);
            return;
        }

        window.speechSynthesis.onvoiceschanged = (event) => {
            voiceOptions = event.target.getVoices();
            processVoices(voiceOptions);
        };
    };

    const handleEnd = () => {
        setSpeaking(false);
        onEnd();
    };

    useEffect(() => {
        if (supported) {
            getVoices();
        } else {
            console.log("Oh no, it looks like your browser doesn't support Speech Synthesis.");
        }
    }, []);

    const speak = (textProps) => {
        setSpeaking(true);
        // Firefox won't repeat an utterance that has been
        // spoken, so we need to create a new instance each time
        const utterance = new window.SpeechSynthesisUtterance();
        utterance.text = textProps ? textProps : text;
        utterance.voice = voice.current;
        utterance.onend = handleEnd;
        utterance.rate = rate;
        utterance.pitch = pitch;
        window.speechSynthesis.speak(utterance);
    };

    const cancel = () => {
        setSpeaking(false);
        window.speechSynthesis.cancel();
    };

    const selectVoice =
        <>
            <label htmlFor="voice">
                Voice
            </label>
            <select
                id="voice"
                name="voice"
                value={0}
                onChange={(event) => {
                    if (voices[event.target.value]){
                        voice.current = voices[event.target.value]
                    }
                }}
            >
                <option value="">Default</option>
                {voices.map((option, index) => (
                    <option key={option.voiceURI} value={index}>
                        {`${option.lang} - ${option.name}`}
                    </option>
                ))}
            </select>
        </>;

    const setLangVoice = (langIndex) => {
        if (voices[langIndex])
            voice.current = voices[langIndex];
    };

    const ratePitch =
        <div style={styleContainerRatePitch}>
            <div style={styleFlexRow}>
                <label htmlFor="rate">Rate: </label>
                <div className="rate-value">{rate}</div>
            </div>
            <input
                type="range"
                min="0.5"
                max="2"
                defaultValue="1"
                step="0.1"
                id="rate"
                onChange={(event) => {
                    setRate(event.target.value);
                }}
            />
        </div>;

    return {
        supported,
        speak: useCallback((text) => speak(text), []),
        speaking,
        cancel,
        voices,
        selectVoice,
        ratePitch,
        setText,
        setLangVoice
    };
};

export default useSpeechSynthesis;