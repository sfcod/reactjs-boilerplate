import { Dispatch } from 'redux';
import { ResolverApi, ResolverApiFailure, ResolverApiSuccess } from 'src/services/api-handlers/api-resolver';
import { AuthActions } from '../constants';
import { LoginFormData as CustomerLoginFormData } from '../../screens/Auth/screens/Login/components/LoginForm';

export interface SagaPromise<T> {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}

export interface AuthLoginAction {
    type: typeof AuthActions.AUTH_LOGIN;
    payload: {
        data: CustomerLoginFormData;
        callbacks: SagaPromise<any>;
    };
}

export interface AuthLogoutAction {
    type: typeof AuthActions.AUTH_LOGOUT;
    payload: AnyObject;
}

export interface AuthCheckAction {
    type: typeof AuthActions.AUTH_CHECK;
    payload: AnyObject;
}

export interface AuthSignResetAction {
    type: string;
    payload: AnyObject;
}

export function authCheck(): AuthLogoutAction {
    return {
        type: AuthActions.AUTH_CHECK,
        payload: {},
    };
}

export function authLogout(): AuthLogoutAction {
    return {
        type: AuthActions.AUTH_LOGOUT,
        payload: {},
    };
}

export function authCustomerLogin(data: CustomerLoginFormData, callbacks: SagaPromise<any>): AuthLoginAction {
    return {
        type: AuthActions.AUTH_LOGIN,
        payload: {
            data,
            callbacks,
        },
    };
}

export const asyncAuthCustomerLogin = (data: CustomerLoginFormData, dispatch: Dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(authCustomerLogin(data, { resolve, reject }));
    });
};

export type Actions =
    | AuthLoginAction
    | AuthLogoutAction
    | AuthCheckAction
    | (ResolverApi & ResolverApiFailure)
    | (ResolverApi & ResolverApiSuccess);
