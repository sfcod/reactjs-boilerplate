import { AxiosResponse } from 'axios';
import { ResolverApi } from './api-resolver';
import lodash from 'lodash';

export interface PaginatedBaseMeta {
    updatedAt?: number;
}

export type ListType<T> = T[];

export interface ListTypeMeta<T, M extends PaginatedBaseMeta> {
    data: T[];
    meta: M;
}

export type CallbackType<T, M> = ListType<T> | ListTypeMeta<T, M> | AxiosResponse<ListType<T>>;

export interface Paginated<T, M extends PaginatedBaseMeta = Record<string, unknown>> {
    list: ListType<T>;
    page: number;
    meta?: M;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
}

class Pagination {
    private pageSize = 20;

    private cacheDelay = 6000;

    private infinity = false;

    public *resolveApiCall<T, M extends PaginatedBaseMeta = Record<string, any>>(
        action: ResolverApi,
        nextPage = 1,
        oldData: Paginated<T, M>,
        callback: () => Promise<CallbackType<T, M>>,
        reverse = false,
        by = 'id',
    ): any {
        if (this.hasNext(nextPage, oldData.totalPages)) {
            // @TODO: fix this
            // return yield resolveApiCall(action, () => this.next<T>(nextPage, oldData, callback, reverse, by));
        }
    }

    public next = async <T, M extends PaginatedBaseMeta = Record<string, any>>(
        nextPage: number,
        oldData: Paginated<T, M>,
        callback: () => Promise<CallbackType<T, M>>,
        reverse = false,
        by = 'id',
    ): Promise<Paginated<T, M>> => {
        const list: ListType<T> = [];
        const newData = {
            list: list,
            meta: {},
            page: nextPage,
            totalPages: oldData.totalPages || -1,
            totalCount: oldData.totalCount || -1,
        } as Paginated<T, M>;

        if (nextPage <= 0) {
            throw new Error('Next page should be lg then "0"');
        }
        if (newData.totalPages === undefined || newData.totalPages === -1 || newData.totalPages >= nextPage) {
            const result: CallbackType<T, M> = await callback();

            if (result.hasOwnProperty('data')) {
                newData.list = (result as ListTypeMeta<T, M>).data;
                newData.meta = (result as ListTypeMeta<T, M>).meta || {};
            } else {
                newData.list = result as ListType<T>;
            }

            if (result.hasOwnProperty('headers')) {
                const headers = (result as AxiosResponse<ListType<T>>).headers;

                if (headers['x-per-page']) {
                    // this.pageSize = parseInt(headers['x-per-page'], 10);
                    newData.pageSize = parseInt(headers['x-per-page'], 10);
                }

                if (headers['x-page-count']) {
                    newData.totalPages = parseInt(headers['x-page-count'], 10);
                }

                if (headers['x-total-count']) {
                    newData.totalCount = parseInt(headers['x-total-count'], 10);
                }
            }

            if (newData.meta) {
                newData.meta.updatedAt = Date.now();
            }

            if (!this.infinity || nextPage === 1) {
                return newData;
            } else {
                return this.merge<T, M>(oldData, newData, reverse, by);
            }
        }

        return oldData;
    };

    public hasNext = (nextPage: number, totalPages = -1): boolean => {
        if (nextPage === 1 || totalPages === -1) {
            return true;
        }

        return totalPages >= nextPage;
    };

    public merge = <T, M extends PaginatedBaseMeta = Record<string, unknown>>(
        oldData: Paginated<T, M>,
        newData: Paginated<T, M>,
        reverse = false,
        by = 'id',
    ): Paginated<T, M> => {
        const list = lodash.uniqBy(
            reverse ? [...newData.list, ...oldData.list] : [...oldData.list, ...newData.list],
            by,
        );

        return {
            ...newData,
            list,
        };
    };

    public reset = <T, M extends PaginatedBaseMeta = Record<string, unknown>>(
        data: Paginated<T, M>,
    ): Paginated<T, M> => {
        const newMeta = { ...data.meta, updatedAt: 0 } as any;

        return { ...data, meta: newMeta };
    };

    public isExpired = <T, M extends PaginatedBaseMeta>(
        data: Paginated<T, M>,
        update?: (data: Paginated<T, M>) => boolean,
    ): boolean => {
        const updatedAt = data.meta && data.meta.updatedAt ? data.meta.updatedAt : 0;

        if (!data || !updatedAt || Date.now() - updatedAt > this.cacheDelay) {
            return true;
        }

        return (update && update(data)) || false;
    };

    // public getPageSize = (): number => {
    //     return this.pageSize;
    // };

    // public setPageSize = (value: number): Pagination => {
    //     this.pageSize = value;
    //
    //     return this;
    // };

    public getInfinity = (): boolean => {
        return this.infinity;
    };

    public setInfinity = (value: boolean): Pagination => {
        this.infinity = value;

        return this;
    };

    public setCacheDelay = (value: number): Pagination => {
        this.cacheDelay = value;

        return this;
    };
}

const PaginationService = new Pagination();

export { Pagination, PaginationService };
