import GoogleCalendar from "react-google-calendar-smart-mirror";
import React from "react";


const GoogleCalendarWrapper = (props) => {
    return(
        <GoogleCalendar
            url={ props.googleCalendarAPI && props.googleCalendarAPI.googleCalendarURL}
            width={props.googleCalendarAPI && props.googleCalendarAPI.googleCalendarWidth}
            height={props.googleCalendarAPI && props.googleCalendarAPI.googleCalendarHeight}
        />
    )
};

export default GoogleCalendarWrapper;