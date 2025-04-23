import type React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../../hooks/auth';
import routes from '../../../../navigation/routes';
import Router from '../../../../navigation/router';

const LogoutScreen: React.FunctionComponent = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout().then(() => {
            navigate(Router.generate(routes.HOME), { replace: true });
        });
    }, []);

    return null;
};

export default LogoutScreen;
