import { UseFiltersColumnProps } from 'react-table';

export interface FilterProps<T extends object = {}> {
    column: UseFiltersColumnProps<T>;
}
