import { Route } from 'react-router';
import React from 'react';
import routes from '../routes';
import LogoutScreen from '../../screens/Auth/screens/Logout';
import CustomerLoginScreen from '../../screens/Auth/screens/Login';
import ForgotPasswordScreen from '../../screens/ForgotPassword/screens/ForgotPassword';
import ProfileScreen from '../../screens/ForgotPassword/screens/Profile';
import Router from '../router';
import NotAuthenticated from 'src/components/auth/NotAuthenticated';
import VerifyCodeLinkScreen from 'src/screens/ForgotPassword/screens/VerifyCodeLink';
import Authenticated from 'src/components/auth/Authenticated';

const authRoutes = [
    <Route key={routes.HOME} path={routes.HOME} element={<CustomerLoginScreen />} />,
    <Route key={routes.LOGOUT} path={routes.LOGOUT} element={<LogoutScreen />} />,
    <Route
        key={routes.FORGOT_PASSWORD}
        path={routes.FORGOT_PASSWORD}
        element={
            <NotAuthenticated redirectTo={Router.generate(routes.DASHBOARD)}>
                <ForgotPasswordScreen />
            </NotAuthenticated>
        }
    />,
    <Route
        key={routes.FORGOT_PASSWORD_VERIFY_CODE_LINK}
        path={routes.FORGOT_PASSWORD_VERIFY_CODE_LINK}
        element={
            <NotAuthenticated redirectTo={Router.generate(routes.DASHBOARD)}>
                <VerifyCodeLinkScreen />
            </NotAuthenticated>
        }
    />,
    <Route
        key={routes.PROFILE}
        path={routes.PROFILE}
        element={
            <Authenticated redirectTo={Router.generate(routes.HOME)}>
                <ProfileScreen />
            </Authenticated>
        }
    />,
];

export default authRoutes;
