import React from 'react';
import { Route } from 'react-router';
import Login from './index';


export default (
    <Route>
        <Route component={Login} path={Login.path} />
    </Route>
);