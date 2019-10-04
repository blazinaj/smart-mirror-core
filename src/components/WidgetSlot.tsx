import React, { useState } from "react";
import CameraWidget from "test-module";
import Webcam from "react-webcam";
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import {Toggle} from "office-ui-fabric-react";

const WidgetSlot = () => {

    // inferred as number
    const [widthConstraint, setWidthConstraint] = useState(1280);
    const [heightConstraint, setHeightConstraint] = useState(720);
    const [componentWidth, setComponentWidth] = useState(1280);
    const [componentHeight, setComponentHeight] = useState(720);
    const [componentAudio, setComponentAudio] = useState(false);

    const webcamRef = React.createRef<Webcam>();

        let videoConstraints = {
            width: widthConstraint,
            height: heightConstraint,
            facingMode: "user"
        };

        const coreAPI = {
            "webcamRef": webcamRef,
            "videoConstraints": videoConstraints,
            "width": componentWidth,
            "height": componentHeight,
            "audio": componentAudio
        };

        // const _toggle = (event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
        //     console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
        //     setComponentAudio(checked)
        // }

        return (
            <>
                <CameraWidget coreAPI={coreAPI} />
                <Slider
                    label="Video Constraint: Width"
                    min={1}
                    max={2000}
                    step={1}
                    defaultValue={1280}
                    showValue={true}
                    onChange={(value: number) => setWidthConstraint(value)}
                />
                <Slider
                    label="Component Width"
                    min={1}
                    max={2000}
                    step={1}
                    defaultValue={1280}
                    showValue={true}
                    onChange={(value: number) => setComponentWidth(value)}
                />
                <Slider // prettier-ignore
                    label="Video Constraint: Height"
                    min={1}
                    max={1000}
                    step={1}
                    defaultValue={720}
                    showValue
                    vertical
                    onChange={(value: number) => setHeightConstraint(value)}
                />
                <Slider // prettier-ignore
                    label="Component Height"
                    min={1}
                    max={1000}
                    step={1}
                    defaultValue={720}
                    showValue
                    vertical
                    onChange={(value: number) => setComponentHeight(value)}
                />
                {/*<Toggle*/}
                {/*    label="Audio"*/}
                {/*    onText="On"*/}
                {/*    offText="Off"*/}
                {/*    onChange={_toggle}*/}
                {/*/>*/}

            </>
        )
};

export default WidgetSlot;