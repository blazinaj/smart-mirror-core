/**
 * Author: Jacob Blazina
 *
 * Description: A test component for prototyping things
 *
 *              Unless something needs to be tested on the Cloud using this page,
 *              please refrain from pushing changes
 */

import React from "react";
import useFaceApi from "face-api-hook/dist/index";

const TestPage = (props) => {

    const faceApiHook = useFaceApi();

    return (
        <div style={{color: "white"}}>
            {
                faceApiHook.saveImageButton
            }
            {
                faceApiHook.checkForMatchButton
            }
            {
                faceApiHook.videoFeed
            }
            {
                faceApiHook.descriptorList
            }
        </div>
    )
};

export default TestPage;