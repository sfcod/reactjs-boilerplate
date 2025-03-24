import React from 'react';
import styles from './assets/login-screen.module.scss';
import LoginForm from './components/LoginForm';
import classNames from 'classnames';
import Router from '../../../../navigation/router';
import routes from 'src/navigation/routes';
// import MainLayout from 'src/components/layout/MainLayout';
// import UserAuthService from '../../../../services/user-auth';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'src/hooks/dispatch';
// import { useSelector } from 'react-redux';
// import { usersSelector } from 'src/store/selectors/user-selectors';
// import { listUsers } from 'src/store/thunks/user-thunks';
// import type { Column } from 'src/components/react-table/Grid';
// import Grid from 'src/components/react-table/Grid';
// import type { User } from 'src/types/user';
// import type { QueryParams } from 'src/types/grid';
// import DateTimeColumn from 'src/components/react-table/columns/DateTimeColumn';
// import UserStatusColumn from './components/UserStatusColumn';
// import dropdownFilter from 'src/components/react-table/filters/dropdown-filter';
// import userStatus from 'src/enumerables/user-status';
// import textFilter from 'src/components/react-table/filters/text-filter';
// import dateFilter from 'src/components/react-table/filters/date-filter';
import AuthLayout from 'src/components/layout/AuthLayout';
import { useNavigate } from 'react-router-dom';
import NotAuthenticated from 'src/components/auth/NotAuthenticated';

interface StateProps {}

interface DispatchProps {}

interface OwnProps {}

interface Props extends StateProps, DispatchProps, OwnProps {}

const LoginScreen: React.FC<Props> = () => {
    // const dispatch = useDispatch();
    // const users = useSelector(usersSelector);
    const navigate = useNavigate();

    // const getData = useCallback((params: QueryParams) => {
    //     dispatch(
    //         listUsers({
    //             ...params,
    //             filters: { ...params.filters },
    //         }),
    //     );
    // }, []);

    const onLogin = () => {
        navigate(Router.generate(routes.DASHBOARD));
    };

    return (
        <NotAuthenticated redirectTo={Router.generate(routes.DASHBOARD)}>
            <AuthLayout>
                <div className={classNames(styles.login)}>
                    <div className={classNames('container')}>
                        <div className={classNames('row')}>
                            <div className={classNames('col-lg-12')}>
                                <h1 className={classNames(styles.heading)}>Company Name</h1>
                                <div className={classNames('col-lg-6', 'offset-lg-3')}>
                                    <LoginForm onSuccess={onLogin} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </NotAuthenticated>
    );
};

export default LoginScreen;
