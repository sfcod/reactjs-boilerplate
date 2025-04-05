import { ReactNode, useMemo } from 'react';
import textFilter from 'src/components/react-table/filters/text-filter';
import Grid, { Column } from 'src/components/react-table/Grid';
import { Paginated, PaginatedBaseMeta } from 'src/services/api-handlers/pagination';
import { QueryParams } from 'src/types/grid';
import { User } from 'src/types/user';
import UserStatusColumn from './UserStatusColumn';
import dropdownFilter from 'src/components/react-table/filters/dropdown-filter';
import userStatus from 'src/enumerables/user-status';
import DateTimeColumn from 'src/components/react-table/columns/DateTimeColumn';
import dateFilter from 'src/components/react-table/filters/date-filter';
import React from 'react';

interface Props {
    title?: ReactNode | string;
    columns?: Column<User>[];
    actionsColumn?: Column<User>;
    data: Paginated<User, PaginatedBaseMeta>;
    getData: (params: QueryParams) => void;
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
        // enableColumnFilter: false, // You can disable column filter
        filter: dateFilter(),
        // filter: dateTimeFilter(),
    },
];

const UsersGrid: React.FC<Props> = ({ columns, actionsColumn, data, getData, title }: Props) => {
    const resultColumns = useMemo<Column<User>[]>(() => {
        return [...(columns || defaultColumns)];
    }, [columns]);

    if (actionsColumn) {
        resultColumns.push(actionsColumn);
    }

    return (
        <Grid<User>
            columns={resultColumns}
            data={data}
            title="User List"
            getData={getData}
            defaultSorting={{ updatedAt: 'DESC' }}
            pageSize={10}
        />
    );
};

export default React.memo(UsersGrid);
