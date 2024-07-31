import React, { useEffect } from 'react';
import routes from 'src/navigation/routes';
import Router from '../../../../navigation/router';
import { useDispatch } from 'src/hooks/dispatch';
import { logout } from 'src/store/thunks/auth-thunks';
import { Navigate } from 'react-router-dom';

const LogoutScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    console.log('logout screen');
    useEffect(() => {
        dispatch(logout());
    }, []);

    return <Navigate replace={true} to={Router.generate(routes.HOME)} />;
};

export default LogoutScreen;
