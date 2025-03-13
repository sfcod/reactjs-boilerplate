#### Usage:

```typescript
import React from 'react';
import { Paginated } from 'src/services/api-handlers/pagination';
import Grid, { Column } from 'src/components/react-table/Grid';
import textFilter from 'src/components/react-table/filters/text-filter';
import { QueryParams } from 'src/types/grid';

interface Props {
    data: Paginated<Staff>;
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

const UsersGrid: React.FunctionComponent<Props> = ({ data, getData }: Props) => (
    <Grid<User>
        columns={defaultColumns}
        data={data}
        title="User List"
        getData={getData}
        defaultSorting={{ updatedAt: 'DESC' }}
        pageSize={10}
    />
);

export default UsersGrid;
```

##### Documentation: https://github.com/tanstack/react-table
