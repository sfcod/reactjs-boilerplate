import React from 'react';
import { useAuth } from 'src/hooks/auth';
import { Navigate, Outlet } from 'react-router';
import routes from '../../navigation/routes';
import Loader from '../ui/Loader';

interface Props {}

const Authenticated: React.FC<Props> = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to={routes.LOGIN} />;
    }

    return <Outlet />;
};

export default Authenticated;
