import React from 'react';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import MainLayout from 'src/components/layout/MainLayout';

export interface Props {}

const ForgotPasswordScreen: React.FC<Props> = () => {
    return (
        <MainLayout>
            <ForgotPasswordForm />
        </MainLayout>
    );
};

export default ForgotPasswordScreen;
