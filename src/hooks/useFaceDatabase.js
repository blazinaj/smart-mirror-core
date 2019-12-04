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
    //WIP for pulling and updating data in the face_descriptors collection


    //Updates descriptors - Requires (userid, new descriptors)
    //Note, only needs new descriptors, it automatically calls Database to add or remove old ones
    const updateData = async (userid, descriptors) => {
        let client = Stitch.defaultAppClient;
        const db = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
            .db("smart_mirror");

        const collection = db.collection("face_descriptors");

        let userInfo = await getOneUserDescriptors(userid);
        let oldDescriptors = userInfo.descriptors;
        if(oldDescriptors.length > 9){
            oldDescriptors.shift();
        }
        oldDescriptors.push(descriptors);

        let error;
        await client.auth.loginWithCredential(new AnonymousCredential())
            .then(authedUser => {
                    collection.updateOne({userid: userid}, {$set: {descriptors: oldDescriptors}})
                }
            )
            .catch(err => {
                console.log("Problem with connection!");
                error = err;
            });
        return error;
    };

    //Insert new descriptors document to collection
    const insertNewData = async (userid, name, descriptors) => {
        let client = Stitch.defaultAppClient;
        const db = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
            .db("smart_mirror");

        const collection = db.collection("face_descriptors");

        let error;
        await client.auth.loginWithCredential(new AnonymousCredential())
            .then(authedUser => {
                    collection.insertOne({userid: userid, name: name, descriptors: descriptors})
                }
            )
            .catch(err => {
                console.log("Problem with connection!");
                error = err;
            });
        return error;
    };

    //Returns one user object, which contains name, userid and descriptor array
    const getOneUserDescriptors = async (userId) => {
        let client = Stitch.defaultAppClient;
        const db = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
            .db("smart_mirror");

        const collection = db.collection("face_descriptors");

        let returnData = "";
        await client.auth.loginWithCredential(new AnonymousCredential())
            .then(authedUser => {
                    returnData = collection.findOne({userid: userId})
                        .then((data) => {
                            return data;
                        })
                }
            )
            .catch(err => console.log("Problem with connection!"));
        return returnData;
    };

    //Returns all user objects as array, which contains name, userid and descriptor arrays
    const getAllUserDescriptors = async () => {
        let client = Stitch.defaultAppClient;
        const db = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
            .db("smart_mirror");

        const collection = db.collection("face_descriptors");

        let returnData = [];
        await client.auth.loginWithCredential(new AnonymousCredential())
            .then(authedUser => {
                returnData = collection.find().toArray()
                    .then(data => {
                        return data;
                    })
                }
            )
            .catch(err => console.log("Problem with connection! " + err));
        return returnData;
    };

    return {
        getOneUserDescriptors,
        getAllUserDescriptors,
        insertNewData,
        updateData
    }

};