import React, { useEffect } from 'react';
import routes from 'src/navigation/routes';
import Router from '../../../../navigation/router';
import { Navigate } from 'react-router-dom';
import UserAuthService from 'src/services/user-auth';

const LogoutScreen: React.FunctionComponent = () => {
    console.log('logout screen');
    useEffect(() => {
        UserAuthService.logout();
    }, []);

    return <Navigate replace={true} to={Router.generate(routes.HOME)} />;
};

export default LogoutScreen;
