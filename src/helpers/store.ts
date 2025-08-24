import type { BaseQueryFn, FetchBaseQueryError, FetchBaseQueryMeta, ResultDescription } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import UserAuthService from 'src/services/user-auth';
import { API_URL } from 'src/config/env';
import sortingService from 'src/services/sorting';

type AxiosBaseQueryArgs = {
    baseUrl?: string;
    paramsSerializer?: (params: Record<string, any>) => string;
};

type AxiosBaseQueryExtraOptions = { disableRefreshToken?: boolean; [k: string]: any };

export const axiosBaseQueryWithRefreshToken = ({
    baseUrl = API_URL,
    paramsSerializer,
}: AxiosBaseQueryArgs = {}): BaseQueryFn<
    | string
    | {
          url: string;
          method?: AxiosRequestConfig['method'];
          params?: Record<string, any>;
          body?: any;
          data?: any;
          headers?: Record<string, any>;
      },
    unknown,
    FetchBaseQueryError,
    AxiosBaseQueryExtraOptions,
    FetchBaseQueryMeta
> => {
    let isRefreshing = false;
    let refreshQueue: Array<{ resolve: () => void; reject: () => void }> = [];

    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
        },
        paramsSerializer: paramsSerializer ? { serialize: paramsSerializer } : undefined,
        withCredentials: false,
    });

    const processRefreshQueue = (isSuccess: boolean) => {
        refreshQueue.forEach((item) => {
            isSuccess ? item.resolve() : item.reject();
        });
        refreshQueue = [];
    };

    const doRequest = async (
        args:
            | string
            | {
                  url: string;
                  method?: AxiosRequestConfig['method'];
                  params?: Record<string, any>;
                  body?: any;
                  data?: any;
                  headers?: Record<string, any>;
              },
    ): Promise<{
        data?: any;
        error?: FetchBaseQueryError;
        meta?: FetchBaseQueryMeta;
    }> => {
        try {
            const config: AxiosRequestConfig =
                typeof args === 'string' ? ({ url: args } as AxiosRequestConfig) : ({ ...args } as AxiosRequestConfig);
            config.method = (config.method || 'GET') as AxiosRequestConfig['method'];
            // Normalize body -> data for axios
            const body = (config as any).body;
            if (body !== undefined && (config as any).data === undefined) {
                (config as any).data = body;
                delete (config as any).body;
            }

            const token = UserAuthService.getToken();
            config.headers = {
                ...(config.headers || {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            };

            const response: AxiosResponse = await axiosInstance.request(config);

            const meta: FetchBaseQueryMeta = {
                request: {
                    url: response?.config?.url,
                    method: response?.config?.method,
                    headers: response?.config?.headers,
                } as any,
                response: {
                    status: response.status,
                    headers: response.headers,
                    url: response.request?.responseURL,
                } as any,
            };

            return { data: response.data, meta };
        } catch (err) {
            const error = err as AxiosError<any>;
            const status = error.response?.status;
            const meta: FetchBaseQueryMeta | undefined = error.response
                ? {
                      request: {
                          url: error.config?.url,
                          method: error.config?.method,
                          headers: error.config?.headers,
                      } as any,
                      response: {
                          status: error.response?.status,
                          headers: error.response?.headers,
                          url: (error.response?.request as any)?.responseURL,
                      } as any,
                  }
                : undefined;

            if (typeof status === 'number') {
                return {
                    error: {
                        status,
                        data: (error.response?.data as unknown) ?? { message: error.message },
                    } as FetchBaseQueryError,
                    meta,
                };
            }

            return {
                error: { status: 'FETCH_ERROR', error: error.message } as FetchBaseQueryError,
                meta,
            };
        }
    };

    return async (fetchArgs, _api, extraOptions: AxiosBaseQueryExtraOptions = {}) => {
        const disableRefreshToken = extraOptions.disableRefreshToken ?? false;

        const result = await doRequest(fetchArgs);

        if (!result.error || disableRefreshToken || result.error.status !== 401) {
            return result;
        }

        // Queue for token refresh and retry
        const delayedRequest = new Promise<void>((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
        })
            .then(() => doRequest(fetchArgs))
            .catch(() => result);

        if (isRefreshing) {
            return delayedRequest;
        }

        isRefreshing = true;
        const refreshToken = UserAuthService.getRefreshToken();

        if (!refreshToken) {
            isRefreshing = false;
            processRefreshQueue(false);
            await UserAuthService.logout();
            window.location.pathname = '/';
            return result;
        }

        try {
            const refreshResponse = await axiosInstance.post('/auths/refresh', { refreshToken });
            const { token: newToken, refreshToken: newRefreshToken } = refreshResponse.data || {};
            await UserAuthService.login(newToken, newRefreshToken || null);

            processRefreshQueue(true);
            isRefreshing = false;
            return delayedRequest;
        } catch (e) {
            isRefreshing = false;
            processRefreshQueue(false);
            await UserAuthService.logout();
            window.location.pathname = '/';
            return result;
        }
    };
};

export type FetchMeta = FetchBaseQueryMeta;

export const createTagProvider = <T extends string, R, Q, E, M>(
    tag: T,
    opts?: { invalidateOnError?: boolean; idKey?: string },
): ResultDescription<T, R, Q, E, M> => {
    return (result: any, err: any) => {
        const typedTag = null;
        const invalidateOnError = opts?.invalidateOnError ?? false;
        const idKey = opts?.idKey ?? 'id';
        const resultArray = Array.isArray(result?.list) ? result.list : Array.isArray(result) ? result : [result];
        const resultWithIds = resultArray.filter((item: any) => Boolean(item?.[idKey]));
        const type = tag;

        if (err && !invalidateOnError) {
            return [] as any;
        }
        return [
            tag,
            ...resultWithIds.map((item: any) => ({
                type,
                id: item?.[idKey],
            })),
        ] as const;
    };
};

export const paginatedTransformer = <R, M extends { response?: { headers?: any } }, A>(
    rawResult: R[],
    meta?: M,
    _?: A,
) => {
    const headers = (meta as any)?.response?.headers || {};
    const len = (rawResult as any)?.length || 1;
    return {
        list: rawResult,
        page: Number(headers?.['x-current-page'] || 1),
        pageSize: Number(headers?.['x-per-page'] || len),
        totalPages: Number(headers?.['x-page-count'] || 1),
        totalCount: Number(headers?.['x-total-count'] || len),
    } as any;
};

export const prepareSortingParams = (sorting: Record<string, any> | undefined) => {
    return sortingService.makeOrder(sorting);
};

export const prepareQueryParams = <F, S>(params?: { filters?: any; sorting?: any } | void) => {
    if (!params) return {};
    const { filters, sorting, ...rest } = params as any;
    return { ...rest, ...filters, ...prepareSortingParams(sorting) };
};

export const rateLimitTransformer = <R, M extends { response?: { headers?: any } }, A>(
    rawResult: R,
    meta?: M,
    _?: A,
) => {
    const headers = (meta as any)?.response?.headers || {};
    return {
        ...(rawResult as any),
        rateLimitRemaining: Number(headers?.['x-ratelimit-remaining'] || 0),
        rateLimitReset: headers?.['x-ratelimit-reset'],
    } as any;
};

export const paramsSerializer = (params: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    for (const key in params) {
        const value = params[key];
        if (Array.isArray(value)) {
            value.forEach((item) => searchParams.append(`${key}[]`, item));
        } else if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    }
    return searchParams.toString();
};
