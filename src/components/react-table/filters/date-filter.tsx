import { DateTimePicker } from 'react-widgets';
import type { Column } from '@tanstack/react-table';

function dateFilter<T extends Record<string, unknown>>() {
    return ({ column }: { column: Column<T, unknown> }) => {
        const handleChange = (value: Date | undefined | null) => {
            if (value) {
                column.setFilterValue((value.getTime() / 1000).toFixed(0));
            }
        };

        return <DateTimePicker valueFormat="YYYY-MM-DD" includeTime={false} onChange={handleChange} />;
    };
}

export default dateFilter;
