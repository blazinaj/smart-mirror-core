import React, { useState, useRef } from "react";
import GridLayout from 'react-grid-layout';
import CameraWidget from "camera-widget";
import WidgetSlot from "../../components/WidgetSlot/WidgetSlot";

const Dashboard = (props) => {

    // const layout = [
    //     {i: 'a', x: 0, y: 0, w: 15, h: 15},
    //     {i: 'b', x: 50, y: 0, w: 50, h: 10},
    //     {i: 'c', x: 0, y: 25, w: 20, h: 35, minH: 35, minW: 20},
    //     {i: 'd', x: 80, y: 0, w: 50, h: 40, isResizable:false}
    // ];

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

    const selectedWidgets = [
        <CameraWidget coreAPI={coreAPI}/>
    ];

    return (
        <>
            {/*<GridLayout*/}
                {/*autoSize={true}*/}
                {/*className="layout"*/}
                {/*verticalCompact={true}*/}
                {/*layout={layout}*/}
                {/*cols={100}*/}
                {/*rowHeight={1}*/}
                {/*width={1200}*/}
            {/*>*/}
                {
                    selectedWidgets.map((widget, index) =>
                        <WidgetSlot key={index} widget={widget}/>
                    )
                }
            {/*</GridLayout>*/}
        </>
    )
};

export default Dashboard;