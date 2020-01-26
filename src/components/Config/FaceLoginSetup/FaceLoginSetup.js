import React, { useState, useEffect, useContext } from "react";
import {useDatabase} from "../../../hooks/useDatabase";
import {Button, Col, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {
    Stitch,
    RemoteMongoClient
} from 'mongodb-stitch-browser-sdk';
import useFace from "../../../hooks/useFace";
import {VoiceCommandsContext} from "../../../context/VoiceCommandsContext";
import {LoggingContext} from "../../../context/LoggingContext";

const FaceLoginSetup = (props) => {

    const databaseHook = useDatabase();

    const [savedFaces, setSavedFaces] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentFaces, setCurrentFaces] = useState([]);

    const client = Stitch.defaultAppClient;

    const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('smart_mirror');

    useEffect(() => {

        let getSavedFaces = async () => {
            let faces = await db.collection('face_descriptors').find({owner_id: client.auth.user.id}, { limit: 100}).asArray();
            setSavedFaces(faces)
        };

        getSavedFaces();
    }, []);

    const faceApiHook = useFace();

    const saveNewFace = (descriptor) => {
        // alert(JSON.stringify(descriptor))
        const client = Stitch.defaultAppClient;

        const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('smart_mirror');

        let current = db.collection('face_descriptors')
            .find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
            .then((list) => {
                    console.log("Saving New Face, current faces: " + JSON.stringify(list));
                    db.collection('face_descriptors')
                        .updateOne({owner_id: client.auth.user.id}, {$set: {descriptor: JSON.parse(JSON.stringify(descriptor))}}, {upsert: true})
                        .then((data) => console.log("Updated face in db: " + JSON.stringify(data)))
                }
            );

        console.log("Saving New Face, current faces: " + JSON.stringify(current));
    };

    useEffect(() => {
        setCurrentFaces(faceApiHook.labeledDescriptors)
    }, [faceApiHook.labeledDescriptors]);

    const saveFaceToDB =  async () => {
        let descriptor = await faceApiHook.getDescriptorsFromImage("user");
        console.log("Got Descriptor: " + JSON.stringify(descriptor));
        saveNewFace(descriptor);
        SpeechRecognitionHook.speak("Face successfully saved.");
        setModalIsOpen(false)
    };

    const {SpeechRecognitionHook} = useContext(VoiceCommandsContext);
    const {logger} = useContext(LoggingContext);

    const saveNewFaceCommand = {
        command: [
            "mirror mirror on the wall save a new face",
            "mirror mirror save a new face"
        ],
        answer: "Opening face capture wizard",
        func: () => {
            logger.addLog("Voice Command: Open face capture wizard");
            setModalIsOpen(!modalIsOpen);
        }
    };

    const saveFaceCommand = {
        command: [
            "mirror mirror on the wall save my face",
            "mirror mirror save my face"
        ],
        answer: "Saving face to the database",
        func: () => {
            logger.addLog("Voice Command: Saving face to database");
            saveFaceToDB();
        }
    };

    useEffect(() => {
        SpeechRecognitionHook.addCommand(saveFaceCommand);
        SpeechRecognitionHook.addCommand(saveNewFaceCommand);

        return () => {
            SpeechRecognitionHook.removeCommand(saveFaceCommand);
            SpeechRecognitionHook.removeCommand(saveNewFaceCommand);
        }
    }, []);

    return (

        <Row>
            <Col>
                <h4>Settings</h4>
                <Button onClick={() => setModalIsOpen(!modalIsOpen)}>
                    Save a new Face
                    <br/>
                    <small>🎤 "mirror mirror save a new face"</small>
                </Button>
                <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(!modalIsOpen)} style={{minWidth: "75vw"}}>
                    <ModalHeader>
                        Save a new Face
                    </ModalHeader>
                    <ModalBody>
                        {
                            faceApiHook.videoFeed
                        }
                        <Button
                            onClick={() => saveFaceToDB()}
                        >
                            Save my face
                            <br/>
                            <small>🎤 "mirror mirror save my face"</small>
                        </Button>
                    </ModalBody>
                </Modal>
            </Col>
            <Col>
                <h4>Faces saved in DB</h4>
                <ListGroup>
                    {
                        savedFaces &&
                        savedFaces.length > 0
                        && savedFaces.map((face, index) =>
                            <ListGroupItem key={index}>
                                Label: {face.descriptor && face.descriptor.label}
                                <br/>
                                # of Descriptors: {face.descriptor && face.descriptor.descriptors && face.descriptor.descriptors.length}
                            </ListGroupItem>
                        )
                    }
                </ListGroup>
            </Col>
        </Row>

    )

};

export default FaceLoginSetup;