export type SortDirection = 'ASC' | 'DESC';

export interface PaginationProps {
    page?: number;
    limit?: number;
}

export interface QueryParams<F = AnyObject, S = AnyObject> extends PaginationProps {
    filters?: Partial<{ [x in keyof F]: F[x] }>;
    sorting?: Partial<{ [x in keyof S]: SortDirection }>;
}

export interface Paginated<T> {
    list: T[];
    page: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
}
