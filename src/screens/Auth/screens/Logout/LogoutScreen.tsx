import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { routes } from '../../../../navigation';
import Router from '../../../../navigation/router';
import { useDispatch } from 'src/hooks/dispatch';
import { logout } from 'src/store/thunks/auth-thunks';

const LogoutScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    console.log('logout screen');
    useEffect(() => {
        dispatch(logout());
    }, []);

    return <Redirect to={Router.generate(routes.HOME)} />;
};

export default LogoutScreen;
