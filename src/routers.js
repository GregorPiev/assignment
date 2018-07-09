import React from 'react';
import { Router, Route, hashHistory, IndexRoute, Redirect } from 'react-router';

import Home from './pages/home/index.js';
import HomeRoute from './pages/home/router';
import LoginRoute from './pages/login/router';
import ForgotRoute from './pages/forgot/router';

export default ( 
    <Router history={hashHistory}>       
        <IndexRoute component={Home} />
        { HomeRoute }
        { LoginRoute }
        {ForgotRoute}
        <Redirect to="/" />
     </Router>   
    );