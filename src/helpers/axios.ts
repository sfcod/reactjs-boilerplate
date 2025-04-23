import type { AxiosPromise } from 'axios';
import type { Paginated, QueryParams } from '../types/common';

export const extractData = <T = any>(promise: AxiosPromise<T>) => {
    return promise.then((response) => response.data);
};

export const extractPaginatedData = <T = any>(promise: AxiosPromise<T[]>) => {
    return promise.then((response) => {
        const len = response.data instanceof Array ? response.data.length : 1;
        const list = response.data instanceof Array ? response.data : [response.data];
        const result: Paginated<T> = {
            list: list,
            page: Number(response.headers['x-current-page'] || 1),
            pageSize: Number(response.headers['x-per-page'] || len),
            totalPages: Number(response.headers['x-page-count'] || 1),
            totalCount: Number(response.headers['x-total-count'] || len),
        };
        return result;
    });
};

export const prepareSortingParams = <S extends AnyObject>(sorting: QueryParams<any, S>['sorting']) => {
    const order: Record<string, any> = {};

    if (!sorting) {
        return order;
    }

    Object.keys(sorting).forEach((key) => {
        order[`sort[${key}]`] = sorting[key as keyof S];
    });

    return order;
};

export const prepareQueryParams = <F, S>({ filters, sorting, ...rest }: QueryParams<F, S>) => {
    return { ...rest, ...filters, ...prepareSortingParams(sorting) };
};
