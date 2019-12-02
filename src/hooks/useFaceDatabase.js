import React, {useState, useContext} from "react"
import {useMongo} from "./useMongo";
import {
    Stitch,
    AnonymousCredential,
    RemoteMongoClient
} from 'mongodb-stitch-browser-sdk'
import {AppContext} from "../context/AppContext";

export const useFaceDatabase = (input) => {

    //This code currently can hit the database collection (inserting a new document)
    //WIP for pulling and updating data in the collection already

    const getAllUserDescriptors = async () => {

        let client = Stitch.defaultAppClient;
        const db = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
            .db("smart_mirror");

        //const collection = db.collection("face_descriptors");

        await client.auth.loginWithCredential(new AnonymousCredential())
            .then(authedUser => {
                    db.collection("face_descriptors").insertOne(
                        {
                            test: "test"
                        }
                    );
                }
            )
            .catch(err => alert("Problem with connection!"));
        console.log("test1");


        // Log in to access the database. Anonymous Authentication is enabled from the Stitch UI.
        // client.auth
        //     .loginWithCredential(new AnonymousCredential())
        //     .then(() => {
        //         // Retrieve a database object
        //         const db = mongoClient.db('smart_mirror');
        //
        //         // Retrieve the collection in the database
        //         const movieDetails = db.collection('face_descriptors');
        //
        //         // Find 10 documents and log them to console.
        //         movieDetails.find({}, {limit: 10})
        //             .toArray()
        //             .then(results => console.log('Results:', results))
        //             .catch(console.error)
        //     })
        //     .catch(console.error)
    };

    return {
        getAllUserDescriptors
    }

};