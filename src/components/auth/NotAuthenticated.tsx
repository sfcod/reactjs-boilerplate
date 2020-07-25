import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import user from '../../services/user-auth';
import { routes } from '../../navigation';
import Router from '../../navigation/router';

interface Props {
    children: ReactElement;
    redirectTo?: string;
}

const NotAuthenticated: React.FunctionComponent<Props> = ({ children, redirectTo }) => {
    if (user.isLoggedIn()) {
        return <Redirect to={redirectTo ? redirectTo : Router.generate(routes.HOME)} />;
    }

    return children;
};

export default NotAuthenticated;
