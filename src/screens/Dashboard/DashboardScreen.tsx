import { useMemo } from 'react';
import { Navigate } from 'react-router';
import MainLayout from 'src/components/layout/MainLayout';
import UserAuthService from 'src/services/user-auth';

interface Props {}

const DashboardScreen: React.FunctionComponent<Props> = ({}: Props) => {
    const url = useMemo<string | false>(() => {
        switch (true) {
            // case UserAuthService.isLoggedIn():
            //     return routes.USERS_LIST;

            default:
                return false;
        }
    }, [UserAuthService.isLoggedIn()]);

    if (url) {
        return <Navigate replace to={url} />;
    }

    return <MainLayout> You are logged as {String(UserAuthService.getData()?.username)}</MainLayout>;
};

export default DashboardScreen;
