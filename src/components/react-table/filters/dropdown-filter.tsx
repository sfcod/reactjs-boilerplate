import * as React from 'react';
import type { SelectableItem } from 'src/enumerables/enumerable.abstract';
import { useCallback } from 'react';
import { DropdownList } from 'react-widgets';
import type { Column } from '@tanstack/react-table';

type DropdownPropsType = React.ComponentProps<typeof DropdownList>;

function dropdownFilter<T extends Record<any, any>>(data: SelectableItem[], props?: DropdownPropsType) {
    return ({ column }: { column: Column<T, unknown> }) => {
        const handleChange = (item: SelectableItem | any) => {
            column.setFilterValue(item?.value ? `${item?.value}` : null);
        };

        // react table ignores zero number, so replace it with string
        const preparedData = [{ name: '', value: null }].concat(
            data.map((item) => {
                return item.value === 0 ? { ...item, value: '0' } : item;
            }),
        );

        const getValueMapped = useCallback(
            (value: any) => {
                if (value instanceof Object) {
                    return value;
                }

                return data.find((item) => item.value === value);
            },
            [preparedData],
        );

        return (
            <DropdownList
                data={preparedData}
                textField="name"
                dataKey="value"
                onChange={handleChange}
                value={getValueMapped(column.getFilterValue())}
                {...props}
            />
        );
    };
}

export default dropdownFilter;
