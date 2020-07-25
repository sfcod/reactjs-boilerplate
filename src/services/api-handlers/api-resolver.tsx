import { AxiosError, AxiosResponse } from 'axios';
import { isFunction } from 'lodash';
import { call, put } from 'redux-saga/effects';
import ErrorHandlerService from 'src/services/api-handlers/error-handler';
import { Paginated } from 'src/services/api-handlers/pagination';

export const TYPES_REQUEST = 'REQUEST';
export const TYPES_OFFLINE_REQUEST = 'OFFLINE_REQUEST';
export const TYPES_OFFLINE_COMMIT = 'OFFLINE_COMMIT';
export const TYPES_OFFLINE_ROLLBACK = 'OFFLINE_ROLLBACK';
export const TYPES_SUCCESS = 'SUCCESS';
export const TYPES_FAILURE = 'FAILURE';

export interface ResolverApi {
    type: string;
    payload: any;
}

export interface ResolverApiSuccess {
    payload: any;
    sagaPayload: any;
}

export interface ResolverApiFailure {
    error: AxiosError;
    sagaPayload: any;
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

export function requestType(type: string) {
    return `${type}_${TYPES_REQUEST}`;
}

export function successType(type: string) {
    return `${type}_${TYPES_SUCCESS}`;
}

export function failureType(type: string) {
    return `${type}_${TYPES_FAILURE}`;
}

export function offlineRequestType(type: string) {
    return `${type}_${TYPES_OFFLINE_REQUEST}`;
}

export function isPromise(obj: any) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.next === 'function';
}

export function* asyncCall<T>(promise: () => Promise<AxiosResponse> | Promise<T[]>): any {
    // Resolve array of promises calls
    // if (isPromise(promise)) {
    //     result = yield promise;
    //
    // } else if (isFunction(promise)) {
    const response: AxiosResponse = yield call(promise);
    // Parse server response claims and return it
    return response.data || response;
    // } else {
    //     throw new Error('Type mismatch');
    // }
}

export function* resolveApiCall<T>(
    action: ResolverApi,
    promise: () => Promise<AxiosResponse> | Promise<T[] | Paginated<T>>,
    handleSuccess: ((data: ResolverApiSuccess) => void) | null = null,
    handleFailure: ((data: ResolverApiFailure) => void) | null = handleError,
    throwError = false,
): Generator {
    const { type, payload } = action;

    // Notify application that API call was started
    yield put({
        type: requestType(type),
        sagaPayload: payload,
    });
    let result: any = {};

    try {
        result = yield call(asyncCall, promise as any);

        // Store results to the Redux
        yield put({
            type: successType(type),
            payload: result,
            sagaPayload: payload,
        });

        if (handleSuccess && isFunction(handleSuccess)) {
            yield call(handleSuccess, {
                payload: result,
                sagaPayload: payload,
            });
        }

        return result;
    } catch (error) {
        // Store request error to the Redux
        yield put({
            type: failureType(type),
            error,
            sagaPayload: payload,
        });

        if (handleFailure && isFunction(handleFailure)) {
            yield call(handleFailure, {
                error,
                sagaPayload: payload,
            });
        }

        if (throwError) {
            // @todo Add check if dev or production. For production should be connected service log errors.
            throw error;
        }
    }
}
