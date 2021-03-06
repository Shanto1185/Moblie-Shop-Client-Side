import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from './../../../Hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {

    const { user, admin, isLoading } = useAuth();

    if (isLoading) {
        return <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading..</span>
        </div>
    }
    return (
        <Route
            {...rest}
            render={({ location }) => user.email && admin ? children :
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: location }
                    }}
                ></Redirect>}
        >
        </Route>
    );
};

export default AdminRoute;