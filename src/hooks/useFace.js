import React, { useState, useContext, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import {Button, Input, ListGroup, ListGroupItem, Row, Spinner} from "reactstrap";

const useFace = (loadedModels, descriptors) => {

    const [image, setImage] = useState(null);
    const [labeledDescriptors, setLabeledDescriptors] = useState([]);
    const [faceMatcher, setFaceMatcher] = useState(null);
    const [name, setName] = useState('');
    const [modelsAreLoading, setModelsAreLoading] = useState(true);
    const [loadingAllOutputs, setLoadingAllOutputs] = useState(false);

    useEffect(() => {
        loadModels().then(() => {
            setModelsAreLoading(false);
        });
    }, []);

    useEffect(() => {
        if (labeledDescriptors.length > 0) {
            setFaceMatcher(new faceapi.FaceMatcher(labeledDescriptors))
        }
    }, [labeledDescriptors]);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const webcamRef = useRef(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    };

    const loadModels = async () => {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
        await faceapi.nets.faceExpressionNet.loadFromUri('/models')
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models')
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        await faceapi.nets.ageGenderNet.loadFromUri('/models')
        // await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        // await faceapi.nets.mtcnn.loadFromUri('/models')
        // await faceapi.nets.tinyYolov2.loadFromUri('/models')
    };


    const getDescriptorsFromImage = async (label, htmlElement="video-feed") => {

        // setModelsAreLoading(true);
        const input = document.getElementById(htmlElement);

        const result = await faceapi
            .detectSingleFace(input)
            .withFaceLandmarks()
            .withFaceDescriptor();

        // setModelsAreLoading(false);

        if (result !== undefined && result !== null) {
            return new faceapi.LabeledFaceDescriptors(
                label || "unnamed",
                [result.descriptor]
            );
        }

        return null;

    };

    const addDescriptor = (name, descriptor) => {
        let desc =   new faceapi.LabeledFaceDescriptors(
            name,
            [descriptor]
        );

        setLabeledDescriptors([...labeledDescriptors, desc])
    };

    const saveImage = async (htmlElement) => {
        // setModelsAreLoading(true);
        await loadModels().then(() => setModelsAreLoading(false));

        const input = document.getElementById(htmlElement);

        const result = await faceapi
            .detectSingleFace(input)
            .withFaceLandmarks()
            .withFaceDescriptor();

        addDescriptor(name, result.descriptor);
    };

    const checkForMatch = async (htmlElement) => {

        const input = document.getElementById(htmlElement);

        const singleResult = await faceapi
            .detectSingleFace(input)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (singleResult) {
            const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);
            console.log(bestMatch.toString());
            alert("Hello, " + bestMatch.toString());
        }
    };

    const getAllOutputs = async (withLoading = true) => {
        withLoading && setLoadingAllOutputs(true);
        const input = document.getElementById("video-feed");
        const detectionWithAllOutputs = await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptor();
        withLoading && setLoadingAllOutputs(false);
        return detectionWithAllOutputs;
    };

    const compareImageToDescriptors = (image, descriptors) => {
        return false;
    };

    const descriptorList =
        <ListGroup>
            {
                labeledDescriptors.map((descriptor, index) =>
                    <ListGroupItem key={index}>
                        {descriptor.label}
                    </ListGroupItem>
                )
            }
        </ListGroup>;

    const saveImageButton =
        <>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={() => saveImage("video-feed")}>Save Reference Face</Button>
        </>;

    const checkForMatchButton =
        <Button onClick={() => checkForMatch("video-feed")}>Check For Match</Button>
    ;

    const getBoundingBox = async () => {

        const input = document.getElementById("video-feed");

        const displaySize = { width: input.width, height: input.height }
        // resize the overlay canvas to the input dimensions
        const canvas = document.getElementById('overlay');
        faceapi.matchDimensions(canvas, displaySize);

        /* Display detected face bounding boxes */
        const detections = await faceapi.detectAllFaces(input);
        // resize the detected boxes in case your displayed image has a different size than the original
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        // draw detections into the canvas
        faceapi.draw.drawDetections(canvas, resizedDetections)
    };

    const getFaceLandmarks = async () => {
        const input = document.getElementById("video-feed");
        const displaySize = { width: input.width, height: input.height };
        const canvas = document.getElementById('overlay');
        /* Display face landmarks */
        const detectionsWithLandmarks = await faceapi
            .detectAllFaces(input)
            .withFaceLandmarks()
        // resize the detected boxes and landmarks in case your displayed image has a different size than the original
        const resizedResults = faceapi.resizeResults(detectionsWithLandmarks, displaySize)
        // draw detections into the canvas
        faceapi.draw.drawDetections(canvas, resizedResults)
        // draw the landmarks into the canvas
        faceapi.draw.drawFaceLandmarks(canvas, resizedResults)
    };

    const videoFeed =
        <div>
            {
                modelsAreLoading &&
                    <h4 style={{color: "white"}}> Loading Tensor Flow Models..
                        <Spinner color="primary"/>
                    </h4>
            }
            <div>
                <Webcam
                    id="video-feed"
                    audio={false}
                    height={400}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={700}
                    videoConstraints={videoConstraints}
                />
                <canvas id="overlay"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            // transform: "scaleX(-1)"
                        }}
                />
            </div>
        </div>
    ;

    return {
        getDescriptorsFromImage,
        compareImageToDescriptors,
        videoFeed,
        nets: faceapi.nets,
        loadModels,
        image: image && <img height="500px" width="500px" id="face-image" src={image} alt="Face Here"/>,
        checkForMatchButton,
        saveImageButton,
        descriptorList,
        setName,
        name,
        labeledDescriptors,
        modelsAreLoading,
        faceMatcher,
        getAllOutputs,
        loadingAllOutputs,
        getBoundingBox,
        getFaceLandmarks
    }

};

export default useFace;