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

const columns: Column<Staff>[] = [
    {
        Header: 'Email',
        accessor: 'email',
        Cell: ({ cell: { value } }) => `Email: ${value}`,
        Filter: textFilter<Staff>(),
    },
];

const UsersGrid: React.FunctionComponent<Props> = ({ data, getData }: Props) => (
    <Grid<Staff> columns={columns} data={data} getData={getData} />
);

export default UsersGrid;
```

##### Documentation: https://github.com/tannerlinsley/react-table