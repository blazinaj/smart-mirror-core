import React, {useState, useContext, useEffect} from "react"
import {Button, FormGroup, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";
import {LoggingContext} from "../../context/LoggingContext";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";

const WikipediaSearchPage = () => {

    const loggingContext = useContext(LoggingContext).logger;
    const voiceContext = useContext(VoiceCommandsContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [foundResults, setFoundResults] = useState([]);
    const [searchKeys, setSearchKeys] = useState([]);

    // True for many results, false for one
    const [searchQuantity, setSearchQuantity] = useState("many");

    const fetchResults = async () => {
        //const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
        const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${searchQuery}`;
        await fetch(url)
            .then(data => {
                loggingContext.addLog(data);
                loggingContext.addLog(data.query.pages);
                const results = data.query.pages;
                let tempResults = [];

                // Adding pages keys to array
                setSearchKeys(Object.keys(results));

                // true for many, false for one
                switch(searchQuantity){
                    case "many": {
                        // Extracting many items from query and putting them into foundResults
                        Object.keys(results).map(key => {
                            loggingContext.addLog(results[key]);
                            if(results[key].title.toLowerCase() === searchQuery.toLowerCase()){
                                tempResults = [{title: results[key].title, extract: results[key].extract}];
                            }
                        });
                        Object.keys(results).map(key => {
                            loggingContext.addLog(results[key]);
                            if(results[key].title.toLowerCase() !== searchQuery.toLowerCase()){
                                tempResults = [...tempResults,{title: results[key].title, extract: results[key].extract}];
                            }
                        });
                        break;
                    }
                    case "one": {
                        // Extracting one items from query and putting them into foundResults
                        let keys = Object.keys(results);
                        tempResults = [{title: results[keys[0]].title, extract: results[keys[0]].extract}]
                        break;
                    }
                    default: {}
                }


                loggingContext.addLog(tempResults);
                setFoundResults(tempResults);
            })
            .catch((err) => loggingContext.addLog("Wikipedia fetch failed with: " + err));
    };

    // Not functioning currently?...
    const searchCommand = {
        command: ["mirror mirror search wikipedia"],
        answer: `Here are your results`,
        func: async () => fetchResults()
    };

    useEffect(() => {
        voiceContext.SpeechRecognitionHook.addCommand(searchCommand);
    }, []);

    return (
        <div>
            <div className="col-xs-9 col-md-7" id={"inputFieldsLogin"}>
                <h2>Search <img src={require('./media/wikipedia.png')} /> Wikipedia</h2>
                <div className="pretty p-icon p-curve p-jelly">
                    <input type="radio" name="radio66" onClick={() => setSearchQuantity("one")} />
                    <div className="state p-warning">
                        <i className="icon mdi mdi-check"></i>
                        <label> One</label>
                    </div>
                </div>
                <div className="pretty p-icon p-curve p-jelly">
                    <input type="radio" name="radio66" onClick={() => setSearchQuantity("many")} defaultChecked="checked"/>
                    <div className="state p-warning">
                        <i className="icon mdi mdi-check"></i>
                        <label> Many</label>
                    </div>
                </div>
                <InputGroup className={"inputGroupLogin"}>
                    <Input type="text" value={searchQuery} placeholder="Query..." onChange={(e) => setSearchQuery(e.target.value)}/>
                    <InputGroupAddon addonType="append"><Button onClick={() => fetchResults()}>Search</Button></InputGroupAddon>
                </InputGroup>
            </div>
            <div className="col-xs-9 col-md-7" style={{margin: "auto"}}>
                {
                    foundResults.length > 0 ?
                        foundResults.map((item) => {
                            return <div>
                                        <hr />
                                            <h3>{item.title}</h3>
                                            {item.extract}
                                        <hr />
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