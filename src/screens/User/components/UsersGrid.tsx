import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import textFilter from 'src/components/react-table/filters/text-filter';
import type { Column } from 'src/components/react-table/Grid';
import Grid from 'src/components/react-table/Grid';
import type { Paginated, PaginatedBaseMeta } from 'src/services/api-handlers/pagination';
import type { QueryParams } from 'src/types/grid';
import type { User } from 'src/types/user';
import UserStatusColumn from './UserStatusColumn';
import dropdownFilter from 'src/components/react-table/filters/dropdown-filter';
import userStatus from 'src/enumerables/user-status';
import DateTimeColumn from 'src/components/react-table/columns/DateTimeColumn';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'src/navigation/router';
import classNames from 'classnames';
import routes from 'src/navigation/routes';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';
import { useListUsersQuery } from 'src/store/api/users';
import { useState } from 'react';

interface Props {
    title?: ReactNode | string;
    columns?: Column<User>[];
    actionsColumn?: Column<User>;
}

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
        enableColumnFilter: false,
    },
];

const UsersGrid: React.FC<Props> = ({ columns, actionsColumn }: Props) => {
    const [queryParams, setQueryParams] = useState<QueryParams>({ page: 1, limit: 10 });
    const { data } = useListUsersQuery(queryParams);

    const resultColumns = useMemo<Column<User>[]>(() => {
        const base = columns ? [...columns] : [...defaultColumns];
        return actionsColumn ? [...base, actionsColumn] : base;
    }, [columns, actionsColumn]);

    const renderTitle = useCallback(
        () => (
            <div className={classNames('d-flex', 'justify-content-end')}>
                <Link className={classNames('text-decoration-none')} to={Router.generate(routes.USER_CREATE)}>
                    <FontAwesomeIcon icon={faPlus} /> Create
                </Link>
            </div>
        ),
        [],
    );

    const handleGetData = useCallback((params: QueryParams) => {
        setQueryParams((prev) => {
            const hasChanged =
                prev.page !== params.page ||
                prev.limit !== params.limit ||
                JSON.stringify(prev.filters) !== JSON.stringify(params.filters) ||
                JSON.stringify(prev.sorting) !== JSON.stringify(params.sorting);

            return hasChanged ? params : prev;
        });
    }, []);

    return (
        <Grid<User>
            columns={resultColumns}
            data={data}
            title={renderTitle()}
            getData={handleGetData}
            defaultSorting={{ updatedAt: 'DESC' }}
            pageSize={10}
        />
    );
};

export default React.memo(UsersGrid);
