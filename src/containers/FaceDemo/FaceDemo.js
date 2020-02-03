import React, { useState, useEffect, useContext, useRef } from "react";
import {Button, Col, Container, Row, Spinner} from "reactstrap";
import useFace from "../../hooks/useFace";
import {useModal} from "../../hooks/useModal";
import {VoiceCommandsContext} from "../../context/VoiceCommandsContext";

const FaceDemo = (props) => {

    const faceApiHook = useFace();

    const [resultObject, setResultObject] = useState({});
    const [averageAgeTotal, setAverageAgeTotal] = useState(0);
    const [averageAgeCount, setAverageAgeCount] = useState(0);
    const [allExpressions, setAllExpressions] = useState([]);
    const [showRawExpressions, setShowRawExpressions] = useState(false);

    const resultObjectModal = useModal(
        <div>{JSON.stringify(resultObject, true, 2)}</div>,
        "Raw Face Recognition Results"
    );

    let getAllOutputs = async (withLoading) => {
        let temp = await faceApiHook.getAllOutputs(withLoading);
        setResultObject(temp);

        if (temp && temp.age) {
            setAverageAgeCount(averageAgeCount => averageAgeCount + 1);
            setAverageAgeTotal(averageAgeTotal => averageAgeTotal + temp.age);
        }

        if (temp && temp.expressions) {
            let expression = getCurrentExpression(temp.expressions);
            setAllExpressions(allExpressions => [...allExpressions, expression])
        }
    };

    const showBoundingBox = useRef(false);
    const setShowBoundingBox = (bool) => {
        showBoundingBox.current = bool;
    };

    const showFaceLandmarks = useRef(false);
    const setShowFaceLandmarks = (bool) => {
        showFaceLandmarks.current = bool;
    };

    useEffect(() => {

        let initialLoad = true;
        setInterval(async () => {
            await getAllOutputs(initialLoad);
            showBoundingBox.current && faceApiHook.getBoundingBox();
            showFaceLandmarks.current && faceApiHook.getFaceLandmarks();
            initialLoad = false;
        }, 1000)

    }, []);

    const showResultObjectCommand = {
        command: ["mirror mirror show raw results", "mirror mirror show raw result object"],
        answer: "Showing Raw Face Results",
        func: () => resultObjectModal.setModalIsOpen(true)
    };

    const hideResultObjectCommand = {
        command: ["mirror mirror hide raw results", "mirror mirror hide raw result object"],
        answer: "Hiding Raw Face Results",
        func: () => resultObjectModal.setModalIsOpen(false)
    };

    const showRawExpressionsCommand = {
        command: ["mirror mirror show raw expressions", "mirror mirror show raw expressions object"],
        answer: "Showing Raw Face Results",
        func: () => setShowRawExpressions(true)
    };

    const hideRawExpressionsCommand = {
        command: ["mirror mirror hide raw expressions", "mirror mirror hide raw expressions object"],
        answer: "Hiding Raw Face Results",
        func: () => setShowRawExpressions(false)
    };

    const showBoundingBoxCommand = {
        command: ["mirror mirror show bounding box", "mirror mirror show face bounding box"],
        answer: "Showing Face Bounding Box",
        func: () => {
            setShowFaceLandmarks(false);
            setShowBoundingBox(true);
        }
    };

    const hideBoundingBoxCommand = {
        command: ["mirror mirror hide bounding box", "mirror mirror hide face bounding box"],
        answer: "Hiding Face Bounding box",
        func: () => {
            setShowBoundingBox(false);
        }
    };

    const showLandMarksCommand = {
        command: ["mirror mirror show face landmarks", "mirror mirror show landmarks"],
        answer: "Showing Face Landmarks",
        func: () => {
            setShowBoundingBox(false);
            setShowFaceLandmarks(true);
        }
    };

    const hideLandMarksCommand = {
        command: ["mirror mirror hide face landmarks", "mirror mirror hide landmarks"],
        answer: "Hiding Face Landmarks",
        func: () => {
            setShowFaceLandmarks(false);
        }
    };

    const voiceContext = useContext(VoiceCommandsContext).SpeechRecognitionHook;

    useEffect(() => {
        voiceContext.addCommand(showResultObjectCommand);
        voiceContext.addCommand(hideResultObjectCommand);
        voiceContext.addCommand(showRawExpressionsCommand);
        voiceContext.addCommand(hideRawExpressionsCommand);
        voiceContext.addCommand(showBoundingBoxCommand);
        voiceContext.addCommand(hideBoundingBoxCommand);
        voiceContext.addCommand(showLandMarksCommand);
        voiceContext.addCommand(hideLandMarksCommand);

        return () => {
            voiceContext.removeCommand(showResultObjectCommand);
            voiceContext.removeCommand(hideResultObjectCommand);
            voiceContext.removeCommand(showRawExpressionsCommand);
            voiceContext.removeCommand(hideRawExpressionsCommand);
            voiceContext.removeCommand(showBoundingBoxCommand);
            voiceContext.removeCommand(hideBoundingBoxCommand);
            voiceContext.removeCommand(showLandMarksCommand);
            voiceContext.removeCommand(hideLandMarksCommand);
        }

    }, []);

    const getCurrentExpression = (expressionsObject) => {
        /**
         *  {neutral, happy, sad, angry, fearful, disgusted, surprised
         */
        return Object.keys(expressionsObject).reduce((a, b) => expressionsObject[a] > expressionsObject[b] ? a : b);
    };

    const getTypicalExpression = (allExpressions) => {
        return allExpressions.reduce(
            (a,b,i,arr)=>
                (arr.filter(v=>v===a).length>=arr.filter(v=>v===b).length?a:b),
            null)
    };


    return (
        <div style={{height: "100%", background: "black", padding: "5vw", color: "white"}}>
            <h1>Face Demo Page</h1>
            <Col>
                <Row>
                    <div style={{height: "40vh", margin: "auto auto"}}>
                        <h4 style={{color: "white"}}>Camera Feed</h4>
                        {faceApiHook.videoFeed}
                    </div>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Row style={{margin: "5em", color: "white"}}>
                            <Col>
                                <Row>
                                    <h4 style={{color: "white"}}>
                                        Expression Prediction:
                                    </h4>
                                </Row>
                                <Row>
                                    <h6>
                                        {
                                            faceApiHook.loadingAllOutputs ?
                                                <>
                                                    Loading Expressions.. <Spinner color="primary"/>
                                                </>
                                                :
                                                resultObject && resultObject.expressions ?
                                                    showRawExpressions ?
                                                        <Col>
                                                            <Row>
                                                                Neutral: {resultObject.expressions.neutral}
                                                            </Row>
                                                            <Row>
                                                                Happy: {resultObject.expressions.happy}
                                                            </Row>
                                                            <Row>
                                                                Angry: {resultObject.expressions.angry}
                                                            </Row>
                                                            <Row>
                                                                Sad: {resultObject.expressions.sad}
                                                            </Row>
                                                            <Row>
                                                                Fearful: {resultObject.expressions.fearful}
                                                            </Row>
                                                            <Row>
                                                                Disgusted: {resultObject.expressions.disgusted}
                                                            </Row>
                                                            <Row>
                                                                Surprised: {resultObject.expressions.surprised}
                                                            </Row>
                                                        </Col>
                                                        :
                                                        <p style={{color: "white"}}>{getCurrentExpression(resultObject.expressions)}</p>
                                                    :
                                                    "No Expressions Found"
                                        }
                                    </h6>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{margin: "5em", color: "white"}}>
                            <Col>
                                <Row>
                                    <h4 style={{color: "white"}}>
                                        Other:
                                    </h4>
                                </Row>
                                <Row>
                                    <h6>
                                        {
                                            averageAgeTotal !== 0 && averageAgeCount !== 0 &&
                                            <>
                                                <h6 style={{color: "white", marginTop: "2em"}}>
                                                    Average Predicted Age:
                                                </h6>
                                                <h6>
                                                    {
                                                        averageAgeTotal/averageAgeCount &&
                                                        (averageAgeTotal/averageAgeCount).toFixed(2)
                                                    }
                                                </h6>
                                            </>
                                        }
                                        {
                                            allExpressions && allExpressions.length > 0 &&
                                            <>
                                                <h6 style={{color: "white", marginTop: "2em"}}>
                                                    Your most used expression:
                                                </h6>
                                                <h6>
                                                    {
                                                        getTypicalExpression(allExpressions)
                                                    }
                                                </h6>
                                            </>
                                        }
                                    </h6>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <Row style={{margin: "5em", color: "white"}}>
                            <Col>
                                <Row>
                                    <h4 style={{color: "white"}}>
                                        Gender Prediction:
                                    </h4>
                                </Row>
                                <Row>
                                    <h6>
                                        {
                                            faceApiHook.loadingAllOutputs ?
                                                <>
                                                    Loading Gender.. <Spinner color="primary"/>
                                                </>
                                                :
                                                resultObject ? resultObject.gender : "No Gender Found"
                                        }
                                    </h6>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{margin: "5em", color: "white"}}>
                            <Col>
                                <Row>
                                    <h4 style={{color: "white"}}>
                                        Age Prediction:
                                    </h4>
                                </Row>
                                <Row>
                                    <h6>
                                        {
                                            faceApiHook.loadingAllOutputs ?
                                                <>
                                                    Loading Age.. <Spinner color="primary"/>
                                                </>
                                                :
                                                resultObject && resultObject.age ? `${resultObject.age.toFixed(2)} Years Old` : "No Age Found"
                                        }
                                    </h6>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            {resultObjectModal.modal}
        </div>
    )

};

export default FaceDemo;