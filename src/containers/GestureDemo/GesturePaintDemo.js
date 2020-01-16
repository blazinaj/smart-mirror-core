/**
 * Author: Anatoli Railean
 * Created: 01/15/2020
 *
 * Description: This component displays UI for painting with your hand
 *
 */

import React from "react";
import {useHandGestures} from "../../hooks/useHandGestures";

const GesturePaintDemo = () => {

    const HandGesturesHook = useHandGestures();

    return (
        <div style={{background: "black"}}>
            {
                HandGesturesHook.paintUI
            }
        </div>
    )
};

export default GesturePaintDemo;