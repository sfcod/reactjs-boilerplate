import React from 'react';
import routes from 'src/navigation/routes';
import Router from 'src/navigation/router';
import NotAuthenticated from 'src/components/auth/NotAuthenticated';
import MainLayout from 'src/components/layout/MainLayout';
import SignupForm from './components/SignupForm';

interface Props {}

const SignupScreen: React.FC<Props> = () => {
    return (
        <NotAuthenticated redirectTo={Router.generate(routes.DASHBOARD)}>
            <MainLayout>
                <SignupForm />
            </MainLayout>
        </NotAuthenticated>
    );
};

export default SignupScreen;
