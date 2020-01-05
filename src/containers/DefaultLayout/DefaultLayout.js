/**
 * Description: The Default Layout for the core app.
 *              Currently displays the Dashboard component.
 */

import React from 'react';
import Dashboard from "../../views/Dashboard/Dashboard";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = (props) => {
    return (
        <Dashboard/>
    )
};

export default DefaultLayout;