import {useContext} from "react";
import {Button} from "reactstrap";
import {useTable} from "./useTable";
import {useModal} from "./useModal";
import React from "react";
import {AppContext} from "../context/AppContext";
import GoogleCalendarConfig from "../views/Google/GoogleCalendarConfig";
import FaceLoginSetup from "../views/Config/FaceLoginSetup/FaceLoginSetup";

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

    // The User Profile button that will open the Profile Modal
    const profileButton = <Button size="sm" className="btn-pill" color="primary">User Profile</Button>;

    // Generates a Reactstrap Table out of the authenicatedUser object
    const profileTableHook = useTable(context.mongoHook.authenticatedUser);


    const faceLoginSetupButton = <Button size="sm" className="btn-pill" color="info">Setup Face Login</Button>;
    const faceLoginSetupHook = useModal(<FaceLoginSetup/>, "Set Up Face Login", faceLoginSetupButton);

    // Creates a Modal Hook to display User Profile details.
    const userModalHook = useModal(profileTableHook.display, (<div>User Profile {faceLoginSetupHook.modalButton}</div>), profileButton);

    const GoogleCalendarButton = <Button size="sm" className="btn-pill" color="warning">Google Calendar Config</Button>;

    const useModalGoogleCalendarConfig = useModal(<GoogleCalendarConfig />, "Google Calendar Configuration", GoogleCalendarButton);

    return {
        userModalHook,
        authenticatedUser: context.mongoHook.authenticatedUser,
        profileTableHook,
        useModalGoogleCalendarConfig,
        faceLoginSetupHook
    }
};

