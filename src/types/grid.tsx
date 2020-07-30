export interface PaginationProps {
    page: number;
    limit: number;
    pagination?: 0 | 1;
}

export interface QueryParams extends PaginationProps {
    filters?: object;
    sorting?: object;
}

export type SortDirection = 'asc' | 'desc' | null;
