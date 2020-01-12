/**
 * Description: The Default Layout for the core app.
 *              Currently displays the Dashboard component.
 */

import React, { useContext, useState, useEffect } from 'react';
import Header from "./Header";
import Dashboard from "../../components/Dashboard/Dashboard";

const Home = (props) => {

    return (
        <div>
            <Header/>
            <Dashboard/>
        </div>
    )
};

export default Home;