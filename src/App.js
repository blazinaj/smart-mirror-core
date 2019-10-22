import React from 'react';
import './App.css';
import Dashboard from "./views/Dashboard/Dashboard";

const App = () => {
  return (
    <div className="App">
        <h1>
            Smart Mirror Core
        </h1>
        <div
            style={{
                "marginTop":"25px",
                "width":"80vw",
                "height":"90vh",
                "backgroundColor":"silver"
            }}
        >
            <Dashboard/>
        </div>
    </div>
  );
};

export default App;
