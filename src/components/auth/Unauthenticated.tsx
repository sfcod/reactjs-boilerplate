import React from 'react';
import { useAuth } from 'src/hooks/auth';
import { Navigate, Outlet } from 'react-router';
import routes from '../../navigation/routes';

interface Props {}

const Unauthenticated: React.FC<Props> = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return <Navigate to={routes.HOME} />;
    }

    return <Outlet />;
};

export default Unauthenticated;
