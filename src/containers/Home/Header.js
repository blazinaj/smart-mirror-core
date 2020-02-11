/**
 * Description: The Default Header for the core app.
 *              Includes the Log Out and User Profile buttons.
 */

import {useContext, useEffect} from "react";
import {useProfile} from "../../hooks/useProfile";
import {Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import React from "react";
import {AppContext} from "../../context/AppContext";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {LoggingContext} from "../../context/LoggingContext";

const Header = (props) => {

    const context = useContext(AppContext);
    const loggingContext = useContext(LoggingContext).logger;

    const profileHook = useProfile();

    const {debuggingTools} = context;
    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);

    const changeAccent = {
        command: ["mirror mirror accent"],
        answer: "",
        func: (value) => {
            let accent = value.substring(21).toLocaleLowerCase();
            switch (accent) {
                case "american": {
                    SpeechRecognitionHook.setLangVoice('en-US');
                    loggingContext.addLog("Changed to American accent");
                    break;
                }
                case "british": {
                    SpeechRecognitionHook.setLangVoice('en-GB');
                    loggingContext.addLog("Changed to British accent");
                    break;
                }
                case "spanish": {
                    SpeechRecognitionHook.setLangVoice('es-ES');
                    loggingContext.addLog("Changed to spanish accent");
                    break;
                }
                case "french": {
                    SpeechRecognitionHook.setLangVoice('fr-FR');
                    loggingContext.addLog("Changed to french accent");
                    break;
                }
                case "italian": {
                    SpeechRecognitionHook.setLangVoice('it-IT');
                    loggingContext.addLog("Changed to italian accent");
                    break;
                }
                case "portuguese": {
                    SpeechRecognitionHook.setLangVoice('pt-BR');
                    loggingContext.addLog("Changed to portuguese accent");
                    break;
                }
                case "dutch": {
                    SpeechRecognitionHook.setLangVoice('de-DE');
                    loggingContext.addLog("Changed to dutch accent");
                    break;
                }
                case "russian": {
                    SpeechRecognitionHook.setLangVoice('ru-RU');
                    loggingContext.addLog("Changed to russian accent");
                    break;
                }
                case "japanese": {
                    SpeechRecognitionHook.setLangVoice('ja-JP');
                    loggingContext.addLog("Changed to japanese accent");
                    break;
                }
                case "chinese": {
                    SpeechRecognitionHook.setLangVoice('zh-CN');
                    loggingContext.addLog("Changed to chinese accent");
                    break;
                }
                default: //Do nothing
            }
        }
    };

    useEffect(() => {
        SpeechRecognitionHook.addCommand(changeAccent);
        return () => {
            SpeechRecognitionHook.removeCommand(changeAccent);
        }
    }, []);

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
                                      onClick={() => {
                                          props.history.push("/");
                                          SpeechRecognitionHook.setLangVoice('en-US');
                                          SpeechRecognitionHook.changeLanguage('en-AU');
                                      }}>
                            Home
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => {
                                          props.history.push("/voice_demo");
                                          SpeechRecognitionHook.setLangVoice('en-US');
                                          SpeechRecognitionHook.changeLanguage('en-AU');
                                      }}>
                            Voice Demo
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => {
                                          props.history.push("/gesture_paint");
                                          SpeechRecognitionHook.setLangVoice('en-US');
                                          SpeechRecognitionHook.changeLanguage('en-AU');
                                      }}>
                            Gesture (Paint)
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => {
                                          props.history.push("/gesture_click_me_game");
                                          SpeechRecognitionHook.setLangVoice('en-US');
                                          SpeechRecognitionHook.changeLanguage('en-AU');
                                      }}>
                            Gesture (ClickGame)
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => {
                                          props.history.push("/gesture_show_hands");
                                          SpeechRecognitionHook.setLangVoice('en-US');
                                          SpeechRecognitionHook.changeLanguage('en-AU');
                                      }}>
                            Gesture (ShowHands)
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => {
                                          props.history.push("/devotions");
                                          SpeechRecognitionHook.setLangVoice('en-US');
                                          SpeechRecognitionHook.changeLanguage('en-AU');
                                      }}>
                            Devotions
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => {
                                          props.history.push("/face_demo");
                                          SpeechRecognitionHook.setLangVoice('en-US');
                                          SpeechRecognitionHook.changeLanguage('en-AU');
                                      }}>
                            Face Demo
                        </DropdownItem>
                        <DropdownItem className="dropdownItem"
                                      onClick={() => {
                                          props.history.push("/search_wikipedia");
                                          SpeechRecognitionHook.setLangVoice('en-US');
                                          SpeechRecognitionHook.changeLanguage('en-AU');
                                      }}>
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
                        <DropdownItem className="dropdownItem"
                                      onClick={() => {
                                          props.history.push("/help_page");
                                          SpeechRecognitionHook.setLangVoice('en-US');
                                          SpeechRecognitionHook.changeLanguage('en-AU');
                                      }}>
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
                        <DropdownItem className="dropdownItem"
                                      href="https://github.com/blazinaj/smart-mirror-core/tree/master">
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