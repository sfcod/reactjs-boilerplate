import { AxiosError } from 'axios';
import ErrorHandlerService from 'src/services/api-handlers/error-handler';
import type { BaseThunkAPI, ReducerState, StoreState } from 'src/store/configure-store';
import type { Dispatch } from 'redux';
import UserAuthService from '../user-auth';
import { AuthApi } from '../end-points';
import Router from '../../navigation/router';
import routes from '../../navigation/routes';
import { toast } from 'react-toastify';
import { isRunningStandalone } from 'src/helpers/standalone';

export interface ResolverApi {
    type: string;
    payload: any;
}

export interface ResolverApiSuccess {
    payload: any;
    sagaPayload: any;
}

export interface ResolverApiFailure {
    error: AxiosError<any>;
}

export interface ResolverActionSuccess extends ResolverApiSuccess {
    type: string;
}

export interface ResolverActionFailure extends ResolverApiFailure {
    type: string;
}

const refreshQueue: Array<CallableFunction> = [];

export function handleError(result: ResolverApiFailure): any {
    if (result.error && result.error.response && result.error.response.status) {
        switch (result.error.response.status) {
            case 401:
                return ErrorHandlerService.handle401Error(result);
            case 400:
                return ErrorHandlerService.handle400Error(result);
            case 404:
                return ErrorHandlerService.handle4xxError(result);
            case 403:
                return ErrorHandlerService.handle403Error(result);
            case 442:
                return ErrorHandlerService.handle442Error(result);
            case 500:
                return ErrorHandlerService.handle5xxError(result);
            default:
                return ErrorHandlerService.handlexxxError(result);
        }
    }

    console.info('handleError', result);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isPromise(obj: any): boolean {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.next === 'function';
}

export const resolveApiCall = async <T extends BaseThunkAPI<StoreState, any, Dispatch>, K extends ReducerState>(
    thunkApi: T,
    state: K,
    executor: () => Promise<any>,
    onError?: (err: any) => Promise<any>,
): Promise<any> => {
    const { requestId, rejectWithValue, signal, fulfillWithValue } = thunkApi;
    const { loading, requestIds } = state;
    const requestIdExists = Object.entries(requestIds).find(([, ids]) => {
        return ids.includes(requestId);
    });

    if (loading !== 'loading' || !requestIdExists) {
        return;
    }

    return await new Promise(async (resolve, reject) => {
        try {
            if (!signal.aborted) {
                resolve(await executor());
            }
        } catch (error: any) {
            if (error.code === AxiosError.ERR_NETWORK && isRunningStandalone()) {
                toast.error('No internet connection. Check your network and try again.', {
                    toastId: 'NET_ERROR',
                });
            }

            try {
                if (Number(error.response.status) === 401) {
                    return await handleRefresh(async () => {
                        try {
                            return resolve(fulfillWithValue(await executor()));
                        } catch (e) {
                            return reject(rejectWithValue(onError ? await onError(error) : error));
                        }
                    });
                }
                handleError({ error });
                reject(rejectWithValue(onError ? await onError(error) : error));
                return;
            } catch (e) {
                reject(rejectWithValue(onError ? await onError(error) : error));
                return;
            }
        }
    });
};

export async function handleRefresh(executor: () => Promise<any>) {
    const refreshToken = UserAuthService.getRefreshToken();
    if (refreshToken) {
        if (refreshQueue.length === 0) {
            refreshQueue.push(executor);
            try {
                const { data }: any = await AuthApi.refresh(refreshToken);

                await UserAuthService.login(data.token, data.refreshToken);

                while (refreshQueue.length > 0) {
                    const fn = refreshQueue.shift();
                    fn && (await fn());
                }
            } catch (e) {
                await UserAuthService.logout();
                window.location.pathname = Router.generate(routes.HOME);
            }
        } else {
            refreshQueue.push(executor);
        }
        return;
    } else {
        await UserAuthService.logout();
        window.location.pathname = Router.generate(routes.HOME);
    }
}

export function handleToastError(result: AxiosError): void {
    const message = (result as any)?.response?.data?.message;

    switch (result?.response?.status) {
        case 401:
            toast.error(message || 'Your session has expired');
            break;

        case 429:
            toast.error(message || 'To many requests');
            break;

        case 403:
            toast.error(message || 'You are not allowed to perform this action');
            break;

        case 500:
            toast.error('Something went wrong');
            break;

        case 503:
            toast.error(message || 'Service is temporarily unavailable');
            break;
    }
}
