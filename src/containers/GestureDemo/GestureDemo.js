// Author : Art Elikh
// Started to create Demo Page for Gestures

import React, { useState, useEffect, useContext } from "react";
import {Col, Container, Row} from "reactstrap";

const GestureDemo =(props)=> {
    return (
        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>Gesture Demo Page</h1>
            <Col>
                <Row>
                    <Col lg={3}>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Gesture Feature:
                            </h4>
                        </Row>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Gesture Feature:
                            </h4>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <div style={{height: "50vh", margin: "auto auto", background: "grey"}}>
                            <h4 style={{color: "white"}}>Camera Feed will go here if needed?</h4>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Something else here:
                            </h4>
                        </Row>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Something else here:
                            </h4>
                        </Row>
                    </Col>
                </Row>
            </Col>

        </div>
    )
};
export default GestureDemo;