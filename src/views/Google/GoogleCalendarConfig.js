import {Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import qs from 'qs';
import {AppContext} from "../../context/AppContext";

const GoogleCalendarConfig = () => {

    const [authorizeURL, setAuthorizeURL] = useState(null);
    const [code, setCode] = useState('');
    const [apiResponse, setApiResponse] = useState('');

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const context = useContext(AppContext);

    useEffect(() => {

        axios.get("https://mysterious-cliffs-04726.herokuapp.com/googleAuth").then(res => {
            const url = res.data;
            setAuthorizeURL(url);
        }).catch((err) => console.log(err));

    }, []);

    const apiCall = () => {
        axios.post("https://mysterious-cliffs-04726.herokuapp.com/google-get-code", qs.stringify({
            code: code,
            userId: context && context.mongoHook && context.mongoHook.authenticatedUser && context.mongoHook.authenticatedUser.id
        }), config).then((res) => setApiResponse("Success! You all set! Please Logout"))
            .catch((err) => setApiResponse("Something when wrong, please try again!"));
    };


    return (
        <div align="center">
            <InputGroup className="justify-content-center">
                <Button
                    color="primary"
                    onClick={
                        () => window.open(authorizeURL, "_blank")
                    }
                >
                    Get Authorization Code
                </Button>
            </InputGroup>
            <br/>
            <InputGroup className="justify-content-center">
                <InputGroupAddon className={"pre-pend"} addonType="prepend">Code: </InputGroupAddon>
                <Input type="text" value={code} placeholder="Paste Code here..."
                       onChange={(e) => setCode(e.target.value)}/>
            </InputGroup>
            <br/>
            <InputGroup className="justify-content-center">
                <Button
                    disabled={!code}
                    onClick={() => apiCall()}
                >
                    Send Code
                </Button>
            </InputGroup>
            {apiResponse ? <p>{apiResponse}</p> : null}
        </div>
    )
};

export default GoogleCalendarConfig;