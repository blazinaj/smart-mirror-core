import React, {useState, useContext, useEffect, useRef} from "react"
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {LoggingContext} from "../../context/LoggingContext";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";

const WikipediaSearchPage = () => {

    const loggingContext = useContext(LoggingContext).logger;
    const voiceContext = useContext(VoiceCommandsContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [foundResults, setFoundResults] = useState([]);
    const [voiceSearch, setVoiceSearch] = useState(true);
    const [searchQuantity, setSearchQuantity] = useState("many");

    const radioButtonOne = useRef();
    const radioButtonMany = useRef();
    const searchButton = useRef();

    const wiki = async () => {
        const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${searchQuery}`;
        const res = await fetch(url);
        await res.json()
            .then(data => {
                let tempResults = [];
                const results = data.query.pages;
                loggingContext.addLog(results);
                // true for many, false for one
                switch(searchQuantity){
                    case "many": {
                        // Extracting many items from query and putting them into foundResults
                        Object.keys(results).map(key => {
                            //loggingContext.addLog(results[key]);
                            if(results[key].title.toLocaleLowerCase() === searchQuery.toLocaleLowerCase()){
                                tempResults = [{key: key, title: results[key].title, extract: results[key].extract}];
                            }
                        });

                        // Left as a start to improving result if only partial query
                        let closeKey = -1;
                        // if(tempResults.length === 0){
                        //     Object.keys(results).map(key => {
                        //
                        //         let queryWords = results[key].title.split(" ");
                        //         for(let i=0; i < queryWords.length; i++){
                        //             if(queryWords[i].toLocaleLowerCase() === searchQuery.toLocaleLowerCase()){
                        //                 loggingContext.addLog(results[key].title);
                        //                 tempResults = [{key: key, title: results[key].title, extract: results[key].extract}];
                        //                 closeKey = key;
                        //                 break;
                        //             }
                        //         }
                        //     });
                        // }

                        Object.keys(results).map(key => {
                            //loggingContext.addLog(results[key]);
                            if(closeKey <= -1) {
                                if(results[key].title.toLocaleLowerCase() !== searchQuery.toLocaleLowerCase()){
                                    if(closeKey !== key) {
                                        tempResults = [...tempResults,{key: key, title: results[key].title, extract: results[key].extract}];
                                    }
                                }
                            }
                            else {
                                if(results[key].title.toLocaleLowerCase() !== searchQuery.toLocaleLowerCase()){
                                    tempResults = [...tempResults,{key: key, title: results[key].title, extract: results[key].extract}];
                                }
                            }
                        });
                        break;
                    }
                    case "one": {
                        // Extracting one items from query and putting them into foundResults
                        Object.keys(results).map(key => {
                            //loggingContext.addLog(results[key]);
                            if(results[key].title.toLocaleLowerCase() === searchQuery.toLocaleLowerCase()){
                                loggingContext.addLog("Searching one...");
                                console.log(results[key]);
                                if(results[key].thumbnail !== undefined && results[key].thumbnail !== null){
                                    loggingContext.addLog("Found image...");
                                    tempResults = [{key: key, title: results[key].title, extract: results[key].extract, image: results[key].thumbnail.source}];
                                }
                                else {
                                    loggingContext.addLog("No image...");
                                    tempResults = [{key: key, title: results[key].title, extract: results[key].extract}];
                                }
                            }
                        });
                        if(tempResults.length === 0){
                            let keys = Object.keys(results);
                            if(results[keys[0]].thumbnail !== undefined && results[keys[0]].thumbnail !== null){
                                tempResults = [{title: results[keys[0]].title, extract: results[keys[0]].extract, image: results[keys[0]].thumbnail.source}];
                            }
                            else {
                                tempResults = [{title: results[keys[0]].title, extract: results[keys[0]].extract}];
                            }
                        }
                        break;
                    }
                    default: {}
                }
                loggingContext.addLog(tempResults);
                setFoundResults(tempResults);
            })
            .catch((err) => loggingContext.addLog("Wikipedia fetch failed with: " + err));
    };

    useEffect (() => {
        wiki();
        loggingContext.addLog("Voice search finished...");
        loggingContext.addLog(voiceSearch);
    }, [voiceSearch]);

    const setRadioOne = {
        command: ["mirror mirror select one"],
        answer: `Selecting one`,
        func: () => {
            radioButtonOne.current.checked = true;
            setSearchQuantity("one");
            setVoiceSearch(voiceSearch => !voiceSearch);
        }
    };

    const setRadioMany = {
        command: ["mirror mirror select many", "mirror mirror select mini"],
        answer: `Selecting many`,
        func: () => {
            radioButtonMany.current.checked = true;
            setSearchQuantity("many");
            setVoiceSearch(voiceSearch => !voiceSearch);
        }
    };

    const searchCommandVoice = {
        command: ["mirror mirror search for"],
        answer: "",
        func: (value) => {
            setSearchQuery(value.substring(25));
            setTimeout(() => {
                setVoiceSearch(voiceSearch => !voiceSearch);
            }, 800);
        }
    };

    useEffect(() => {
        voiceContext.SpeechRecognitionHook.addCommand(setRadioOne);
        voiceContext.SpeechRecognitionHook.addCommand(setRadioMany);
        voiceContext.SpeechRecognitionHook.addCommand(searchCommandVoice);
    }, []);

    return (
        <div>
            <div className="col-xs-9 col-md-7" id={"inputFieldsLogin"}>
                <h2>Search <img src={require('./media/wikipedia.png')} /> Wikipedia</h2>
                <div className="pretty p-icon p-curve p-jelly">
                    <input type="radio" name="radio66" ref={radioButtonOne} onClick={() => {setSearchQuantity("one");}} />
                    <div className="state p-warning">
                        <i className="icon mdi mdi-check"></i>
                        <label> One</label>
                    </div>
                </div>
                <div className="pretty p-icon p-curve p-jelly">
                    <input type="radio" name="radio66" ref={radioButtonMany} onClick={() => {setSearchQuantity("many");}} defaultChecked="checked"/>
                    <div className="state p-warning">
                        <i className="icon mdi mdi-check"></i>
                        <label> Many</label>
                    </div>
                </div>
                <InputGroup className={"inputGroupLogin"}>
                    <Input type="text" value={searchQuery} placeholder="Query..." onChange={(e) => setSearchQuery(e.target.value)}/>
                    <InputGroupAddon addonType="append"><Button id="searchButton" ref={searchButton} onClick={() => wiki()}>Search</Button></InputGroupAddon>
                </InputGroup>
            </div>
            <br />
            <div className="col-xs-9 col-md-7" style={{margin: "auto"}}>
                {
                    foundResults.length > 0 ?
                        foundResults.map((item) => {
                            return <div>
                                        <div style={{border: "1px solid white"}}>
                                            {
                                                radioButtonOne.current.checked && <img className="w-full max-w-xs m-auto" src={item.image} alt={"No image available..."} />
                                            }
                                            <hr />
                                            <h3>{item.title}</h3>
                                            {item.extract}
                                            <hr />
                                         </div>
                                        <br />
                                    </div>
                        })
                        :
                        <label>Nothing to search...</label>
                }
            </div>

        </div>
    )

};

export default WikipediaSearchPage;