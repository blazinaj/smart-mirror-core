/**
 * Description: Initializes Client and handles User Authentication flows.
 *              Wraps the "body" of the application and only allows access once Auth is initiated
 *              through the useMongo hook.
 */

import {useEffect, useState, useContext} from "react";
import {useMongo} from "../../hooks/useMongo";
import React from "react";
import {Stitch} from "mongodb-stitch-browser-sdk";
import Login from "./Login";
import {AppContext} from "../../context/AppContext";
import {LoggingContext} from "../../context/LoggingContext";

const LoginGate = (props) => {

    const [client, setClient] = useState(null);

    const logger = useContext(LoggingContext).logger;

    useEffect(() => {
        setClient(Stitch.initializeDefaultAppClient('smart-mirror-jshfq'));
        logger.addLog("Client Intitialized")
    }, []);

    const mongoHook = useMongo(client);

    return (
        <AppContext.Provider value={{mongoHook}}>
            {
                !mongoHook.isLoggedIn ?
                    <Login mongoHook={mongoHook} />
                    :
                    props.children
            }
        </AppContext.Provider>
    )
};

export default LoginGate;