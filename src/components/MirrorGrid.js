import React, { useState, useRef } from "react";
import GridLayout from 'react-grid-layout';
import CameraWidget from "camera-widget";
import {Stack, DefaultButton, Slider} from "office-ui-fabric-react";
import WidgetSlot from "./WidgetSlot/WidgetSlot";

const MirrorGrid = (props) => {


    // layout is an array of objects, see the demo for more complete usage
    const layout = [
        {i: 'a', x: 0, y: 0, w: 15, h: 15},
        {i: 'b', x: 50, y: 0, w: 50, h: 10},
        {i: 'c', x: 0, y: 25, w: 20, h: 35, minH: 35, minW: 20},
        {i: 'd', x: 80, y: 0, w: 50, h: 40, isResizable:false}
    ];

    const [widthConstraint, setWidthConstraint] = useState(undefined);
    const [heightConstraint, setHeightConstraint] = useState(undefined);
    const [componentWidth, setComponentWidth] = useState(undefined);
    const [componentHeight, setComponentHeight] = useState(undefined);
    const [componentAudio, setComponentAudio] = useState(false);

    const webcamRef = useRef(null);

    let videoConstraints = {
        width: widthConstraint,
        height: heightConstraint,
        facingMode: "user"
    };

    const selectedWidgets = [
        <CameraWidget/>
    ];

    const coreAPI = {
        "webcamRef": webcamRef,
        "videoConstraints": videoConstraints,
        "width": componentWidth,
        "height": componentHeight,
        "audio": componentAudio
    };

    return (
        <>
            <GridLayout
                autoSize={false}
                className="layout"
                verticalCompact={false}
                layout={layout}
                cols={100}
                rowHeight={1}
                width={1200}
            >
                {
                    selectedWidgets.map((widget, index) =>
                        <WidgetSlot key={index} widget={widget}/>
                    )
                }
            </GridLayout>
        </>
    )
};

export default MirroGrid;