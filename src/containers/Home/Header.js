/**
 * Description: The Default Header for the core app.
 *              Includes the Log Out and User Profile buttons.
 */

import {useContext, useState} from "react";
import {useProfile} from "../../hooks/useProfile";
import {Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import React from "react";
import {AppContext} from "../../context/AppContext";

const Header = (props) => {

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
                    color: "white",
                    display: "flex"
                }}
            >
                <img src={"/logo1.gif"} alt="logo" style={{width: "12%"}}/>
            </div>
            <div
                style={{
                    position: "absolute",
                    right: "10%",
                    top: "0"
                }}>
                <UncontrolledDropdown>
                    <DropdownToggle id="dropdown" nav caret>
                        Navigation
                    </DropdownToggle>
                    <DropdownMenu right id="dropdownMenu" modifiers={{
                        setMaxHeight: {
                            enabled: true,
                            order: 890,
                            fn: (data) => {
                                return {
                                    ...data,
                                    styles: {
                                        ...data.styles,
                                        overflow: 'auto',
                                        maxHeight: '250px',

                                    },
                                };
                            },
                        },
                    }}>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => props.history.push("/")}>
                            Home
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => props.history.push("/voice_demo")}>
                            Voice Demo
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => props.history.push("/gesture_paint")}>
                            Gesture (Paint)
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => props.history.push("/gesture_click_me_game")}>
                            Gesture (ClickGame)
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => props.history.push("/gesture_show_hands")}>
                            Gesture (ShowHands)
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => props.history.push("/devotions")}>
                            Devotions
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => props.history.push("/face_demo")}>
                            Face Demo
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => props.history.push("/search_wikipedia")}>
                            Search Wikipedia
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => props.history.push("/russian_page")}>
                            Russian Demo
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => props.history.push("/french_page")}>
                            French Demo
                        </DropdownItem>
                        <DropdownItem disabled className="dropdownItem"
                                      onClick={() => props.history.push("/help_page")}>
                            Help Page
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
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