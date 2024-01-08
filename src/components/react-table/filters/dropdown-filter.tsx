import * as React from 'react';
import { DropdownList } from 'react-widgets';
import type { SelectableItem } from '../../../enumerables/enumerable.abstract';
import type { FilterProps } from './types';

function dropdownFilter<T extends Record<string, unknown>>(
    data: SelectableItem[],
): React.FunctionComponent<FilterProps<T>> {
    return React.memo(({ column: { filterValue, setFilter } }: FilterProps<T>) => {
        const handleChange = (item: SelectableItem) => {
            setFilter(item.value);
        };

        return (
            <DropdownList data={data} textField="name" dataKey="value" onChange={handleChange} value={filterValue} />
        );
    });
}

export default dropdownFilter;
