import React, { useState, useEffect } from "react";
import {Col, Container, Row} from "reactstrap";

const FaceDemo = (props) => {

    return (
        <div style={{height: "100vh", background: "black", padding: "5vw"}}>
            <h1>Face Demo Page</h1>
            <Col>
                <Row>
                    <Col lg={3}>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Emotion Prediction:
                            </h4>
                        </Row>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Other info:
                            </h4>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <div style={{height: "50vh", margin: "auto auto", background: "grey"}}>
                            <h4 style={{color: "white"}}>Camera Feed will go here?</h4>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Gender Prediction:
                            </h4>
                        </Row>
                        <Row style={{height: "50vh"}}>
                            <h4 style={{color: "white"}}>
                                Age Prediction:
                            </h4>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </div>
    )

};

export default FaceDemo;