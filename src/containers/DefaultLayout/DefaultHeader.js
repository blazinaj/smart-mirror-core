/**
 * Description: The Default Header for the core app.
 *              Includes the Log Out and User Profile buttons.
 */

import {useContext} from "react";
import {useProfile} from "../../hooks/useProfile";
import {Button} from "reactstrap";
import React from "react";
import {AppContext} from "../../context/AppContext";

const DefaultHeader = () => {

    const context = useContext(AppContext);

    const profileHook = useProfile();

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
                profileHook.userModalHook.modalButton
            }
            {
                profileHook.useModalGoogleCalendarConfig.modalButton
            }
        </div>
    )

};

export default DefaultHeader;