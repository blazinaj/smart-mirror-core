// Author : Art Elikh
// Started to create Demo Page for Gestures

import React, {useState, useEffect, useContext} from "react";
import {Col, Container, Row} from "reactstrap";
import {useHandGestures} from "../../hooks/useHandGestures";

const GestureDemo = (props) => {

    const {x, swipeUI} = useHandGestures();

    const [xArray, setXArray] = useState([]);
    const [xMin, setXMin] = useState(0);
    const [xMax, setXMax] = useState(0);
    const [background, setBackground] = useState("black");

    useEffect(() => {
        if (typeof x === 'number')
            setXArray(xArray => [...xArray, x]);
    }, [x]);

    useEffect(() => {

        setXMin(Math.round(Math.min.apply(null, xArray) / 100) * 100);
        setXMax(Math.round(Math.max.apply(null, xArray) / 100) * 100);

    }, [xArray]);

    useEffect(() => {
        if (xMin === 100 && xMax === 900) {

            setBackground("#" + ((1 << 24) * Math.random() | 0).toString(16));

            setXMin(0);
            setXMax(0);
            setXArray([]);
        }
    }, [xMin, xMax]);

    return (
        <div style={{
            height: "100vh",
            background: `${background}`,
            padding: "5vw"
        }}>
            <div style={{
                position: "absolute",
                top: "0",
                right: "0"
            }}>
                {
                    swipeUI
                }
            </div>
        </div>
    )
};
export default GestureDemo;