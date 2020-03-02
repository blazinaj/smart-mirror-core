import React, {useState, useEffect, useContext} from "react";

import awsIot from "aws-iot-device-sdk";


//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//
const Device = ()=> {

    awsIot.device({
        keyPath: "./cert/d5efb49d34-private.pem.key",
        certPath: ".cert/d5efb49d34-certificate.pem.crt",
        caPath: "./cert/AmazonRootCA1.pem",
        clientId: "Smart_Mirror_IoT",
        host: "arn:aws:iot:us-west-2:615420348778:thing/Smart_Mirror_IoT"
    });


    //
    // Device is an instance returned by mqtt.Client(), see mqtt.js for full
    // documentation.
    //
    Device
        .on('connect', function () {
            console.log('connect');
            Device.subscribe('topic_1');
            Device.publish('topic_2', JSON.stringify({test_data: 1}));
        });

    Device
        .on('message', function (topic, payload) {
            console.log('message', topic, payload.toString());

        });

    return(
        <div>
            <Device/>
        </div>
    );

};

export default Device;