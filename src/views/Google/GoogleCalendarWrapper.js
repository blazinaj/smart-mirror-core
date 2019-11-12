import GoogleCalendar from "react-google-calendar-smart-mirror";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";


const GoogleCalendarWrapper = (props) => {

    const context = useContext(AppContext);

    return (
        <GoogleCalendar
            userId={context && context.mongoHook && context.mongoHook.authenticatedUser && context.mongoHook.authenticatedUser.id}
            url={props.googleCalendarAPI && props.googleCalendarAPI.googleCalendarURL}
            width={props.googleCalendarAPI && props.googleCalendarAPI.googleCalendarWidth}
            height={props.googleCalendarAPI && props.googleCalendarAPI.googleCalendarHeight}
        />
    )
};

export default GoogleCalendarWrapper;