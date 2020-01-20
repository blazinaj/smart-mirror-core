import React, {useState, useEffect, useContext} from "react";

const Search = (props) => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    return (
        <div className="container">
            {/*Heading*/}
            <h2 className="heading">Live Search: React Application</h2>
            {/*Search Input*/}
            <label className="search-label" htmlFor="search-input">
                <input
                    type="text"
                    value=""
                    id="search-input"
                    placeholder="Search..."
                />
                <i className="fa fa-search search-icon"/>
            </label>

        </div>
    )
};


export default Search;
