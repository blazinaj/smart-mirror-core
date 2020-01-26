import React, {useState} from "react"
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import axios from "axios";

const WikipediaSearchPage = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [fullResults, setFullResults] = useState([]);
    const [foundResults, setFoundResults] = useState(["Hello", "Testing"]);

    const fetchResults = () => {
        //const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
        const endpoint = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${searchQuery}`;
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data.query.pages);
                const results = data.query.pages;
                let tempResults = [];
                //console.log(results);
                // results.map((item) => {
                //     console.log(item);
                //     //tempResults = [...tempResults, {title: item.title, snippet: item.snippet}];
                // });
                Object.keys(results).map(key => {
                   console.log(results[key]);
                    tempResults = [...tempResults, {title: results[key].title, extract: results[key].extract}];
                });
                console.log(tempResults);
                setFoundResults(tempResults);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h2>Search Wikipedia</h2>
            <div className="col-xs-9 col-md-7" id={"inputFieldsLogin"}>
                <InputGroup className={"inputGroupLogin"}>
                    <Input type="text" value={searchQuery} placeholder="Query..." onChange={(e) => setSearchQuery(e.target.value)}/>
                    <InputGroupAddon addonType="append"><Button onClick={() => fetchResults()}>Search</Button></InputGroupAddon>
                </InputGroup>
            </div>
            <div>
                {
                    foundResults ?
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