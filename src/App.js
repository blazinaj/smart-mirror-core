/**
 * Description: The Main entry point for the React app. Uses the Login Gate for Authentication.
 *              This component can handle alternate Layouts, what ever gets passed as children to the
 *              Login Gate will be displayed upon Auth.
 */

import React from 'react';
import './App.css';
import DefaultHeader from "./containers/DefaultLayout/DefaultHeader";
import DefaultLayout from "./containers/DefaultLayout/DefaultLayout";
import LoginGate from "./views/Login/LoginGate";

const App = () => {
  return (
    <div className="App">
        <LoginGate>
            <DefaultHeader />
            <DefaultLayout />
        </LoginGate>
    </div>
  );
};

export default App;