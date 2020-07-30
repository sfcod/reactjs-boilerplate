import * as React from 'react';
import { DropdownList } from 'react-widgets';
import { SelectableItem } from '../../../enumerables/enumerable.abstract';
import { FilterProps } from './types';

function dropdownFilter<T extends object = {}>(data: SelectableItem[]): React.FunctionComponent<FilterProps<T>> {
    return React.memo(({ column: { filterValue, setFilter } }: FilterProps<T>) => {
        const handleChange = (item: SelectableItem) => {
            setFilter(item.value);
        };

        return (
            <DropdownList data={data} textField="name" valueField="value" onChange={handleChange} value={filterValue} />
        );
    });
}

export default dropdownFilter;
