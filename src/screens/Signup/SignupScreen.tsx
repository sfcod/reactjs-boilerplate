import React, { useCallback } from 'react';
import routes from 'src/navigation/routes';
import Router from 'src/navigation/router';
import NotAuthenticated from 'src/components/auth/NotAuthenticated';
import MainLayout from 'src/components/layout/MainLayout';
import SignupForm from './components/SignupForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

interface Props {}

const SignupScreen: React.FC<Props> = () => {
    const navigate = useNavigate();
    const navigateBack = useCallback(() => {
        navigate(-1);
    }, []);

    const handleSuccess = () => {
        toast.success('User data was saved');
        navigateBack();
    };
    return (
        <NotAuthenticated redirectTo={Router.generate(routes.DASHBOARD)}>
            <MainLayout>
                <SignupForm onSuccess={handleSuccess} />
            </MainLayout>
        </NotAuthenticated>
    );
};

export default SignupScreen;
