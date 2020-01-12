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

const Login = (props) => {

    const [loginAttempt, setLoginAttempt] = useState(0);
    const [enableFaceLogin, setEnableFaceLogin] = useState(true);
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

    const voiceContext = useContext(VoiceCommandsContext);

    useEffect(() => {
        voiceContext.SpeechRecognitionHook.addCommand(manualLoginCommand);
        voiceContext.SpeechRecognitionHook.addCommand(faceLoginCommand);
    }, []);

    const matchFace = async (descriptor) => {
        if (isLoading) {
            return;
        }
        else {
            setIsLoading(true);
        }
        const client = Stitch.defaultAppClient;

        const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('smart_mirror');
        console.log("Trying to match Face to user ID: " + client.auth.user.id + "...");
        let faces = await db.collection('face_descriptors').find({}, { limit: 100}).asArray();
        console.log("Fetched Faces from database: " + JSON.stringify(faces));
        console.log("Trying to match face..");

        if (!descriptor) {
            // alert("Could not match face!!!");
            setFaceLoginStatus("Could not match face!!!");
            setLoginAttempt(loginAttempt => loginAttempt + 1);
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
                match = faceObjectInDatabase.owner_id;
                setEmail(faceObjectInDatabase.email);
                setPassword(faceObjectInDatabase.password);
                setFaceLoginStatus("Hello - " + faceObjectInDatabase.email + ". Logging you in now..");
                // alert("Hello - " + faceObjectInDatabase.email + ". Logging you in now..");
                setEnableFaceLogin(false);
                voiceContext.SpeechRecognitionHook.speak(`Face Matched with ${100 - dist.toFixed(2) * 100}% accuracy. Hello ${faceObjectInDatabase.email}, you are now logged in.`);
                login(faceObjectInDatabase.email, faceObjectInDatabase.password);

            } else {
                setFaceLoginStatus("Hmm.. we couldn't recognize your face. Please try again.");
                setIsLoading(false)
                setLoginAttempt(loginAttempt => loginAttempt + 1)
            }

        }

        console.log("Match = " + match);
        // setLoginAttempt(loginAttempt => loginAttempt + 1)
    };

    const faceApiHook = useFace();

    useEffect(() => {
        let tryFaceLogin = async () => {
            let descriptor = await faceApiHook.getDescriptorsFromImage("jacob", "video-feed");
            console.log("Got Descriptor: " + JSON.stringify(descriptor));
            await matchFace(descriptor);
        };

        if (enableFaceLogin) {
            setTimeout(() => {
                if (!faceApiHook.modelsAreLoading) {
                    tryFaceLogin();
                } else {
                    setLoginAttempt(loginAttempt => loginAttempt + 1)
                }
            }, 1000);
        }

    }, [loginAttempt]);

    // These settings store state of email and password
    const [email, setEmail] = useState('lichtschwert@live.com');
    const [password, setPassword] = useState('FakePassword');

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

    // These settings hide and display developer dropdown menu on navbar
    const [isOpenNav, setIsOpenNav] = useState(false);
    const toggleNav = () => setIsOpenNav(!isOpenNav);

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
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
            <Alert color="info" isOpen={visibleIncorrectInformation} toggle={onDismiss}>
                Incorrect email or password!
            </Alert>
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
                <Button className={"authButton"}  onClick={() => props.mongoHook.register(email, password)}>Register</Button>
            </Form>
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
                onClick={
                    async () => {
                        let descriptor = await faceApiHook.getDescriptorsFromImage("jacob", "video-feed");
                        console.log("Got Descriptor: " + JSON.stringify(descriptor));
                        matchFace(descriptor)
                    }
                }
            >
                Facial Recognition Login (Attempt: {loginAttempt})
            </Button>
                {" "}
                <Button
                    color="danger"
                    onClick={() => setEnableFaceLogin(false)}
                >
                    Cancel Auto Login
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