import type { ReactElement } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import user from '../../services/user-auth';
import routes from 'src/navigation/routes';
import Router from '../../navigation/router';

interface Props {
    children: ReactElement;
    redirectTo?: string;
}

const Authenticated: React.FunctionComponent<Props> = ({ children, redirectTo }) => {
    if (!user.isLoggedIn()) {
        return <Navigate replace={true} to={redirectTo ? redirectTo : Router.generate(routes.HOME)} />;
    }

    return children;
};

export default Authenticated;
