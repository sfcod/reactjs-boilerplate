import React from 'react';
import { Route } from 'react-router';
import routes from '../routes';
import CustomerLoginScreen from '../../screens/Auth/screens/Login';

const generalRoutes = [<Route key={routes.HOME} path={routes.HOME} element={<CustomerLoginScreen />} />];

export default generalRoutes;
