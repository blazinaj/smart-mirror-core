import React from 'react';
import './App.css';
import Dashboard from "./views/Dashboard/Dashboard";

const App = () => {
  return (
    <div className="App">
        <AppHeader />
        <Dashboard/>
    </div>
  );
};

export default App;

const AppHeader = (props) => {

    return (
        <div
            style={{
                width: "100%",
                height: "5%",
                backgroundColor: "black",
                color: "white"
            }}
        >
            <h1>Smart Mirror Core</h1>
        </div>
    )

};
