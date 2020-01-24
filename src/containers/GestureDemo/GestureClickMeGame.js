import {useHandGestures} from "../../hooks/useHandGestures";
import React from "react";

const GestureClickMeGame = () => {

    const HandGesturesHook = useHandGestures();

    return (
        <div style={{background: "black", height: "100vh", width: "100%"}}>
            {
                HandGesturesHook.clickUI
            }
        </div>
    )
};

export default GestureClickMeGame;