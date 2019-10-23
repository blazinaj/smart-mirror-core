import React, { useState, useRef, useEffect } from "react";
import GridLayout, { WidthProvider} from "react-grid-layout";
import CameraWidget from "camera-widget";
import {Clock} from "react-clock";
import CameraSettings from "../../components/CameraSettings/CameraSettings";

const Dashboard = (props) => {

    const [widthConstraint, setWidthConstraint] = useState(1280);
    const [heightConstraint, setHeightConstraint] = useState(720);
    const [componentWidth, setComponentWidth] = useState(1280);
    const [componentHeight, setComponentHeight] = useState(720);
    const [componentAudio, setComponentAudio] = useState(false);

    const webcamRef = useRef(null);

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

    const cameraAPI = {
      setWidthConstraint,
      setHeightConstraint,
      setComponentWidth,
      setComponentHeight,
      setComponentAudio
    };

    const selectedWidgets = [
        <div key={1} data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>
            <CameraWidget coreAPI={coreAPI}/>
        </div>,
        <div key={2} data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>
            <ClockWidget coreAPI={coreAPI}/>
        </div>,
        <div key={3} data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>
            <CameraSettings cameraAPI={cameraAPI} coreAPI={coreAPI}/>
        </div>,
    ];


    return (
        <>
            <GridLayout className="layout" cols={12} rowHeight={120} width={1200} autoSize={true} verticalCompact={true}>
                {
                    selectedWidgets.map((widget, index) =>
                        widget
                    )
                }
            </GridLayout>
        </>
    )
};

// Temporary to check out Anatoli's widget
export const ClockWidget = (props) => {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setInterval(
            () => setTime(new Date()),
            1000
        );
    }, []);

    return (
        <div>
            <Clock value={time}/>
        </div>
    )
};

export default Dashboard;