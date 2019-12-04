/**
 * Description: A Simple Form for Logging in / Registering with an Email and Password.
 *              Uses a required mongoHook prop to send email/password to login() or register() function.
 *
 *              NOTE: AutoConfirm is currently turned on in Stitch settings.
 */

import {useState, useContext} from "react";
import PropTypes from "prop-types";
import {
    Alert, Button, Collapse, DropdownItem, DropdownMenu, DropdownToggle,
    Form, Input, InputGroup, InputGroupAddon, Nav, Navbar, NavbarBrand,
    NavbarToggler, UncontrolledDropdown
} from "reactstrap";
import React from "react";
import Styles from "./css/styles.css";
import {useFaceDatabase} from "../../hooks/useFaceDatabase";

const Login = (props) => {
    //These setting store state of email and password
    const [email, setEmail] = useState('lichtschwert@live.com');
    const [password, setPassword] = useState('FakePassword');

    //Login function
    const login = async () => {
        let result = await props.mongoHook.login(email, password);
        if(result){
            setVisibleIncorrectInformation();
        }
    };

    //These settings hide and display developer dropdown menu on navbar
    const [isOpenNav, setIsOpenNav] = useState(false);
    const toggleNav = () => setIsOpenNav(!isOpenNav);

    //These settings hide and display the alert
    const [visibleIncorrectInformation, setVisibleIncorrectInformation] = useState(false);
    const onDismiss = () => setVisibleIncorrectInformation(false);


    //Author Nik
    //Face Database testing
    //Temp comments for how I was calling the methods and testing - CAN BE DELETED LATER ON
    //--------------------------------------------------
    // let descriptors = "";
    // const FaceDB = useFaceDatabase();
    //
    // const pullInfo = async () => {
    //     console.log("init");
    //     descriptors = await FaceDB.getAllUserDescriptors();
    //     console.log(descriptors);
    // };
    //
    // const pullOneInfo = async () => {
    //     console.log("init");
    //     descriptors = await FaceDB.getOneUserDescriptors("TestId");
    //     console.log(descriptors);
    // };
    //
    // const insertInto = () => {
    //     console.log("init");
    //     let result = FaceDB.insertNewData("TestId", "TestName", [[1,2,3,4,5],[6,7,8,9,10]]);
    //     if(result == null){
    //         alert("ERROR WITH INSERTION!")
    //     }
    //     console.log(descriptors);
    // };
    //
    // const update = () => {
    //     console.log("init");
    //     let result = FaceDB.updateData("TestId",  [[2,2,2,2,2],[6,7,8,9,10]]);
    //     if(result == null){
    //         alert("ERROR WITH INSERTION!")
    //     }
    //     console.log(descriptors);
    // };
    /*
    <Button onClick={() => insertInto()}>InsertIntoFaceDB</Button>
    <br />
    <br />
    <Button onClick={() => pullInfo()}>pullInfo</Button>
    <br />
    <br />
    <Button onClick={() => pullOneInfo()}>pullOneDataValue</Button>
    <br />
    <br />
    <Button onClick={() => update()}>UpdateValue</Button>
    */

    //--------------------------------------------------

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
                <Button className={"authButton"}  onClick={() => props.mongoHook.register(email, password)}>Register</Button>
            </Form>
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