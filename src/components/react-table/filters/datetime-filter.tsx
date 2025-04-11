import { DateTimePicker } from 'react-widgets';
import moment from 'moment';
import type { Column } from '@tanstack/react-table';

moment.locale('en');

function dateTimeFilter<T extends Record<string, unknown>>() {
    return ({ column }: { column: Column<T, unknown> }) => {
        const handleChange = (date?: Date | null) => {
            if (date) {
                column.setFilterValue(moment(date).format());
            } else {
                column.setFilterValue(date);
            }
        };

        return <DateTimePicker onChange={handleChange} includeTime={false} valueFormat="LLL" />;
    };
}

export default dateTimeFilter;
