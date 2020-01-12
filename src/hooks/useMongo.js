import React, { useState, useEffect } from "react";
import {
    RemoteMongoClient,
    Stitch,
    UserPasswordAuthProviderClient,
    UserPasswordCredential
} from "mongodb-stitch-browser-sdk";
import {AnonymousCredential} from "mongodb-stitch-core-sdk";

/**
 * @description Performs Authentication and Database calls against our MongoDB Stitch Application
 * @param input
 * @returns {{isLoggedIn, login: login, register: register, logout: logout, authenticatedUser, UserCard: *}}
 */
export const useMongo = (input) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState({});

    const loginGuestUser = async () => {
        let client = Stitch.defaultAppClient;
        await client.auth.loginWithCredential(new AnonymousCredential())
            .then(guest => {
                console.log("Successfully logged in as Guest User! ("+guest.id+")");
                // MongoDB creates a user in users for AnonymousCreds anyway (couldn't figure out how to disable that),
                // So I thought I would at least control what got created for now.
                // AnonymousCreds seem to delete themselves after 90 days or something, so it will use the same login/userId
                // every time until it gets deletes by hand or the certain number of days required

                // The main issues with this method currently:
                // -Creates 2 users in users database (from below upsert, and somewhere else)
                // -StitchServiceError first log in (MustAuthenticateFirst, caught in promise)
                // -Creates a user in user database, instead of remaining truly anonymous (which also leave leftovers in users database that don't get dealt with)

                // Would like to remove user from ever getting created in user database,
                // Or perhaps making a guest account with email/pass of empty string and controlling it via a specific userId
                // Other solutions...?
                const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('smart_mirror');
                db.collection("users").updateOne({userId: client.auth.user.id},
                    {$set: {email: "GUEST@optech.com", first_name: "Firstname", last_name: "Lastname", guest: "true"}}, {upsert: true});

                setAuthenticatedUser(guest);
                setIsLoggedIn(true);
            });
    };

    const login = async (email, password) => {
        let client = Stitch.defaultAppClient;
        const credential = new UserPasswordCredential(email, password);
        let error;
        await client.auth.loginWithCredential(credential)
        // Returns a promise that resolves to the authenticated user
            .then(authedUser => {
                console.log(`successfully logged in with id: ${authedUser.id}`);
                setAuthenticatedUser(authedUser);
                setIsLoggedIn(true);
            })
            .catch(err => {
                console.error(`login failed with error: ${err}`);
                error = err;
            });
        return error;
    };

    const register = async (email, password) => {
        let client = Stitch.defaultAppClient;
        let emailPasswordClient = client.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
        emailPasswordClient.registerWithEmail(email, password)
            .then(async (data) => {
                console.log("Registration data: " + JSON.stringify(data));
                const credential = new UserPasswordCredential(email, password);
                let error;
                await client.auth.loginWithCredential(credential)
                // Returns a promise that resolves to the authenticated user
                    .then(authedUser => {
                        console.log(`successfully logged in with id: ${authedUser.id} and email: ${authedUser.email}`);
                        setAuthenticatedUser(authedUser);
                        setIsLoggedIn(true);

                        // THIS IS TEMPORARY
                        // ADDING USERNAME AND PASSWORD AS PLAIN TEXT FOR FACE REC. LOGIN
                        const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('smart_mirror');
                        db.collection('face_descriptors')
                            .updateOne({owner_id: authedUser.id}, {$set: {email: email, password: password}}, {upsert: true})
                            .then((data) => console.log("(TEMP) Added email and password to descriptor db: " + JSON.stringify(data)))
                    })
                    .catch(err => {
                        console.error(`login failed with error: ${err}`);
                        error = err;
                    });
                return error;
            })
            .catch(err => console.error("Error registering new user:", err));

    };

    const logout = () => {
        setAuthenticatedUser({});
        setIsLoggedIn(false);
    };

    return {
        isLoggedIn,
        loginGuestUser,
        login,
        register,
        logout,
        authenticatedUser
    }
};