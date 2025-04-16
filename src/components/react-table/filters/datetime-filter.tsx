import { DateTimePicker } from 'react-widgets';
import type { Column } from '@tanstack/react-table';
import { DateTime } from 'luxon';

function dateTimeFilter<T extends Record<string, unknown>>() {
    return ({ column }: { column: Column<T, unknown> }) => {
        const handleChange = (date?: Date | null) => {
            if (date) {
                column.setFilterValue(DateTime.fromJSDate(date).toISO());
            } else {
                column.setFilterValue(date);
            }
        };

        return <DateTimePicker onChange={handleChange} includeTime={false} valueFormat="LLL" />;
    };
}

export default dateTimeFilter;
