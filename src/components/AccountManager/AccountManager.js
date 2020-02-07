import React, {useContext, useState, useEffect} from "react";
import {Button, Collapse, Input, InputGroup, InputGroupAddon,
    Alert} from "reactstrap"
import {AppContext} from "../../context/AppContext";
import GoogleCalendarConfig from "../Google/GoogleCalendarConfig";
import FaceLoginSetup from "../Config/FaceLoginSetup/FaceLoginSetup";
import {useDatabase} from "../../hooks/useDatabase";
import {useLogger} from "../../hooks/useLogger";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {LoggingContext} from "../../context/LoggingContext";

const AccountManager = (props) => {

    const logger = useLogger();

    // First Name State
    const [firstName, setFirstName] = useState("");
    const [changeFirstName, setChangeFirstName] = useState("");

    // Last Name State
    const [lastName, setLastName] = useState("");
    const [changeLastName, setChangeLastName] = useState("");

    // Email State
    const [email, setEmail] = useState("");
    const [changeEmail, setChangeEmail] = useState("");

    // Guest Account?
    const [isGuest, setIsGuest] = useState(true);
    const [confirmationText, setConfirmationText] = useState("Confirm");

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
        if(isAccentSetupOpen){
            toggleAccentSetup()
        }
        setInfoSetupOpen(!isInfoSetupOpen);
    };

    const [isResetPasswordOpen, setResetPasswordOpen] = useState(false);
    const toggleResetPassword = () => {
        if(isInfoSetupOpen){
            toggleInfoSetup()
        }
        if(isAccentSetupOpen){
            toggleAccentSetup()
        }
        setResetPasswordOpen(!isResetPasswordOpen);
    };

    const [isAccentSetupOpen, setIsAccentSetupOpen] = useState(false);
    const toggleAccentSetup = () => {
        if(isInfoSetupOpen){
            toggleInfoSetup();
        }
        if(isResetPasswordOpen){
            toggleResetPassword();
        }
        setIsAccentSetupOpen(!isAccentSetupOpen);
    };

    const [isFaceSetupOpen, setFaceSetupOpen] = useState(false);
    const toggleFaceSetup = () => setFaceSetupOpen(!isFaceSetupOpen);

    const [isGoogleOpen, setIsGoogleOpen] = useState(false);
    const toggleGoogle = () => setIsGoogleOpen(!isGoogleOpen);

    const context = useContext(AppContext);
    const userInfo = useDatabase();

    useEffect(() => {
        const getUserInfo = async () => {
            //let info = null;
            await userInfo.findOne('users', {userId: context.mongoHook.authenticatedUser.id})
                .then(authedUserInfo => {
                    if(authedUserInfo){
                        setEmail(authedUserInfo.email);
                        setFirstName(authedUserInfo.first_name);
                        setLastName(authedUserInfo.last_name);

                        if(authedUserInfo.guest === "false" || !authedUserInfo.guest){
                            setIsGuest(false);
                        }
                    }
                    else{
                        logger.addLog("null user!");
                    }
                })
                .catch(err => {
                    logger.addLog(`failed to fetch user info: ${err}`)
                });
        };

        getUserInfo();

        if(resetPasswordOne === "" || resetPasswordTwo === ""){
            setPasswordsMatch("Enter your new password...");
        }
        else if(resetPasswordOne === resetPasswordTwo){
            setPasswordsMatch("Passwords Match!");
        }
        else {setPasswordsMatch("Passwords do not match!")}

    }, [updateInfo, resetPasswordOne, resetPasswordTwo]);

    useEffect(() => {
        if(!isGuest){
            console.log("NotAGuest");
            setConfirmationText("Confirm");
        }
        else{
            console.log("IsAGuest");
            setConfirmationText("DISABLED");
        }
        logger.addLog("Guest: " + isGuest.toString());
    }, [isGuest]);

    const changeInfo = async () => {
        let newEmail = email;
        let newFirstName = firstName;
        let newLastName = lastName;

        if(changeEmail !== ""){newEmail = changeEmail}
        if(changeFirstName !== ""){newFirstName = changeFirstName}
        if(changeLastName !== ""){newLastName = changeLastName}

        if(!isGuest){
            let msg = await userInfo.updateOne("users", {userId: context.mongoHook.authenticatedUser.id},
                {$set: {email: newEmail, first_name: newFirstName, last_name: newLastName}});
            setUpdateInfo(!updateInfo);
            if(context.mongoHook.authenticatedUser && context.mongoHook.authenticatedUser.id){
                switch(msg.matchedCount){
                    case 0: msg = "Matched: 0\nAccount not found!";
                        break;
                    case 1: msg = "Matched: 1\nAccount found!\n"+context.mongoHook.authenticatedUser.id;
                }
            }
            else {
                logger.addLog("Authenticated user or id is null")
            }
            logger.addLog(msg);
        }
    };

    const deleteAccount = () => {
        setVisibleDeleteConfirmation(!visibleDeleteConfirmation);
    };

    // currently doesn't delete account from MongoDB
    const deleteAccountConfirmation = async () => {
        alert("Account Deleted! I guess....\nBye Bye =,(");
        // await context.mongoHook.removeUser();
    };

    const [visibleDeleteConfirmation, setVisibleDeleteConfirmation] = useState(false);
    const onDismissDeleteConfirmation = () => setVisibleDeleteConfirmation(false);

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);

    const showFaceLoginSetupCommand = {
        command: [
            "mirror mirror on the wall face login setup",
            "mirror mirror face login setup",
            "mirror mirror on the wall face setup",
            "mirror mirror face setup",
            "mirror mirror on the wall setup face login",
            "mirror mirror setup face login",
        ],
        answer: "Setting Up face login",
        func: () => {
            logger.addLog("Voice Command: Showing face login setup");
            setFaceSetupOpen(true)
        }
    };

    const closeFaceLoginSetupCommand = {
        command: [
            "mirror mirror on the wall close face login setup",
            "mirror mirror close face login setup",
            "mirror mirror on the wall close face setup",
            "mirror mirror close face setup",
            "mirror mirror on the wall close setup face login",
            "mirror mirror close setup face login",
        ],
        answer: "Closing face login setup",
        func: () => {
            logger.addLog("Voice Command: Closing face login setup");
            setFaceSetupOpen(false);
        }
    };

    useEffect(() => {
        SpeechRecognitionHook.addCommand(showFaceLoginSetupCommand);
        SpeechRecognitionHook.addCommand(closeFaceLoginSetupCommand);

        return () => {
            SpeechRecognitionHook.removeCommand(showFaceLoginSetupCommand);
            SpeechRecognitionHook.removeCommand(closeFaceLoginSetupCommand);
        }
    }, []);

    //Notes
    /*
        For the delete feature it will need to delete the users/descriptors value of itself, and the user
        from the user pool

        When email is changed, it currently only changes in users database, not what you login with
     */

    return (
        <div>
            <label>UserID: {context.mongoHook.authenticatedUser.id}</label>
            <br />
            <label>Name: {firstName} {lastName}</label>
            <br />
            <label>Username: {context.mongoHook.authenticatedUser.auth.currentUser.profile.email || email || context.mongoHook.pin}</label>

            <br />
            <br />

            <Button color="primary" onClick={toggleInfoSetup} style={{ marginBottom: '1rem' }}>Edit Personal Info</Button>
            &nbsp; &nbsp;
            {/*<Button color="primary" onClick={() => console.log("Reset password disabled")} style={{ marginBottom: '1rem' }}>DISABLED</Button>*/}
            <Button color="info" onClick={toggleAccentSetup} style={{ marginBottom: '1rem' }}>Accents</Button>
            <Collapse isOpen={isInfoSetupOpen}>
                <label>New Info</label>
                <InputGroup className={"inputGroupLogin"}>
                    <InputGroupAddon className={"pre-pend"} addonType="prepend">FirstName</InputGroupAddon>
                    <Input className={"inputField"} placeholder="Firstname..." onChange={(e) => setChangeFirstName(e.target.value)}/>
                </InputGroup>
                <InputGroup className={"inputGroupLogin"}>
                    <InputGroupAddon className={"pre-pend"} addonType="prepend">LastName</InputGroupAddon>
                    <Input className={"inputField"} placeholder="Lastname..." onChange={(e) => setChangeLastName(e.target.value)}/>
                </InputGroup>
                <br />
                {/*<InputGroup className={"inputGroupLogin"}>*/}
                {/*    <InputGroupAddon className={"pre-pend"} addonType="prepend">Email</InputGroupAddon>*/}
                {/*    <Input className={"inputField"} type="email" placeholder="Email..." onChange={(e) => setChangeEmail(e.target.value)}/>*/}
                {/*</InputGroup>*/}
                {/*<br />*/}
                <Button color="danger" onClick={() => changeInfo()}>{confirmationText}</Button>
            </Collapse>

            {/*<Collapse isOpen={isResetPasswordOpen}>*/}
            {/*    <label>{resetPasswordOne} :::WIP::: {resetPasswordTwo}</label>*/}
            {/*    <br />*/}
            {/*    <label>{passwordsMatch}</label>*/}
            {/*    <InputGroup className={"inputGroupLogin"}>*/}
            {/*        <InputGroupAddon className={"pre-pend"} addonType="prepend">New Password</InputGroupAddon>*/}
            {/*        <Input className={"inputField"} type="password" placeholder="..." onChange={(e) => setResetPasswordOne(e.target.value)}/>*/}
            {/*    </InputGroup>*/}
            {/*    <br />*/}
            {/*    <InputGroup className={"inputGroupLogin"}>*/}
            {/*        <InputGroupAddon className={"pre-pend"} addonType="prepend">New Password</InputGroupAddon>*/}
            {/*        <Input className={"inputField"} type="password" placeholder="..." onChange={(e) => setResetPasswordTwo(e.target.value)}/>*/}
            {/*    </InputGroup>*/}
            {/*    <br />*/}
            {/*    <Button color="danger" onClick={() => alert("Unimplemented...")}>{confirmationText}</Button>*/}
            {/*</Collapse>*/}

            <Collapse isOpen={isAccentSetupOpen}>
                <Button color="black" onClick={() => SpeechRecognitionHook.setLangVoice('en-US')} style={{ marginBottom: '1rem' }}>
                    <img src={require('./flags/usa.gif')} /> American Accent</Button> &nbsp;
                <Button disabled color="black" onClick={() => SpeechRecognitionHook.setLangVoice('en-EU')} style={{ marginBottom: '1rem' }}>
                    <img src={require('./flags/england.gif')} /> English Accent</Button> &nbsp;
                <Button disabled color="black" onClick={() => SpeechRecognitionHook.setLangVoice('es-MX')} style={{ marginBottom: '1rem' }}>
                    <img src={require('./flags/spain.gif')} /> Spanish Accent</Button> &nbsp;
                <Button color="black" onClick={() => SpeechRecognitionHook.setLangVoice('fr-FR')} style={{ marginBottom: '1rem' }}>
                    <img src={require('./flags/france.gif')} /> French Accent</Button> &nbsp;
                <Button color="black" onClick={() => SpeechRecognitionHook.setLangVoice('it-IT')} style={{ marginBottom: '1rem' }}>
                    <img src={require('./flags/italy.gif')} /> Italian Accent</Button> &nbsp;
                <Button color="black" onClick={() => SpeechRecognitionHook.setLangVoice('de-DE')} style={{ marginBottom: '1rem' }}>
                    <img src={require('./flags/dutch.gif')} /> Dutch Accent</Button> &nbsp;
                <Button color="black" onClick={() => SpeechRecognitionHook.setLangVoice('fr-FR')} style={{ marginBottom: '1rem' }}>
                    <img src={require('./flags/australia.gif')} /> Australian Accent</Button> &nbsp;
                <Button color="black" onClick={() => SpeechRecognitionHook.setLangVoice('en-AU')} style={{ marginBottom: '1rem' }}>
                    <img src={require('./flags/russia.gif')} /> Russian Accent</Button> &nbsp;
                <Button disabled color="black" onClick={() => SpeechRecognitionHook.setLangVoice('zh')} style={{ marginBottom: '1rem' }}>
                    <img src={require('./flags/china.gif')} /> Mandarin Accent</Button> &nbsp;
            </Collapse>

            <hr />

            <Button color="info" onClick={toggleFaceSetup} style={{ marginBottom: '1rem' }}>
                Face Login Setup
                <br/>
                <small>🎤 "mirror mirror face login setup"</small>
            </Button>
            <Collapse isOpen={isFaceSetupOpen}>
                {
                    !isGuest ?
                        <FaceLoginSetup/>
                        :
                        <label>DISABLED AS GUEST</label>
                }
            </Collapse>

            <hr />

            <Button color="warning" onClick={toggleGoogle} style={{ marginBottom: '1rem' }}>Google Calendar Config</Button>
            <Collapse isOpen={isGoogleOpen}>
                {
                    !isGuest ?
                        <GoogleCalendarConfig/>
                        :
                        <label>DISABLED AS GUEST</label>
                }
            </Collapse>

            <hr />

            {/*{*/}
            {/*    !isGuest ?*/}
            {/*        <Button color="danger" onClick={() => deleteAccount()}>Delete Account</Button>*/}
            {/*        :*/}
            {/*        <></>*/}
            {/*}*/}

            {/*<Alert color="danger" isOpen={visibleDeleteConfirmation} toggle={onDismissDeleteConfirmation}>*/}
            {/*    <label>Are you sure? </label>*/}
            {/*    &nbsp;*/}
            {/*    <Button color="danger" onClick={() => deleteAccountConfirmation()}>Confirm</Button>*/}
            {/*</Alert>*/}
        </div>
    )

};

export default AccountManager;