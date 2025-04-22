import React, { useCallback } from 'react';
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
        <MainLayout>
            <SignupForm onSuccess={handleSuccess} />
        </MainLayout>
    );
};

export default SignupScreen;
