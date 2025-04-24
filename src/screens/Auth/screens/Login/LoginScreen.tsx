import React from 'react';
import LoginForm from './components/LoginForm';
import Router from '../../../../navigation/router';
import routes from 'src/navigation/routes';
import MainLayout from 'src/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';

interface StateProps {}

interface DispatchProps {}

interface OwnProps {}

interface Props extends StateProps, DispatchProps, OwnProps {}

const LoginScreen: React.FC<Props> = () => {
    const navigate = useNavigate();

    const onLogin = () => {
        navigate(Router.generate(routes.DASHBOARD));
    };

    return (
        <MainLayout>
            <LoginForm onSuccess={onLogin} />
        </MainLayout>
    );
};

export default LoginScreen;
