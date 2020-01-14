/**
 * Description: A Simple Form for Logging in / Registering with an Email and Password.
 *              Uses a required mongoHook prop to send email/password to login() or register() function.
 *
 *              NOTE: AutoConfirm is currently turned on in Stitch settings.
 */

import {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {
    Alert, Button, Collapse, DropdownItem, DropdownMenu, DropdownToggle,
    Form, Input, InputGroup, InputGroupAddon, ModalBody, Nav, Navbar, NavbarBrand,
    NavbarToggler, UncontrolledDropdown
} from "reactstrap";
import React from "react";
import Styles from "./css/styles.css";
import useFace from "../../hooks/useFace";
import * as faceapi from "face-api.js";
import {Stitch} from "mongodb-stitch-browser-core";
import {RemoteMongoClient} from "mongodb-stitch-browser-services-mongodb-remote";
import {useHistory, useLocation} from "react-router-dom";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";
import {LoggingContext} from "../../context/LoggingContext";
import {AppContext} from "../../context/AppContext";

const Login = (props) => {

    const [loginAttempt, setLoginAttempt] = useState(1);
    const [faceLoginStatus, setFaceLoginStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const manualLoginCommand = {
        command: "Mirror mirror on the wall Log me in",
        answer: "Yes sir, logging in",
        func: () => login()
    };

    const faceLoginCommand = {
        command: ["Face Login", "mirror mirror on the wall check my face", "mirror mirror on the wall face log in"],
        answer: "I'm Trying to detect your face",
        func: async () => {
            let descriptor = await faceApiHook.getDescriptorsFromImage("jacob", "video-feed");
            console.log("Got Descriptor: " + JSON.stringify(descriptor));
            await matchFace(descriptor);
        }
    };

    const guestLoginCommand = {
        command: ["mirror mirror on the wall login as guest"],
        answer: "Logging in as guest user!",
        func: () => loginGuest()
    };

    const demoLoginCommand = {
        command: ["mirror mirror on the wall demo account"],
        answer: "Starting up demo!",
        func: () => login("DemoAccount", "DemoAccount")
    };

    const faceApiHook = useFace();
    const loggingContext = useContext(LoggingContext).logger;
    const voiceContext = useContext(VoiceCommandsContext);
    const debuggingTools = useContext(AppContext).debuggingTools;

    useEffect(() => {
        voiceContext.SpeechRecognitionHook.addCommand(manualLoginCommand);
        voiceContext.SpeechRecognitionHook.addCommand(faceLoginCommand);
        voiceContext.SpeechRecognitionHook.addCommand(guestLoginCommand);
        voiceContext.SpeechRecognitionHook.addCommand(demoLoginCommand);
    }, []);

    useEffect(() => {

        const initialFaceLogin = async () => {
            await tryFaceLogin();
        };

        if (!faceApiHook.modelsAreLoading){
            loggingContext.addLog("Trying Initial Face Login");
            window.setTimeout(() => {
                initialFaceLogin();
            }, 1000)
        }
        else {
            loggingContext.addLog("Couldn't perform Initial Face Login: Models are still loading");
        }
    }, [faceApiHook.modelsAreLoading]);

    const matchFace = async (descriptor) => {
        if (isLoading) {
            return;
        }
        else {
            setIsLoading(true);
        }
        const client = Stitch.defaultAppClient;

        const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('smart_mirror');
        loggingContext.addLog("Trying to match Face to user ID: " + client.auth.user.id + "...");
        let faces = await db.collection('face_descriptors').find({}, { limit: 100}).asArray();
        loggingContext.addLog("Fetched Faces from database: " + JSON.stringify(faces));
        loggingContext.addLog("Trying to match face..");

        if (!descriptor) {
            setFaceLoginStatus("Could not match face!!!");
            setIsLoading(false);
            return null;
        }

        let match = null;

        for (let faceObjectInDatabase of faces) {

            let descArray = [];

            if (!faceObjectInDatabase || !faceObjectInDatabase.descriptor || !faceObjectInDatabase.descriptor.descriptors || faceObjectInDatabase.descriptor.descriptors.length < 1) {
                return;
            }

            for (let entry of faceObjectInDatabase.descriptor.descriptors) {
                let desc = [];

                for (let num of entry) {
                    desc.push(num)
                }

                descArray.push(desc)
            }

            const dist = await faceapi.euclideanDistance(descArray[0], descriptor.descriptors[0]);

            console.log("euclidean distance: " + dist);

            if (dist < 0.5) {
                setIsLoading(false);
                match = faceObjectInDatabase.owner_id;
                setEmail(faceObjectInDatabase.email);
                setPassword(faceObjectInDatabase.password);
                setFaceLoginStatus("Hello - " + faceObjectInDatabase.email + ". Logging you in now..");
                voiceContext.SpeechRecognitionHook.speak(`Face Matched with ${100 - dist.toFixed(2) * 100}% accuracy. Hello ${faceObjectInDatabase.email}, you are now logged in.`);
                login(faceObjectInDatabase.email, faceObjectInDatabase.password);
                break;
            } else {
                setFaceLoginStatus("Hmm.. we couldn't recognize your face. Please try again.");
                setIsLoading(false);
            }

        }

        loggingContext.addLog("Match = " + match);
    };

    let tryFaceLogin = async () => {
        setLoginAttempt(loginAttempt => loginAttempt + 1);
        loggingContext.addLog(`Trying Face Login [Attempt ${loginAttempt}]`);
        let descriptor = await faceApiHook.getDescriptorsFromImage("jacob", "video-feed");
        loggingContext.addLog("Got Descriptor: " + JSON.stringify(descriptor));
        await matchFace(descriptor);
    };

    // These settings store state of email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Login function
    const login = async (optionalEmail, optionalPassword) => {
        let result = await props.mongoHook.login(optionalEmail || email, optionalPassword || password);
        if(result){
            setVisibleIncorrectInformation();
        }
        else {
            history.push("/");
        }
    };

    const loginGuest = async () => {
        let result = await props.mongoHook.loginGuestUser();
        if(result){
            alert("Guest user malfunctioned, please try again!");
        }
        else {
            history.push("/");
        }
    };

    // const loginWithPincode = async () => {
    //         history.push("/pincode_login");
    // };

    const [pincode, setPincode] = useState("");

    const loginPincode = async () => {
        let error = await props.mongoHook.loginPinCode(pincode);
        if(error){
            console.log("Could not login!")
        }
        else {
            history.push("/");
        }
    };

    // These settings hide and display developer dropdown menu on navbar
    const [isOpenNav, setIsOpenNav] = useState(false);
    const toggleNav = () => setIsOpenNav(!isOpenNav);

    // Controls if email login and buttons are visible
    const [isOpenEmailLogin, setIsOpenEmailLogin] = useState(true);
    const [isOpenPinLogin, setIsOpenPinLogin] = useState(false);

    const toggleLogin = () => {
        setIsOpenEmailLogin(!isOpenEmailLogin);
        setIsOpenPinLogin(!isOpenPinLogin);
    };

    // These settings hide and display the alert
    const [visibleIncorrectInformation, setVisibleIncorrectInformation] = useState(false);
    const onDismiss = () => setVisibleIncorrectInformation(false);

    return (
        <div id="loginPage">
            <Navbar style={Styles} id="navbar" light expand="md">
                <img src={require('./images/logo-low_quality.png')} />
                <NavbarBrand id="companyName" stlye={Styles} href="/">OpTech</NavbarBrand>
                <NavbarToggler onClick={toggleNav} />
                <Collapse isOpen={isOpenNav} navbar>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
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
                    </Nav>
                </Collapse>
            </Navbar>
            <Alert color="info" isOpen={visibleIncorrectInformation} toggle={onDismiss}>
                Incorrect email or password!
            </Alert>
            <Collapse isOpen={isOpenEmailLogin}>
                <Form>
                    <div class="col-xs-9 col-md-7" id={"inputFieldsLogin"}>
                        <InputGroup className={"inputGroupLogin"}>
                            <InputGroupAddon className={"pre-pend"} addonType="prepend">Email</InputGroupAddon>
                            <Input className={"inputField"} type="email" value={email} placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <InputGroup className={"inputGroupLogin"}>
                            <InputGroupAddon className={"pre-pend"} addonType="prepend">Password</InputGroupAddon>
                            <Input className={"inputField"} type="password" value={password} placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
                        </InputGroup>
                    </div>
                    <Button className={"authButton"}  onClick={() => login()}>Login</Button>
                    <Button className={"authButton"}  onClick={() => loginGuest()}>Guest</Button>
                    <Button className={"authButton"}  onClick={() => toggleLogin()}>Pin</Button>
                    <Button className={"authButton"}  onClick={() => props.mongoHook.register(email, password)}>Register</Button>
                </Form>
            </Collapse>
            <Collapse isOpen={isOpenPinLogin}>
                <div className="col-xs-9 col-md-7" id={"inputFieldsLogin"}>
                    <InputGroup className={"inputGroupLogin"}>
                        <InputGroupAddon className={"pre-pend"} addonType="prepend">Pincode</InputGroupAddon>
                        <Input className={"inputField"} type="text" value={pincode} placeholder="Pincode..." onChange={(e) => setPincode(e.target.value)}/>
                    </InputGroup>
                    <br />
                    <Button color="secondary" onClick={() => toggleLogin()}>Back</Button>
                    &nbsp;
                    <Button color="primary" onClick={() => loginPincode()}>Confirm</Button>
                </div>
            </Collapse>
            <div>
            {
                faceApiHook.videoFeed
            }
                {
                    faceLoginStatus &&
                    <Alert color="info" isOpen={faceLoginStatus !== null}>
                        {faceLoginStatus}
                    </Alert>
                }
            <Button
                onClick={() => tryFaceLogin()}
            >
                Facial Recognition Login (Attempt: {loginAttempt})
            </Button>
            </div>
        </div>
    )
};

Login.propTypes = {
    mongoHook: PropTypes.object.isRequired
};

Login.defaultProps = {
    mongoHook: {}
};

export default Login;