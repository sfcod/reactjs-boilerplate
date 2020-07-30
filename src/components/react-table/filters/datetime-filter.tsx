import * as React from 'react';
import { DateTimePicker } from 'react-widgets';
import { FilterProps } from './types';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DATE_FORMAT } from '../../../config/env';

moment.locale('en');
momentLocalizer();

function dateTimeFilter<T extends object = {}>(): React.FunctionComponent<FilterProps<T>> {
    return React.memo(({ column: { filterValue, setFilter } }: FilterProps<T>) => {
        const handleChange = (date?: Date) => {
            if (date) {
                setFilter(moment(date).format());
            } else {
                setFilter(date);
            }
        };

        return <DateTimePicker onChange={handleChange} time={false} format={DATE_FORMAT} />;
    });
}

export default dateTimeFilter;
