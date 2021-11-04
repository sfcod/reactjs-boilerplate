export type SortDirection = 'ASC' | 'DESC';

export interface PaginationProps {
    page?: number;
    limit?: number;
    // pagination?: false | true;
}

export interface QueryParams<F = AnyObject, S = AnyObject> extends PaginationProps {
    filters?: { [x in keyof F]: any };
    sorting?: { [x in keyof S]: SortDirection };
}
