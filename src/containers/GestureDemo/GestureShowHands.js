/**
 * Author: Anatoli Railean
 * Created: 01/15/2020
 *
 * Description: This component displays UI for showing descriptors of your hands
 *
 */

import React from "react";
import {useHandGestures} from "../../hooks/useHandGestures";

const GestureShowHands = () => {

    const HandGesturesHook = useHandGestures();

    return (
        <div style={{background: "black", height: "100vh"}}>
            {
                HandGesturesHook.handUI
            }
        </div>
    )
};

export default GestureShowHands;