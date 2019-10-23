/*
DEPRECATED (JB 10/21/19)
 */

import React from "react";
import {Stack, Slider} from "office-ui-fabric-react";

const CameraSettings = (props) => {

    const {
        setWidthConstraint,
        setComponentWidth,
        setHeightConstraint,
        setComponentHeight
    } = props.cameraAPI;

    return (
        <>
            <Stack  styles={{ root: { maxWidth: 300 } }}>
                <Slider
                    label="Video Constraint: Width"
                    min={1}
                    max={2000}
                    step={1}
                    defaultValue={1280}
                    showValue={true}
                    onChange={(value) => setWidthConstraint(value)}
                />
                <Slider
                    label="Component Width"
                    min={1}
                    max={2000}
                    step={1}
                    defaultValue={1280}
                    showValue={true}
                    onChange={(value) => setComponentWidth(value)}
                />
            </Stack>
            <Stack horizontal styles={{ root: { height: 200 } }}>
                <Slider
                    label="Video Constraint: Height"
                    min={1}
                    max={1000}
                    step={1}
                    defaultValue={720}
                    showValue
                    vertical
                    onChange={(value) => setHeightConstraint(value)}
                />
                <Slider
                    label="Component Height"
                    min={1}
                    max={1000}
                    step={1}
                    defaultValue={720}
                    showValue
                    vertical
                    onChange={(value) => setComponentHeight(value)}
                />
            </Stack>
        </>
    )
}

export default CameraSettings;