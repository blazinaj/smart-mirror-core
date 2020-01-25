/**
 * Description: The Default Header for the core app.
 *              Includes the Log Out and User Profile buttons.
 */

import {useContext} from "react";
import {useProfile} from "../../hooks/useProfile";
import {Button, DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from "reactstrap";
import React from "react";
import {AppContext} from "../../context/AppContext";

const Header = () => {

    const context = useContext(AppContext);

    const profileHook = useProfile();

    const {debuggingTools} = context;

    return (
        <>
            <label
                style={{
                    position: "absolute",
                    left: "50%",
                    "-webkit-transform": "translateX(-50%)",
                    transform: "translateX(-50%)",
                    color: "white"
                }}
            >
                (Say "Mirror mirror help page" for a list of commands)</label>
            <div
                style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "black",
                    color: "white"
                }}
            >
                <img src={"/logo1.gif"} alt="logo" style={{width: "12%"}}/>
            </div>
            <div
                style={{
                    position: "absolute",
                    right: "0",
                    top: "0"
                }}
            >
                <UncontrolledDropdown>
                    <DropdownToggle id="dropdown" nav caret>
                        Developers
                    </DropdownToggle>
                    <DropdownMenu right id="dropdownMenu">
                        <DropdownItem className="dropdownItem" href="https://github.com/blazinaj/smart-mirror-core/tree/master">
                            Github
                        </DropdownItem>
                        <DropdownItem
                            className="dropdownItem"
                            onClick={() => debuggingTools.setShowLogger(!debuggingTools.showLogger)}
                        >
                            {debuggingTools.showLogger ? "Hide" : "Show"} Logger
                        </DropdownItem>
                        <DropdownItem
                            className="dropdownItem"
                            onClick={() => debuggingTools.setShowTranscript(!debuggingTools.showTranscript)}
                        >
                            {debuggingTools.showTranscript ? "Hide" : "Show"} Transcript
                        </DropdownItem>
                        <DropdownItem
                            className="dropdownItem"
                            onClick={() => debuggingTools.setShowIntendArray(!debuggingTools.showIntendArray)}
                        >
                            {debuggingTools.showIntendArray ? "Hide" : "Show"} Current Commands
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <Button color="danger" size="sm" onClick={() => context.mongoHook.logout()}>Log Out</Button>
                &nbsp;
                {
                    profileHook.accountManagerHook.modalButton
                }
            </div>
        </>
    )

};

export default Header;