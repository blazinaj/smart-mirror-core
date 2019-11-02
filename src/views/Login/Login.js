/**
 * Description: A Simple Form for Logging in / Registering with an Email and Password.
 *              Uses a required mongoHook prop to send email/password to login() or register() function.
 *
 *              NOTE: AutoConfirm is currently turned on in Stitch settings.
 */

import {useState} from "react";
import PropTypes from "prop-types";
import {Button, Card, CardBody, CardHeader, Input} from "reactstrap";
import React from "react";

const Login = (props) => {
    const [email, setEmail] = useState('blazinaj@hotmail.com');
    const [password, setPassword] = useState('CSCD488');

    return (
        <Card>
            <CardHeader>
                Login
            </CardHeader>
            <CardBody>
                <Input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <Input value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <Button onClick={() => props.mongoHook.login(email, password)}>Login</Button>
                <Button onClick={() => props.mongoHook.register(email, password)}>Register</Button>
            </CardBody>
        </Card>
    )
};

Login.propTypes = {
    mongoHook: PropTypes.object.isRequired
};

Login.defaultProps = {
    mongoHook: {}
};

export default Login;