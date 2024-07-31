import * as React from 'react';
import { DateTimePicker } from 'react-widgets';
import type { FilterProps } from './types';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

moment.locale('en');
momentLocalizer();

function dateTimeFilter<T extends Record<string, unknown>>(): React.FunctionComponent<FilterProps<T>> {
    return React.memo(({ column: { setFilter } }: FilterProps<T>) => {
        const handleChange = (date?: Date | null) => {
            if (date) {
                setFilter(moment(date).format());
            } else {
                setFilter(date);
            }
        };

        return <DateTimePicker onChange={handleChange} includeTime={false} valueFormat="LLL" />;
    });
}

export default dateTimeFilter;
