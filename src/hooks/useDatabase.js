import React, { useState, useEffect } from "react";
import {Stitch, RemoteMongoClient} from "mongodb-stitch-browser-sdk";

export const useDatabase = () => {

    let client = Stitch.defaultAppClient;
    const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('smart_mirror');

    const find = (collection, query) => {
        return db.collection(collection).find(query)
    };

    const findOne = (collection, query) => {
        return db.collection(collection).findOne(query)
    };

    const findMany = (collection, query) => {
        /*
                collection: "face_descriptors"
                to get all documents in collection: find({})
         */
        return db.collection(collection).find(query).asArray()
    };

    const insertOne = (collection, mutation) => {
        return db.collection(collection).updateOne(mutation)
    };

    const insertMany = (collection, mutation) => {
        return db.collection(collection).updateOne(mutation)
    };

    const updateOne = (collection, query, mutation) => {
        return db.collection(collection).updateOne(query, mutation)
    };

    return {
        user: client.auth.user,
        find,
        findMany,
        findOne,
        insertOne,
        insertMany,
        updateOne,
    }

};