import moment from 'moment';
import * as React from 'react';
import { DateTimePicker } from 'react-widgets';
import type { FilterProps } from './types';

moment.locale('en');

function dateFilter<T extends Record<string, unknown>>(): React.FunctionComponent<FilterProps<T>> {
    return React.memo(({ column: { setFilter } }: FilterProps<T>) => {
        const handleChange = (value: Date | undefined | null) => {
            if (value) {
                setFilter((value.getTime() / 1000).toFixed(0));
            }
        };

        return <DateTimePicker valueFormat="YYYY-MM-DD" includeTime={false} onChange={handleChange} />;
    });
}

export default dateFilter;
