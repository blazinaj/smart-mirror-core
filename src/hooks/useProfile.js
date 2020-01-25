import {useContext, useEffect} from "react";
import {Button} from "reactstrap";
import {useTable} from "./useTable";
import {useModal} from "./useModal";
import React from "react";
import {AppContext} from "../context/AppContext";
import FaceLoginSetup from "../components/Config/FaceLoginSetup/FaceLoginSetup";
import GoogleCalendarConfig from "../components/Google/GoogleCalendarConfig";
import AccountManager from "../components/AccountManager/AccountManager";
import {VoiceCommandsContext} from "../context/VoiceCommandsContext";
import {LoggingContext} from "../context/LoggingContext";

/**
 * @description A Custom hook that can be used to get Authenticated user,
 *              get an auto generated details table, or be a profile button with modal
 *
 *              NOTE: This must be used downstream of an AppContext.Provider!
 *
 * @returns {{userModalHook: {display: *, modalButton: *, modalIsOpen, setModalIsOpen}}}
 */
export const useProfile = () => {

    // Gets the AppContext. This must be used downstream of an AppContext.Provider.
    const context = useContext(AppContext);
    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const {logger} = useContext(LoggingContext);

    // The User Profile button that will open the Profile Modal
    const profileButton = <Button size="sm" className="btn-pill" color="primary">User Profile</Button>;

    // Generates a Reactstrap Table out of the authenicatedUser object
    const profileTableHook = useTable(context.mongoHook.authenticatedUser);

    const accountManagerButton = <Button size="sm" className="btn-pill" color="primary">Account</Button>;
    const accountManagerHook = useModal(<AccountManager />, "Account Manager", accountManagerButton);

    const faceLoginSetupButton = <Button size="sm" className="btn-pill" color="info">Setup Face Login</Button>;
    const faceLoginSetupHook = useModal(<FaceLoginSetup/>, "Set Up Face Login", faceLoginSetupButton);

    // Creates a Modal Hook to display User Profile details.
    const userModalHook = useModal(profileTableHook.display, (<div>User Profile {faceLoginSetupHook.modalButton}</div>), profileButton);

    const GoogleCalendarButton = <Button size="sm" className="btn-pill" color="warning">Google Calendar Config</Button>;

    const useModalGoogleCalendarConfig = useModal(<GoogleCalendarConfig />, "Google Calendar Configuration", GoogleCalendarButton);

    const showAccountCommand = {
        command: [
            "mirror mirror on the wall go to my account",
            "mirror mirror go to my account",
            "mirror mirror on the wall show my account",
            "mirror mirror show my account",
            "mirror mirror on the wall show account manager",
            "mirror mirror on the wall go to account manager",
            "mirror mirror show account manager",
            "mirror mirror go to account manager",
        ],
        answer: "Showing Account Manager",
        func: () => {
            logger.addLog("Voice Command: Showing account manager");
            accountManagerHook.setModalIsOpen(true);
        }
    };

    const hideAccountCommand = {
        command: [
            "mirror mirror on the wall hide my account",
            "mirror mirror hide my account",
            "mirror mirror on the wall hide account manager",
            "mirror mirror hide account manager",
        ],
        answer: "Hiding Account Manager",
        func: () => {
            logger.addLog("Voice Command: Hiding account manager");
            accountManagerHook.setModalIsOpen(false);
        }
    };

    useEffect(() => {
        SpeechRecognitionHook.addCommand(showAccountCommand);
        SpeechRecognitionHook.addCommand(hideAccountCommand);

        return () => {
            SpeechRecognitionHook.removeCommand(showAccountCommand);
            SpeechRecognitionHook.removeCommand(hideAccountCommand);
        }
    }, []);

    return {
        userModalHook,
        authenticatedUser: context.mongoHook.authenticatedUser,
        profileTableHook,
        useModalGoogleCalendarConfig,
        faceLoginSetupHook,
        accountManagerHook
    }
};

