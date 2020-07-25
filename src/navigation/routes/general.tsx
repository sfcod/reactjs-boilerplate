import React from 'react';
import { Route } from 'react-router';
import routes from '../routes';
import CustomerLoginScreen from '../../screens/Auth/screens/Login';

const generalRoutes = [<Route exact key={routes.HOME} path={routes.HOME} component={CustomerLoginScreen} />];

export default generalRoutes;
