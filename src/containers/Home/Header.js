/**
 * Description: The Default Header for the core app.
 *              Includes the Log Out and User Profile buttons.
 */

import {useContext, useEffect} from "react";
import {useProfile} from "../../hooks/useProfile";
import {Button} from "reactstrap";
import React from "react";
import {AppContext} from "../../context/AppContext";
import {useGreetingMessage} from "../../hooks/useGreetingMessage";

const Header = () => {

    const context = useContext(AppContext);

    const profileHook = useProfile();
    const greetingHook = useGreetingMessage();

    useEffect(() => {
        if(context.mongoHook.firstName !== ""){
            console.log("Name");
            console.log(context.mongoHook.firstName + " " + context.mongoHook.lastName);
            greetingHook.setName(context.mongoHook.firstName);
        }
    }, [context.mongoHook.firstName]);

    return (
        <div
            style={{
                width: "100%",
                height: "5%",
                backgroundColor: "black",
                color: "white"
            }}
        >
            <h1>Smart Mirror Core</h1>
            <Button color="danger" onClick={() => context.mongoHook.logout()}>Log Out</Button>
            {
                profileHook.accountManagerHook.modalButton
            }
        </div>
    )

};

export default Header;