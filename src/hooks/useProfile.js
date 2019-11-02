import {useContext} from "react";
import {Button} from "reactstrap";
import {useTable} from "./useTable";
import {useModal} from "./useModal";
import React from "react";
import {AppContext} from "../context/AppContext";

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

    // Creates a Modal Hook to display User Profile details.
    const userModalHook = useModal(profileTableHook.display, "User Profile", profileButton);

    return {
        userModalHook,
        authenticatedUser: context.mongoHook.authenticatedUser,
        profileTableHook
    }
};

