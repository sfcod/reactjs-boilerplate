import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import UserAuthService from '../services/user-auth';
import type { ResultDescription } from '@reduxjs/toolkit/query';
import type { Paginated } from '../types/common';

// export const axiosBaseQuery =
//     (
//         { baseUrl }: { baseUrl: string } = { baseUrl: '' },
//     ): BaseQueryFn<
//         | {
//               url: string;
//               method?: AxiosRequestConfig['method'];
//               data?: AxiosRequestConfig['data'];
//               params?: AxiosRequestConfig['params'];
//               headers?: AxiosRequestConfig['headers'];
//           }
//         | string,
//         { data: unknown; headers: AxiosHeaders },
//         unknown
//     > =>
//     async (objOrString) => {
//         try {
//             const arg =
//                 typeof objOrString === 'object'
//                     ? objOrString
//                     : {
//                           url: objOrString,
//                           method: 'get',
//                       };
//             const result = await EndPointService.request({
//                 ...arg,
//                 url: baseUrl + arg.url,
//             });
//             return { data: result.data, headers: result.headers };
//         } catch (error) {
//             if (isAxiosError(error)) {
//                 return {
//                     error: {
//                         status: error.response?.status,
//                         data: error.response?.data || error.message,
//                     },
//                 };
//             }
//             return { error };
//         }
//     };

/**
 * Wrapper of the default fetchBaseQuery from redux-toolkit with additional refresh token handling.
 *
 * By default, a refresh token flow will be applied to all requests in case of 401 error. If you want to disable refresh token flow for a specific request,
 * then pass { disableRefreshToken: true } as an extra option.
 *
 * Example:
 * ```ts
 * login: builder.query<LoginResponse, LoginData>({
 *     query: () => `/auth/login`,
 *     extraOptions: { disableRefreshToken: true },
 * }),
 * ```
 */
export const fetchBaseQueryWithRefreshToken: typeof fetchBaseQuery = (arg) => {
    let isRefreshing = false;
    let refreshQueue: Array<{
        resolve: () => void;
        reject: () => void;
    }> = [];

    const commonHeaders = {
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json',
    };

    const refresh = (refreshToken: string) => {
        return axios.post('/auths/refresh', { refreshToken }, { baseURL: arg?.baseUrl, headers: commonHeaders });
    };

    const processRefreshQueue = (isSuccess: boolean) => {
        refreshQueue.forEach((item) => {
            isSuccess ? item.resolve() : item.reject();
        });
        refreshQueue = [];
    };

    const queryFn = fetchBaseQuery({
        ...arg,
        headers: commonHeaders,
        // Add token to headers
        prepareHeaders: (headers, api) => {
            const token = UserAuthService.getToken();
            token && headers.set('Authorization', `Bearer ${token}`);
            return arg?.prepareHeaders ? arg.prepareHeaders(headers, api) : headers;
        },
    });

    return async (fetchArgs, api, extraOptions: { disableRefreshToken?: boolean; [k: string]: any } = {}) => {
        const disableRefreshToken = extraOptions.disableRefreshToken ?? false;

        const result = await queryFn(fetchArgs, api, extraOptions);

        // if refresh token disabled or error status code is not 401, then return the result
        if (disableRefreshToken || !result.error || result.error.status !== 401) {
            return result;
        }

        // Put the request in the refresh queue
        const delayedRequest = new Promise<void>((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
        })
            // call queryFn again with refreshed token
            .then(() => queryFn(fetchArgs, api, extraOptions))
            // use an original result with error if refresh failed
            .catch(() => result);

        // if a refresh process already started, then return the delayed request
        if (isRefreshing) {
            return delayedRequest;
        }

        isRefreshing = true;
        const currentRefreshToken = UserAuthService.getRefreshToken();

        // if no refresh token, then return the result and reject the refresh queue
        if (!currentRefreshToken) {
            isRefreshing = false;
            processRefreshQueue(false);
            await UserAuthService.logout();
            window.location.reload();
            return result;
        }

        try {
            const { data } = await refresh(currentRefreshToken);
            await UserAuthService.login(data.token, data.refreshToken, true);
            processRefreshQueue(true);
            isRefreshing = false;

            return delayedRequest;
        } catch (error: any) {
            console.log('Refresh token failed: ', error);
            isRefreshing = false;
            processRefreshQueue(false);
            return result;
        }
    };
};

/**
 * Creates a tag provider for a query.
 *
 * Behavior is different based on result entity and number of arguments.
 * If the result entity has an id property, then a 'typed' tag with id will be added to a tags array (e.g. ['User', { type: 'User', id: 1 }])
 *
 * If the result entity has an id property, and two arguments are provided, then the second argument will be used as a type in a typed argument
 *
 * Example of usage:
 * ```ts
 * // User entity has an id property
 * getUsers: builder.query<User[], void>({
 *     query: () => `users/${id}`,
 *     providesTags: createTagProvider('Users')
 * }),
 * // Result will be: ['Users', { type: 'Users', id: 1 }, { type: 'Users', id: 2 }, ...]
 *
 * // User entity has an id property
 * getUser: builder.query<User, string>({
 *     query: (id) => `users/${id}`,
 *     providesTags: createTagProvider('UsersList', 'User')
 * }),
 * // Result will be: ['UsersList', { type: 'User', id: 1 }]. Type will be 'User' - the second argument
 *
 * // Entity doesn't have an id property
 * getUser: builder.query<Entity, string>({
 *     query: (name) => `entities/${name}`,
 *     providesTags: createTagProvider('Entity')
 * }),
 * // Result will be: ['Entity']. No id, then no typed tag.
 * ```
 */
export const createTagProvider = <T extends string, R, Q, E, M>(
    tag: T,
    typedTag?: T | null,
    opts?: { invalidateOnError?: boolean },
): ResultDescription<T, R, Q, E, M> => {
    return (result, err) => {
        const invalidateOnError = opts?.invalidateOnError ?? false;
        const resultArray = result instanceof Array ? result : [result];
        const resultWithIds = resultArray.filter((item) => Boolean(item?.id));
        const type = !typedTag ? tag : typedTag;

        if (err && !invalidateOnError) {
            return [];
        }
        return [tag, ...resultWithIds.map((item) => ({ type, id: item.id }))] as const;
    };
};

export const paginatedTransformer = <R, M extends { response?: { headers?: any } }, A>(
    rawResult: R[],
    meta?: M,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _?: A,
): Paginated<R> => {
    const headers = meta?.response?.headers;
    const len = rawResult?.length || 1;
    const result: Paginated<R> = {
        list: rawResult,
        page: Number(headers?.['x-current-page'] || 1),
        pageSize: Number(headers?.['x-per-page'] || len),
        totalPages: Number(headers?.['x-page-count'] || 1),
        totalCount: Number(headers?.['x-total-count'] || len),
    };
    return result;
};
