import React from 'react';
import { Route } from 'react-router';
import routes from '../routes';
import CustomerLoginScreen from '../../screens/Auth/screens/Login';
import DashboardScreen from '../../screens/Dashboard/DashboardScreen';
import NotAuthenticated from 'src/components/auth/NotAuthenticated';
import Router from '../router';

const generalRoutes = [
    <Route
        key={routes.HOME}
        path={routes.HOME}
        element={
            <NotAuthenticated redirectTo={Router.generate(routes.DASHBOARD)}>
                <CustomerLoginScreen />
            </NotAuthenticated>
        }
    />,
    <Route key={routes.DASHBOARD} path={routes.DASHBOARD} element={<DashboardScreen />} />,
];

export default generalRoutes;
