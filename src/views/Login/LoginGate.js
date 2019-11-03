/**
 * Description: Initializes Client and handles User Authentication flows.
 *              Wraps the "body" of the application and only allows access once Auth is initiated
 *              through the useMongo hook.
 */

import {useEffect, useState} from "react";
import {useMongo} from "../../hooks/useMongo";
import React from "react";
import {Stitch} from "mongodb-stitch-browser-sdk";
import Login from "./Login";
import {AppContext} from "../../context/AppContext";

const LoginGate = (props) => {

    const [client, setClient] = useState(null);

    useEffect(() => {
        setClient(Stitch.initializeDefaultAppClient('smart-mirror-jshfq'))
    }, []);

    const mongoHook = useMongo(client);

    return (
        <>
            {
                !mongoHook.isLoggedIn ?
                    <Login mongoHook={mongoHook} />
                    :
                    <AppContext.Provider value={{mongoHook}}>
                        {
                            props.children
                        }
                    </AppContext.Provider>
            }
        </>
    )
};

export default LoginGate;