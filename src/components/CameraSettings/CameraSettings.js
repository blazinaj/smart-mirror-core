/** WIP = FOR TESTING ONLY
 * Author: Jacob Blazina
 *
 * Description: A settings menu for adjusting the scaling of the Camera widget.
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

    const {
        videoConstraints,
        width,
        height
    } = props.coreAPI;

    return (
        <>
            <Stack  styles={{ root: { maxWidth: 300 } }}>
                <Slider
                    label="Video Constraint: Width"
                    min={1}
                    max={2000}
                    step={1}
                    defaultValue={videoConstraints.width}
                    showValue={true}
                    onChange={(value) => setWidthConstraint(value)}
                />
                <Slider
                    label="Component Width"
                    min={1}
                    max={2000}
                    step={1}
                    defaultValue={width}
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
                    defaultValue={videoConstraints.height}
                    showValue
                    vertical
                    onChange={(value) => setHeightConstraint(value)}
                />
                <Slider
                    label="Component Height"
                    min={1}
                    max={1000}
                    step={1}
                    defaultValue={height}
                    showValue
                    vertical
                    onChange={(value) => setComponentHeight(value)}
                />
            </Stack>
        </>
    )
}

export default CameraSettings;