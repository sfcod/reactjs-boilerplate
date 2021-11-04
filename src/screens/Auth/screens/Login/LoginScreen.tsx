import React, { useEffect } from 'react';
import styles from './assets/login-screen.module.scss';
import LoginForm from './components/LoginForm';
import classNames from 'classnames';
import MainLayout from 'src/components/layout/MainLayout';
import UserAuthService from '../../../../services/user-auth';
import { Link } from 'react-router-dom';
import Router from '../../../../navigation/router';
import { routes } from '../../../../navigation';
import { useDispatch } from 'src/hooks/dispatch';
import { useSelector } from 'react-redux';
import { usersSelector } from 'src/store/selectors/user-selectors';
import { listUsers } from 'src/store/thunks/user-thunks';

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

const LoginScreen: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);

    useEffect(() => {
        dispatch(listUsers({ page: 1, filters: { itemsPerPage: 5 } }));
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    return UserAuthService.isLoggedIn() ? (
        <MainLayout>
            <div className={classNames(styles.login)}>
                <div className={classNames('container')}>
                    <div className={classNames('row')}>
                        <div className={classNames('col-lg-12', 'py-2')}>
                            <div className={classNames(styles.noteHeading, 'mb-4')}>
                                You are logged as {UserAuthService.getData()?.username}
                            </div>
                            <div className={classNames('mb-4')}>
                                <Link to={Router.generate(routes.LOGOUT)} className={classNames('btn', 'btn-primary')}>
                                    {'Sign Out'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    ) : (
        <MainLayout>
            <div className={classNames(styles.login)}>
                <div className={classNames('container')}>
                    <div className={classNames('row')}>
                        <div className={classNames('col-lg-12')}>
                            <h1 className={classNames(styles.heading)}>Login</h1>
                            <div className={classNames('col-lg-6', 'offset-lg-3')}>
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default LoginScreen;
