import React from "react";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({children, ...props}) => {
    return (
        <Route
            {...props}
            render={({ location }) =>
                props.mongoHook.isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
};

export default PrivateRoute;