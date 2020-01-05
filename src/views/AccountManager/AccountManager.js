import React, {useContext, useState} from "react";
import {Button, Collapse, Input, InputGroup, InputGroupAddon} from "reactstrap"
import {AppContext} from "../../context/AppContext";
import {useProfile} from "../../hooks/useProfile";
import GoogleCalendarConfig from "../Google/GoogleCalendarConfig";
import FaceLoginSetup from "../Config/FaceLoginSetup/FaceLoginSetup";

const AccountManager = (props) => {

    // state for user info?
    // const [isFaceSetupOpen, setFaceSetupOpen] = useState(false);
    // const toggleFaceSetup = () => setFaceSetupOpen(!isFaceSetupOpen);

    // <Button color="info" onClick={toggleFaceSetup} style={{ marginBottom: '1rem' }}>User Info</Button>
    // <Collapse isOpen={isFaceSetupOpen}>
    //    <label>User Info</label>
    // </Collapse>

    //-------------------------------------------------------------

    const [firstName, setFirstName] = useState("Firstname");
    const [lastName, setLastName] = useState("Lastname");

    const [isInfoSetupOpen, setInfoSetupOpen] = useState(false);
    const toggleInfoSetup = () => setInfoSetupOpen(!isInfoSetupOpen);

    const [isFaceSetupOpen, setFaceSetupOpen] = useState(false);
    const toggleFaceSetup = () => setFaceSetupOpen(!isFaceSetupOpen);

    const [isGoogleOpen, setIsGoogleOpen] = useState(false);
    const toggleGoogle = () => setIsGoogleOpen(!isGoogleOpen);

    const context = useContext(AppContext);
    const profileHook = useProfile();

    //Notes for later when DB is working again in local
    /*
        change the way firstname/lastname input interacts with the page so it doesn't automatically change the value,
        and instead changes the database on confirm and the label pulls from database


     */

    return (
        <div>

            <label>{firstName} {lastName}</label>

            <br />
            <br />

            <Button color="primary" onClick={toggleInfoSetup} style={{ marginBottom: '1rem' }}>Edit Personal Info</Button>
            <Collapse isOpen={isInfoSetupOpen}>
                <label>WIP</label>
                <InputGroup className={"inputGroupLogin"}>
                    <InputGroupAddon className={"pre-pend"} addonType="prepend">FirstName</InputGroupAddon>
                    <Input className={"inputField"} placeholder="Firstname..." onChange={(e) => setFirstName(e.target.value)}/>
                </InputGroup>
                <InputGroup className={"inputGroupLogin"}>
                    <InputGroupAddon className={"pre-pend"} addonType="prepend">LastName</InputGroupAddon>
                    <Input className={"inputField"} placeholder="Lastname..." onChange={(e) => setLastName(e.target.value)}/>
                </InputGroup>
                <br />
                <Button color="danger">Confirm</Button>
            </Collapse>

            <hr />

            <Button color="info" onClick={toggleFaceSetup} style={{ marginBottom: '1rem' }}>Face Login Setup</Button>
            <Collapse isOpen={isFaceSetupOpen}>
                <label>403: Stitch Client Unavailable</label>
            </Collapse>

            <hr />

            <Button color="warning" onClick={toggleGoogle} style={{ marginBottom: '1rem' }}>Google Calendar Config</Button>
            <Collapse isOpen={isGoogleOpen}>
                <GoogleCalendarConfig/>
            </Collapse>
        </div>
    )

};

export default AccountManager;