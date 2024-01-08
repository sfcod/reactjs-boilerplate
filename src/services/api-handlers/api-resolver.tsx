import type { AxiosError } from 'axios';
import ErrorHandlerService from 'src/services/api-handlers/error-handler';
import type { BaseThunkAPI, ReducerState, StoreState } from 'src/store/configure-store';
import type { Dispatch } from 'redux';

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

export function handleError(result: ResolverApiFailure): any {
    if (result.error && result.error.response && result.error.response.status) {
        switch (result.error.response.status) {
            case 401:
                return ErrorHandlerService.handle401Error(result);
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
    const { requestId, rejectWithValue, signal } = thunkApi;
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
            handleError({ error });
            return reject(rejectWithValue(onError ? await onError(error) : error));
        }
    });
};
