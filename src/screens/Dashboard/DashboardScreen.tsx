import { useMemo } from 'react';
import { Navigate } from 'react-router';
import MainLayout from 'src/components/layout/MainLayout';
import UserAuthService from 'src/services/user-auth';
import classNames from 'classnames';

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

    return (
        <MainLayout>
            <h1 className={classNames('text-center')}>Dashboard</h1>
        </MainLayout>
    );
};

export default DashboardScreen;
