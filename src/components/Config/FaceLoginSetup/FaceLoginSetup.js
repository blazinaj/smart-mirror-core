import React, { useState, useEffect } from "react";
import {useDatabase} from "../../../hooks/useDatabase";
import {Button, Col, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {useModal} from "../../../hooks/useModal";
import useFaceApi from "face-api-hook/dist";
import {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} from 'mongodb-stitch-browser-sdk';
import useFace from "../../../hooks/useFace";
import * as faceapi from "face-api.js";

const FaceLoginSetup = (props) => {

    const databaseHook = useDatabase();

    const savedFacesQuery = {
        owner_id: databaseHook.user.id
    };

    const [savedFaces, setSavedFaces] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [testLoginModalIsOpen, setTestLoginModalIsOpen] = useState(false);
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

    // const faceApiHook = useFaceApi();
    const faceApiHook = useFace();

    const saveNewFace = (descriptor) => {
        alert(JSON.stringify(descriptor))
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

    const matchFace = async (descriptor) => {
        console.log("Trying to match Face to user ID: " + databaseHook.user.id + "...");
        let faces = await db.collection('face_descriptors').find({}, { limit: 100}).asArray();
        console.log("Fetched Faces from database: " + JSON.stringify(faces));
        console.log("Trying to match face..");

        if (!descriptor) {
            alert("Could not match face!!!");
            return null;
        }

        let match = false;

        for (let faceObjectInDatabase of faces) {

            let descArray = [];

            for (let entry of faceObjectInDatabase.descriptor.descriptors) {
                let desc = [];

                for (let num of entry) {
                    desc.push(num)
                }

                descArray.push(desc)
            }

            const dist = await faceapi.euclideanDistance(descArray[0], descriptor.descriptors[0]);

            console.log("euclidean distance: " + dist)

            if (dist > 0.1) {
                match = true
            }

        }

        console.log("Match = " + match)
    };

    return (

        <Row>
            <Col>
                <h4>Settings</h4>
                <Button onClick={() => setModalIsOpen(!modalIsOpen)}>Save a new Face</Button>
                <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(!modalIsOpen)}>
                    <ModalHeader>
                        Save a new Face
                    </ModalHeader>
                    <ModalBody>
                        {
                            faceApiHook.videoFeed
                        }
                        <Button
                            onClick={
                                async () => {
                                    let descriptor = await faceApiHook.getDescriptorsFromImage("jacob");
                                    console.log("Got Descriptor: " + JSON.stringify(descriptor));
                                    saveNewFace(descriptor)
                                }
                            }
                        >
                            Save your face to the Database
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
                                {JSON.stringify(face.descriptor)}
                            </ListGroupItem>
                        )
                    }
                </ListGroup>
            </Col>
        </Row>

    )

};

export default FaceLoginSetup;