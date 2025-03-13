import React, { useCallback, useEffect } from 'react';
import styles from './assets/login-screen.module.scss';
import LoginForm from './components/LoginForm';
import classNames from 'classnames';
import MainLayout from 'src/components/layout/MainLayout';
import UserAuthService from '../../../../services/user-auth';
import { Link } from 'react-router-dom';
import Router from '../../../../navigation/router';
import routes from 'src/navigation/routes';
import { useDispatch } from 'src/hooks/dispatch';
import { useSelector } from 'react-redux';
import { usersSelector } from 'src/store/selectors/user-selectors';
import { listUsers } from 'src/store/thunks/user-thunks';
import Grid, { Column } from 'src/components/react-table/Grid';
import { User } from 'src/types/user';
import { QueryParams } from 'src/types/grid';
import DateTimeColumn from 'src/components/react-table/columns/DateTimeColumn';
import UserStatusColumn from './components/UserStatusColumn';
import dropdownFilter from 'src/components/react-table/filters/dropdown-filter';
import userStatus from 'src/enumerables/user-status';
import textFilter from 'src/components/react-table/filters/text-filter';
import dateFilter from 'src/components/react-table/filters/date-filter';
import dateTimeFilter from 'src/components/react-table/filters/datetime-filter';

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

const LoginScreen: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);

    useEffect(() => {
        console.log(users);
    }, [users]);

    const getData = useCallback((params: QueryParams) => {
        dispatch(
            listUsers({
                ...params,
                filters: { ...params.filters },
            }),
        );
    }, []);

    const defaultColumns: Column<User>[] = [
        {
            header: 'First Name',
            accessorKey: 'firstName',
        },
        {
            header: 'Last Name',
            accessorKey: 'lastName',
            enableColumnFilter: false,
        },
        {
            header: 'Email',
            accessorKey: 'email',
            filter: textFilter('text', 2000), // Custom settings example
            size: 200,
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (props) => <UserStatusColumn value={props.row.original.status} />,
            enableSorting: false,
            filter: dropdownFilter<User>(userStatus.mapData()),
            size: 200,
        },
        {
            header: 'Created at',
            accessorKey: 'createdAt',
            cell: (props) => <DateTimeColumn value={props.row.original.createdAt} />,
            size: 200,
            // enableColumnFilter: false, // You can disable column filter
            filter: dateFilter(),
            // filter: dateTimeFilter(),
        },
    ];

    return UserAuthService.isLoggedIn() ? (
        <MainLayout>
            <div className={classNames(styles.login)}>
                <div className={classNames('container')}>
                    <div className={classNames('row')}>
                        <div className={classNames('col-lg-12', 'py-2')}>
                            <div className={classNames(styles.noteHeading, 'mb-4')}>
                                You are logged as {String(UserAuthService.getData()?.username)}
                            </div>
                            <div className={classNames('mb-4')}>
                                <Link to={Router.generate(routes.LOGOUT)} className={classNames('btn', 'btn-primary')}>
                                    {'Sign Out'}
                                </Link>
                            </div>
                            <Grid<User>
                                columns={defaultColumns}
                                data={users}
                                title="User List"
                                getData={getData}
                                defaultSorting={{ updatedAt: 'DESC' }}
                                pageSize={10}
                            />
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
