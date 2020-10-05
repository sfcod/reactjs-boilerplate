import { Route } from 'react-router';
import React from 'react';
import routes from '../routes';
import LogoutScreen from '../../screens/Auth/screens/Logout';
import PasswordRecoveryScreen from '../../screens/Auth/screens/PasswordRecovery';

const authRoutes = [
    <Route exact key={routes.LOGOUT} path={routes.LOGOUT} component={LogoutScreen} />,
    <Route exact key={routes.PASSWORD_RECOVERY} path={routes.PASSWORD_RECOVERY} component={PasswordRecoveryScreen} />,
];

export default authRoutes;
