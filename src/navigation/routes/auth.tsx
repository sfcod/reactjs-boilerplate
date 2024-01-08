import { Route } from 'react-router';
import React from 'react';
import routes from '../routes';
import LogoutScreen from '../../screens/Auth/screens/Logout';

const authRoutes = [<Route key={routes.LOGOUT} path={routes.LOGOUT} element={<LogoutScreen />} />];

export default authRoutes;
