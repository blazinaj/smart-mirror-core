import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-grid-layout/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-resizable/css/styles.css';
import App from './App';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Configuration from "./views/Config/Config";

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/config" component={Configuration} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
