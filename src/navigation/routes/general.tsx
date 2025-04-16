import React from 'react';
import { Route } from 'react-router';
import routes from '../routes';
import CustomerLoginScreen from '../../screens/Auth/screens/Login';
import DashboardScreen from '../../screens/Dashboard/DashboardScreen';

const generalRoutes = [
    <Route key={routes.HOME} path={routes.HOME} element={<CustomerLoginScreen />} />,
    <Route key={routes.DASHBOARD} path={routes.DASHBOARD} element={<DashboardScreen />} />,
];

export default generalRoutes;
