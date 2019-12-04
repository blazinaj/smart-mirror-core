import React, { useState, useContext, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import {Button, Input, ListGroup, ListGroupItem, Spinner} from "reactstrap";

const useFace = (loadedModels, descriptors) => {

    const [image, setImage] = useState(null);
    const [labeledDescriptors, setLabeledDescriptors] = useState([]);
    const [faceMatcher, setFaceMatcher] = useState(null);
    const [name, setName] = useState('');
    const [modelsAreLoading, setModelsAreLoading] = useState(true);

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
        // await faceapi.nets.ageGenderNet.loadFromUri('/models')
        // await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        // await faceapi.nets.mtcnn.loadFromUri('/models')
        // await faceapi.nets.tinyYolov2.loadFromUri('/models')
    };


    const getDescriptorsFromImage = async (label, htmlElement="video-feed") => {

        setModelsAreLoading(true);
        const input = document.getElementById(htmlElement);

        const result = await faceapi
            .detectSingleFace(input)
            .withFaceLandmarks()
            .withFaceDescriptor();

        setModelsAreLoading(false);

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
        setModelsAreLoading(true);
        await loadModels().then(() => setModelsAreLoading(false));

        const input = document.getElementById(htmlElement);

        const result = await faceapi
            .detectSingleFace(input)
            .withFaceLandmarks()
            .withFaceDescriptor();

        addDescriptor(name, result.descriptor);
    };

    const checkForMatch = async (htmlElement) => {
        await loadModels();

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

    const videoFeed =
        <div>
            {
                modelsAreLoading &&
                <Spinner
                    color="primary"
                    style={{
                        width: '10rem',
                        height: '10rem',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        zIndex: 9999
                    }}
                    type="grow"
                />
            }
            <Webcam
                id="video-feed"
                audio={false}
                height={400}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={700}
                videoConstraints={videoConstraints}
            />
        </div>
    ;

    const testDescriptors = labeledDescriptors;

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
        faceMatcher
    }

};

export default useFace;