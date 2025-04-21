import React from 'react';
import ChangePasswordForm from './components/ChangePasswordForm';
import MainLayout from 'src/components/layout/MainLayout';

interface Props {}

const ProfileScreen: React.FC<Props> = () => {
    return (
        <MainLayout>
            <ChangePasswordForm />
        </MainLayout>
    );
};

export default ProfileScreen;
