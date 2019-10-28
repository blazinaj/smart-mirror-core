/**
 * Author: Jacob Blazina
 *
 * Description: The dashboard component. Displays the selected widgets in a defined layout.
 *
 */

import React, { useState, useRef, useEffect } from "react";
import GridLayout from "react-grid-layout";
import CameraWidget from "camera-widget";
import {Clock} from "react-clock";
import CameraSettings from "../../components/CameraSettings/CameraSettings";
import '../../components/WidgetSlot/css/styles.css';
import '../../components/WidgetSlot/css/test.css';
import ReactWeather from "react-open-weather";
import Calendar from 'react-calendar';

const Dashboard = (props) => {

    const [widthConstraint, setWidthConstraint] = useState(1280);
    const [heightConstraint, setHeightConstraint] = useState(720);
    const [componentWidth, setComponentWidth] = useState(500);
    const [componentHeight, setComponentHeight] = useState(500);
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
        <div key="camera-widget" data-grid={{x: 4, y: 0, w: 5, h: 10}}>
            <CameraWidget coreAPI={coreAPI}/>
        </div>,
        <div key="clock-widget" data-grid={{x: 12, y: 0, w: 2, h: 5}}>
            <ClockWidget coreAPI={coreAPI}/>
        </div>,
        <div key="camera-settings" data-grid={{ x: 0, y: 10, w: 2, h: 10}}>
            <CameraSettings cameraAPI={cameraAPI} coreAPI={coreAPI}/>
        </div>,
        <div key="weather-widget" data-grid={{ x: 12, y: 10, w: 2, h: 10}}>
            <ReactWeather
                forecast="5days"
                apikey="3a672a5bca657693859413a963d7b698"
                type="city"
                city="Spokane"
                unit="imperial"
            />
        </div>,
        <div key="calendar-widget" data-grid={{ x: 0, y: 0, w: 3, minW: 3, h: 8}}>
            <Calendar
                value={new Date()}
            />
        </div>
    ];

    return (
        <div className="layoutRoot">
            <GridLayout style={{"background":"lightGrey"}} cols={12} rowHeight={30} width={1200}>
                {
                    selectedWidgets.map((widget) =>
                        widget
                    )
                }
            </GridLayout>
        </div>
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