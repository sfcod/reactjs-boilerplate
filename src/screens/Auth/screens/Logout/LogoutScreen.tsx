import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../../../store/actions/auth-actions';
import { Redirect } from 'react-router-dom';
import { routes } from '../../../../navigation';
import Router from '../../../../navigation/router';

const LogoutScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authLogout());
    });

    return <Redirect to={Router.generate(routes.HOME)} />;
};

export default LogoutScreen;
