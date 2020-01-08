import React, {useContext, useState, useEffect} from "react";
import {Button, Collapse, Input, InputGroup, InputGroupAddon,
        Alert} from "reactstrap"
import {AppContext} from "../../context/AppContext";
import GoogleCalendarConfig from "../Google/GoogleCalendarConfig";
import FaceLoginSetup from "../Config/FaceLoginSetup/FaceLoginSetup";
import {useDatabase} from "../../hooks/useDatabase";

const AccountManager = (props) => {

    // First Name State
    const [firstName, setFirstName] = useState("EMPTY");
    const [changeFirstName, setChangeFirstName] = useState("");

    // Last Name State
    const [lastName, setLastName] = useState("EMPTY");
    const [changeLastName, setChangeLastName] = useState("");

    // Email State
    const [email, setEmail] = useState("EMPTY");
    const [changeEmail, setChangeEmail] = useState("");

    //TEMP - PASSWORD STATE
    const [password, setPassword] = useState(""); //DEV USE ONLY - DELETE AFTER TESTING

    // Reset Password States
    const [resetPasswordOne, setResetPasswordOne] = useState("");
    const [resetPasswordTwo, setResetPasswordTwo] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState("Enter your new password...");

    // Redraw Page State
    const [updateInfo, setUpdateInfo] = useState(false);

    // Collapsing Drawer States
    const [isInfoSetupOpen, setInfoSetupOpen] = useState(false);
    const toggleInfoSetup = () => {
        if(isResetPasswordOpen){
            toggleResetPassword();
        }
        setInfoSetupOpen(!isInfoSetupOpen);
    };

    const [isResetPasswordOpen, setResetPasswordOpen] = useState(false);
    const toggleResetPassword = () => {
        if(isInfoSetupOpen){
            toggleInfoSetup()
        }
        setResetPasswordOpen(!isResetPasswordOpen);
    };

    const [isFaceSetupOpen, setFaceSetupOpen] = useState(false);
    const toggleFaceSetup = () => setFaceSetupOpen(!isFaceSetupOpen);

    const [isGoogleOpen, setIsGoogleOpen] = useState(false);
    const toggleGoogle = () => setIsGoogleOpen(!isGoogleOpen);

    const context = useContext(AppContext);
    const userInfo = useDatabase();

    useEffect(() => {
        const getInfo = async () => {
            let info = await userInfo.findOne('face_descriptors', {owner_id: context.mongoHook.authenticatedUser.id})
                .then(authedUserInfo => {
                    return authedUserInfo;
                });
            if (info != null) {
                setPassword(info.password); //DEV USE ONLY - DELETE AFTER TESTING
            }
        };

        const getUserInfo = async () => {
            let info = await userInfo.findOne('users', {userId: context.mongoHook.authenticatedUser.id})
                .then(authedUserInfo => {
                    return authedUserInfo;
                });
            if (info != null) {
                setEmail(info.email);
                setFirstName(info.first_name);
                setLastName(info.last_name);
            }
        };

        getInfo();
        getUserInfo();

        if(resetPasswordOne === "" || resetPasswordTwo === ""){
            setPasswordsMatch("Enter your new password...");
        }
        else if(resetPasswordOne === resetPasswordTwo){
            setPasswordsMatch("Passwords Match!");
        }
        else {setPasswordsMatch("Passwords do not match!")}

    }, [updateInfo, resetPasswordOne, resetPasswordTwo]);

    const changeInfo = async () => {
        let msg = await userInfo.updateOne("users", {userId: context.mongoHook.authenticatedUser.id},
            {$set: {email: changeEmail, first_name: changeFirstName, last_name: changeLastName}});
        setUpdateInfo(!updateInfo);
        switch(msg.matchedCount){
            case 0: msg = "Matched: 0\nAccount not found!";
                        break;
            case 1: msg = "Matched: 1\nAccount found!\n"+context.mongoHook.authenticatedUser.id;
        }
        console.log(msg);
    };

    const deleteAccount = () => {
        setVisibleDeleteConfirmation(!visibleDeleteConfirmation);
    };

    const deleteAccountConfirmation = () => {
      alert("Account Deleted! I guess....\nBye Bye =,(")
    };

    const [visibleDeleteConfirmation, setVisibleDeleteConfirmation] = useState(false);
    const onDismissDeleteConfirmation = () => setVisibleDeleteConfirmation(false);

    //Notes
    /*
        User pool pass and descriptor pass are separate from eachother.
        Modification to both use pool pass and database plain text are required until changed!

        For the delete feature it will need to delete the users/descriptors value of itself, and the user
        from the user pool
     */

    return (
        <div>

            <label>UserID: {context.mongoHook.authenticatedUser.id}</label>
            <br />
            <label>Name: {firstName} {lastName}</label>
            <br />
            <label>Email: {email}</label>
            <br />
            <label>(DEV USE ONLY) Password: {password}</label>

            <br />
            <br />

            <Button color="primary" onClick={toggleInfoSetup} style={{ marginBottom: '1rem' }}>Edit Personal Info</Button>
            <label>--</label>
            <Button color="primary" onClick={toggleResetPassword} style={{ marginBottom: '1rem' }}>Change Password</Button>
            <Collapse isOpen={isInfoSetupOpen}>
                <label>WIP - New Info</label>
                <InputGroup className={"inputGroupLogin"}>
                    <InputGroupAddon className={"pre-pend"} addonType="prepend">FirstName</InputGroupAddon>
                    <Input className={"inputField"} placeholder="Firstname..." onChange={(e) => setChangeFirstName(e.target.value)}/>
                </InputGroup>
                <InputGroup className={"inputGroupLogin"}>
                    <InputGroupAddon className={"pre-pend"} addonType="prepend">LastName</InputGroupAddon>
                    <Input className={"inputField"} placeholder="Lastname..." onChange={(e) => setChangeLastName(e.target.value)}/>
                </InputGroup>
                <br />
                <InputGroup className={"inputGroupLogin"}>
                    <InputGroupAddon className={"pre-pend"} addonType="prepend">Email</InputGroupAddon>
                    <Input className={"inputField"} type="email" placeholder="Email..." onChange={(e) => setChangeEmail(e.target.value)}/>
                </InputGroup>
                <br />
                <Button color="danger" onClick={changeInfo}>Confirm</Button>
            </Collapse>

            <Collapse isOpen={isResetPasswordOpen}>
                <label>{resetPasswordOne} :::WIP::: {resetPasswordTwo}</label>
                <br />
                <label>{passwordsMatch}</label>
                <InputGroup className={"inputGroupLogin"}>
                    <InputGroupAddon className={"pre-pend"} addonType="prepend">New Password</InputGroupAddon>
                    <Input className={"inputField"} type="password" placeholder="..." onChange={(e) => setResetPasswordOne(e.target.value)}/>
                </InputGroup>
                <br />
                <InputGroup className={"inputGroupLogin"}>
                    <InputGroupAddon className={"pre-pend"} addonType="prepend">New Password</InputGroupAddon>
                    <Input className={"inputField"} type="password" placeholder="..." onChange={(e) => setResetPasswordTwo(e.target.value)}/>
                </InputGroup>
                <br />
                <Button color="danger">Confirm</Button>
            </Collapse>

            <hr />

            <Button color="info" onClick={toggleFaceSetup} style={{ marginBottom: '1rem' }}>Face Login Setup</Button>
            <Collapse isOpen={isFaceSetupOpen}>
                <FaceLoginSetup/>
            </Collapse>

            <hr />

            <Button color="warning" onClick={toggleGoogle} style={{ marginBottom: '1rem' }}>Google Calendar Config</Button>
            <Collapse isOpen={isGoogleOpen}>
                <GoogleCalendarConfig/>
            </Collapse>

            <hr />

            <Button color="danger" onClick={deleteAccount}>Delete Account</Button>
            <Alert color="danger" isOpen={visibleDeleteConfirmation} toggle={onDismissDeleteConfirmation}>
                <label>Are you sure? </label>
                &nbsp;
                <Button color="danger" onClick={deleteAccountConfirmation}>Confirm</Button>
            </Alert>
        </div>
    )

};

export default AccountManager;