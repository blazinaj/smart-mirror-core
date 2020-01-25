import React, {useState, useEffect, useContext} from "react";
//import './Search.css';
import axios from "axios";

const Search = () => {

    //Image search state variables
    const [query, setQuery] = useState("");
    const [results,setResults] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageNo, setCurrentPageNo] = useState(0);
    const [cancel, setCancel] = useState(null);

    const searchFor = (newQuery) => {
       setQuery(newQuery);
        //fetchSearchResults(1, newQuery);
       // console.log(query);
    }

    useEffect( () => {
        //console.log(query);
    }, [query]);

    const getPageCount = ( total, denominator ) => {
        const divisible	= 0 === total % denominator;
        const valueToBeAdded = divisible ? 0 : 1;
        return Math.floor( total/denominator ) + valueToBeAdded;
    };

    const fetchSearchResults = ( updatedPageNo = '', query ) => {
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        const searchUrl = `https://pixabay.com/api/?key=12413278-79b713c7e196c7a3defb5330e&q=${query}${pageNumber}`;

        if( cancel ) {
            setCancel(cancel.cancel());
        }

        setCancel(axios.CancelToken.source());

        axios.get( searchUrl, {
            cancelToken: cancel.token
        } )
            .then( res => {
                const total = res.data.total;
                const totalPagesCount = getPageCount( total, 20 );
                const resultNotFoundMsg = ! res.data.hits.length
                    ? 'There are no more search results. Please try a new search'
                    : '';

                setResults(res.data.hits);
                setMessage(resultNotFoundMsg);
                setTotalResults(total);
                setTotalPages(totalPagesCount);
                setCurrentPageNo(updatedPageNo);
                setLoading(false);

            } )
            .catch( error => {
                    if ( axios.isCancel(error) || error ) {
                        setLoading(false);
                        setMessage('Failed to fetch the data. Please check network');
                    }
                }
            )
    };

    const mySearchBox =
        <>
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
            <div>
                <h1>Searching for ... {query}</h1>
            </div>
        </>
    ;

    return {
        mySearchBox,
        searchFor
    }

};


export default Search;
