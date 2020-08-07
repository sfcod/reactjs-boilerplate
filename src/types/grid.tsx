export interface PaginationProps {
    page: number;
    limit: number;
    pagination?: 0 | 1;
}

export interface QueryParams extends PaginationProps {
    filters?: AnyObject;
    sorting?: AnyObject;
}

export type SortDirection = 'asc' | 'desc' | null;
