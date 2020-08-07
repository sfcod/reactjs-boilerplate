import { UseFiltersColumnProps } from 'react-table';

export interface FilterProps<T extends Record<string, unknown>> {
    column: UseFiltersColumnProps<T>;
}
