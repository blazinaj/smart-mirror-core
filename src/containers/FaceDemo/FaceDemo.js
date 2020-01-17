import React, { useState, useEffect } from "react";
import {Button, Col, Container, Row, Spinner} from "reactstrap";
import useFace from "../../hooks/useFace";

const FaceDemo = (props) => {

    const faceApiHook = useFace();

    const [ageAndGender, setAgeAndGender] = useState({});

    let getAgeAndGender = async (withLoading) => {
        let temp = await faceApiHook.getAgeAndGender(withLoading);
        setAgeAndGender(temp);
    };

    useEffect(() => {

        let initialLoad = true;
        setInterval(async () => {
            await getAgeAndGender(initialLoad);
            initialLoad = false;
        }, 1000)

    }, []);

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
                            {faceApiHook.videoFeed}
                        </div>
                    </Col>
                    <Col lg={3}>
                        <Row style={{height: "50vh", color: "white"}}>
                            <Col>
                                <Row>
                                    <h4 style={{color: "white"}}>
                                        Gender Prediction:
                                    </h4>
                                </Row>
                                <Row>
                                    <h6>
                                    {
                                        faceApiHook.loadingAgeAndGender ?
                                            <>
                                                Loading Gender.. <Spinner color="primary"/>
                                            </>
                                            :
                                        ageAndGender ? ageAndGender.gender : "No Gender Found"
                                    }
                                    </h6>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{height: "50vh", color: "white"}}>
                            <Col>
                                <Row>
                                    <h4 style={{color: "white"}}>
                                        Age Prediction:
                                    </h4>
                                </Row>
                                <Row>
                                    <h6>
                                    {
                                        faceApiHook.loadingAgeAndGender ?
                                            <>
                                                Loading Age.. <Spinner color="primary"/>
                                            </>
                                            :
                                            ageAndGender ? ageAndGender.age : "No Age Found"
                                    }
                                    </h6>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </div>
    )

};

export default FaceDemo;