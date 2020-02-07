import React, {useState, useEffect, useContext} from "react";
import '../components/VoiceDemo/Search.css';
import axios from "axios";

const useImageSearch = () => {

    //Image search state variables
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageNo, setCurrentPageNo] = useState(0);
    const [cancel, setCancel] = useState(null);

    const searchFor = (newQuery) => {
        setQuery(newQuery);
        fetchSearchResults(1, newQuery);  //initial setting the page number to just be one page
        // console.log(query);
    };

    useEffect(() => {
        //this was required to get the query state var to be rendered.
    }, [query]);

    const getPageCount = (total, denominator) => {
        const divisible = 0 === total % denominator;
        const valueToBeAdded = divisible ? 0 : 1;
        return Math.floor(total / denominator) + valueToBeAdded;
    };

    const fetchSearchResults = (updatedPageNo = '', query) => {
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        const searchUrl = `https://pixabay.com/api/?key=12413278-79b713c7e196c7a3defb5330e&q=${query}${pageNumber}`;

        if (cancel) {
            setCancel(cancel.cancel());
        }

        setCancel(axios.CancelToken.source());

        axios.get(searchUrl, {
            cancel //was originally "cancelToken: this.cancel.token"

        })
            .then(res => {
                const total = res.data.total;
                const totalPagesCount = getPageCount(total, 4);  //Limit to 4 results, for a 2x2 grid of pictures.
                const resultNotFoundMsg = !res.data.hits.length
                    ? 'There are no more search results. Please try a new search'
                    : '';

                setResults(res.data.hits);
                setMessage(resultNotFoundMsg);
                setTotalResults(total);
                setTotalPages(totalPagesCount);
                setCurrentPageNo(updatedPageNo);
                setLoading(false);
                // console.log(res);  //Debug

            })
            .catch(error => {
                    if (axios.isCancel(error) || error) {
                        setLoading(false);
                        setMessage('Failed to fetch the data. Please check network');
                    }
                }
            )

    };

    const mySearchBox =
        <>
            <h1>Searching for ... {query}</h1>
        </>
    ;

    const renderSearchResults = () => {
        //const { results } = this.state;


        if (Object.keys(results).length && results.length) {
            // alert("made it past the if statement in the renderSearchResults"); //Debug

            return (
                <div className="results-container">
                    {results.map(result => {
                        return (
                            <a key={result.id} href={result.previewURL} className="result-item">

                                <div className="image-wrapper">
                                    <img className="image" src={result.previewURL} alt={`${result.username} image`}/>
                                </div>
                            </a>
                        )
                    })}

                </div>
            )
        }
    };

    return {
        mySearchBox,
        renderSearchResults,
        searchFor
    }

};


export default useImageSearch;
