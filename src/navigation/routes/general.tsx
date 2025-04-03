import React from 'react';
import { Route } from 'react-router';
import routes from '../routes';
import DashboardScreen from '../../screens/Dashboard/DashboardScreen';
import SignupScreen from '../../screens/Signup/SignupScreen';

const generalRoutes = [
    <Route key={routes.DASHBOARD} path={routes.DASHBOARD} element={<DashboardScreen />} />,
    <Route key={routes.SIGNUP} path={routes.SIGNUP} element={<SignupScreen />} />,
];

export default generalRoutes;
