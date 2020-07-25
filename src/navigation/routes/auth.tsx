import { Route } from 'react-router';
// import ForgotPassword from '../../screens/auth/screens/forgot-password';
// import ValidateToken from '../../screens/auth/screens/validate-token';
// import ResetPassword from '../../screens/auth/screens/reset-password';
import React from 'react';
import routes from '../routes';
import LogoutScreen from '../../screens/Auth/screens/Logout';

const authRoutes = [
    <Route exact key={routes.LOGOUT} path={routes.LOGOUT} component={LogoutScreen} />,
    // <Route
    //     exact
    //     path="/forgot-password"
    //     render={() => (
    //         <NotAuthenticated>
    //             <ForgotPassword />
    //         </NotAuthenticated>
    //     )}
    // />,
    // <Route
    //     exact
    //     path="/forgot-password/validate-token"
    //     render={() => (
    //         <NotAuthenticated>
    //             <ValidateToken />
    //         </NotAuthenticated>
    //     )}
    // />,
    // <Route
    //     exact
    //     path="/reset-password"
    //     render={() => (
    //         <NotAuthenticated>
    //             <ResetPassword />
    //         </NotAuthenticated>
    //     )}
    // />,
];

export default authRoutes;
