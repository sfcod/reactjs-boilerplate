import React from 'react';
import ProfileForm from './components/ProfileForm';
import DefaultLayout from 'src/components/layouts/default/DefaultLayout';

interface Props {}

const ProfileScreen: React.FC<Props> = () => {
    return (
        <DefaultLayout>
            <ProfileForm />
        </DefaultLayout>
    );
};

export default ProfileScreen;
