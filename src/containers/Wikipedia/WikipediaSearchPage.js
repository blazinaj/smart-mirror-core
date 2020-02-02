import React, {useState, useContext, useEffect, useRef} from "react"
import {Button, FormGroup, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";
import {LoggingContext} from "../../context/LoggingContext";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";

const WikipediaSearchPage = () => {

    const loggingContext = useContext(LoggingContext).logger;
    const voiceContext = useContext(VoiceCommandsContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [foundResults, setFoundResults] = useState([]);
    const [voiceSearch, setVoiceSearch] = useState(true);
    // const changeVoiceSearchOption = () => {
    //     switch (voiceSearch) {
    //         case true: setVoiceSearch(false);
    //             break;
    //         case false: setVoiceSearch(true);
    //             break;
    //         default: {console.log("unimaginable anger passes over the programmer who reads this")}
    //     }
    // };

    // True for many results, false for one
    const [searchQuantity, setSearchQuantity] = useState("many");

    const radioButtonOne = useRef();
    const radioButtonMany = useRef();
    const searchButton = useRef();

    // const fetchResults = async () => {
    //     //const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    //     const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${searchQuery}`;
    //     await axios.get(url)
    //         .then(data => {
    //             loggingContext.addLog(data);
    //             const results = data.data.query.pages;
    //             let tempResults = [];
    //
    //             // true for many, false for one
    //             switch(searchQuantity){
    //                 case "many": {
    //                     // Extracting many items from query and putting them into foundResults
    //                     Object.keys(results).map(key => {
    //                         loggingContext.addLog(results[key]);
    //                         if(results[key].title.toLowerCase() === searchQuery.toLowerCase()){
    //                             tempResults = [{key: key, title: results[key].title, extract: results[key].extract, image: results[key].thumbnail.source}];
    //                         }
    //                     });
    //                     Object.keys(results).map(key => {
    //                         loggingContext.addLog(results[key]);
    //                         if(results[key].title.toLowerCase() !== searchQuery.toLowerCase()){
    //                             tempResults = [...tempResults,{key: key, title: results[key].title, extract: results[key].extract, image: results[key].thumbnail.source}];
    //                         }
    //                     });
    //                     break;
    //                 }
    //                 case "one": {
    //                     // Extracting one items from query and putting them into foundResults
    //                     let keys = Object.keys(results);
    //                     tempResults = [{title: results[keys[0]].title, extract: results[keys[0]].extract}]
    //                     break;
    //                 }
    //                 default: {}
    //             }
    //             loggingContext.addLog(tempResults);
    //             setFoundResults(tempResults);
    //         })
    //         .catch((err) => loggingContext.addLog("Wikipedia fetch failed with: " + err));
    // };

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
                            if(results[key].title.toLowerCase() === searchQuery.toLowerCase()){
                                tempResults = [{key: key, title: results[key].title, extract: results[key].extract}];
                            }
                        });
                        Object.keys(results).map(key => {
                            //loggingContext.addLog(results[key]);
                            if(results[key].title.toLowerCase() !== searchQuery.toLowerCase()){
                                tempResults = [...tempResults,{key: key, title: results[key].title, extract: results[key].extract}];
                            }
                        });
                        break;
                    }
                    case "one": {
                        // Extracting one items from query and putting them into foundResults
                        Object.keys(results).map(key => {
                            //loggingContext.addLog(results[key]);
                            if(results[key].title.toLowerCase() === searchQuery.toLowerCase()){
                                console.log(results[key]);
                                tempResults = [{key: key, title: results[key].title, extract: results[key].extract}];
                            }
                        });
                        if(tempResults.length === 0){
                            let keys = Object.keys(results);
                            tempResults = [{title: results[keys[0]].title, extract: results[keys[0]].extract}];
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
    }, [voiceSearch]);

    // Not functioning currently?...
    const searchCommand = {
        command: ["mirror mirror search Wikipedia"],
        answer: `Here are your results`,
        func: (() => {
            setVoiceSearch(voiceSearch => !voiceSearch);
            loggingContext.addLog("Search Command")
        })
    };

    const setRadioOne = {
        command: ["mirror mirror select one"],
        answer: `Selecting one`,
        func: () => {
            radioButtonOne.current.checked = true;
            setSearchQuantity("one");
        }
    };

    const setRadioMany = {
        command: ["mirror mirror select many", "mirror mirror select mini"],
        answer: `Selecting many`,
        func: () => {
            radioButtonMany.current.checked = true;
            setSearchQuantity("many");
        }
    };

    useEffect(() => {
        voiceContext.SpeechRecognitionHook.addCommand(searchCommand);
        voiceContext.SpeechRecognitionHook.addCommand(setRadioOne);
        voiceContext.SpeechRecognitionHook.addCommand(setRadioMany);
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
                    <InputGroupAddon addonType="append"><Button ref={searchButton} onClick={() => wiki()}>Search</Button></InputGroupAddon>
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
                                                item.thumbnail && <a rel="noopener noreferrer" href={`https://en.wikipedia.org/?curid=${item.key}`} target="_blank">
                                                    <img className="w-full max-w-xs m-auto" src={item.thumbnail.source} alt={"No image available..."} />
                                                </a>
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