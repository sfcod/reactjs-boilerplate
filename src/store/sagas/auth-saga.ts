import { call, put, takeLatest } from 'redux-saga/effects';
import {
    failureType,
    handleError,
    requestType,
    resolveApiCall,
    ResolverApiFailure,
    ResolverApiSuccess,
    successType,
} from 'src/services/api-handlers/api-resolver';
import routes from '../../navigation/routes';
import {
    AuthLoginAction,
    AuthLogoutAction,
    AuthResetPasswordRequestAction,
    AuthUpdatePasswordAction,
    AuthValidateRecoveryCodeAction,
} from '../actions/auth-actions';
import { AuthActions } from '../constants';
import UserAuthService from '../../services/user-auth';
import { push } from 'connected-react-router';
import { AuthApi } from '../../services/end-points';
import Router from '../../navigation/router';
import { makeFormErrors, makeFormErrorsFromResponse } from '../../components/react-hook-form/utils/make-form-errors';
import { LoginFormData } from '../../screens/Auth/screens/Login/components/LoginForm';
import { RecoveryRequestFormData } from '../../screens/Auth/screens/PasswordRecovery/components/RecoveryRequestForm';
import { ValidateCodeFormData } from '../../screens/Auth/screens/PasswordRecovery/components/ValidateCodeForm';
import { ResetPasswordFormData } from '../../screens/Auth/screens/PasswordRecovery/components/UpdatePasswordForm';

function* handleLogin(action: AuthLoginAction): Iterable<any> {
    const {
        payload: { data, callbacks },
    } = action;

    yield resolveApiCall(
        action,
        () => AuthApi.login(data.username, data.password),
        function* (data: ResolverApiSuccess) {
            const result = data.payload;

            yield UserAuthService.login(result.token);
            yield call(callbacks.resolve);
            yield put(push(Router.generate(routes.HOME)));
        },
        function* (data: ResolverApiFailure) {
            const {
                error: { response },
            } = data;

            let error: any = data.error;
            if (!response || response.status < 200 || response.status >= 300) {
                error = makeFormErrors<LoginFormData>({
                    _error: 'Incorrect email or password',
                });
            }

            yield call(callbacks.reject, error);
        },
    );

    // yield put({ type: requestType(type) });

    // try {
    //     const result: any = yield AuthApi.login(data.username, data.password)
    //         .catch(({ response }) => {
    //             return response;
    //         })
    //         .then((response) => {
    //             if (response.status < 200 || response.status >= 300) {
    //                 throw new Error('Incorrect email or code');
    //             }
    //
    //             return response.data;
    //         });
    //
    //     yield UserAuthService.login(result.token);
    //
    //     yield put({
    //         type: successType(type),
    //         payload: result,
    //         sagaPayload: payload,
    //     });
    //
    //     yield call(callbacks.resolve);
    //
    //     yield put(push(Router.generate(routes.PROFILE)));
    // } catch (error) {
    //     yield put({
    //         type: failureType(type),
    //         error,
    //         sagaPayload: payload,
    //     });
    //
    //     yield call(
    //         callbacks.reject,
    //         new SubmissionError({
    //             _error: error.message ?? 'Incorrect response',
    //         }),
    //     );
    // }
}

function* handleUserLogout(action: AuthLogoutAction): Iterable<any> {
    const { type } = action;

    yield put({ type: requestType(type) });

    try {
        yield UserAuthService.logout();

        // Redirect to the Home screen
        yield put(push(Router.generate(routes.HOME)));

        // Store request response to the Redux
        yield put({
            type: successType(type),
            payload: {},
            sagaPayload: {},
        });
    } catch (error) {
        yield put({
            type: failureType(type),
            error,
            sagaPayload: {},
        });

        yield handleError({
            error,
            sagaPayload: {},
        });
    }
}

function* handleRecoveryPasswordRequest(action: AuthResetPasswordRequestAction): Iterable<any> {
    const {
        payload: { data, callbacks },
    } = action;

    yield resolveApiCall(
        action,
        () => AuthApi.resetPasswordRequest(data),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function* (data: ResolverApiSuccess) {
            yield call(callbacks.resolve);
        },
        function* (data: ResolverApiFailure) {
            const {
                error: { response },
            } = data;

            let error: any = data.error;
            if (!response || response.status < 200 || response.status >= 300) {
                error = { _error: 'Unknown email address' };
            }

            yield call(callbacks.reject, makeFormErrors<RecoveryRequestFormData>(error));
        },
    );
    //
    // const {
    //     type,
    //     payload: { data, callbacks },
    //     payload,
    // } = action;
    // yield put({ type: requestType(type) });
    //
    // try {
    //     const result: any = yield AuthApi.resetPasswordRequest(data)
    //         .catch(({ response }) => {
    //             return response;
    //         })
    //         .then((response) => {
    //             if (response.status < 200 || response.status >= 300) {
    //                 throw new Error('Unknown email address');
    //             }
    //
    //             return response.data;
    //         });
    //
    //     yield put({
    //         type: successType(type),
    //         payload: result,
    //         sagaPayload: payload,
    //     });
    //
    //     yield call(callbacks.resolve);
    // } catch (error) {
    //     yield put({
    //         type: failureType(type),
    //         error,
    //         sagaPayload: payload,
    //     });
    //
    //     yield call(
    //         callbacks.reject,
    //         new SubmissionError({
    //             _error: error.message ?? 'Incorrect response',
    //         }),
    //     );
    // }
}

function* handleValidateRecoveryCode(action: AuthValidateRecoveryCodeAction): Iterable<any> {
    const {
        payload: { data, callbacks },
    } = action;

    yield resolveApiCall(
        action,
        () => AuthApi.validateResetPasswordToken(data),
        function* (data: ResolverApiSuccess) {
            const result = data.payload;

            yield UserAuthService.login(result.token);
            yield call(callbacks.resolve);
        },
        function* (data: ResolverApiFailure) {
            const {
                error: { response },
            } = data;

            let error: any = data.error;
            if (!response || response.status < 200 || response.status >= 300) {
                error = { _error: 'Invalid code' };
            }

            yield call(callbacks.reject, makeFormErrors<ValidateCodeFormData>(error));
        },
    );

    // const {
    //     type,
    //     payload: { data, callbacks },
    //     payload,
    // } = action;
    // yield put({ type: requestType(type) });
    //
    // try {
    //     const result: any = yield AuthApi.validateResetPasswordToken(data)
    //         .catch(({ response }) => {
    //             return response;
    //         })
    //         .then((response) => {
    //             if (response.status < 200 || response.status >= 300) {
    //                 throw new Error('Invalid code');
    //             }
    //
    //             return response.data;
    //         });
    //
    //     yield UserAuthService.login(result.token);
    //
    //     yield put({
    //         type: successType(type),
    //         payload: result,
    //         sagaPayload: payload,
    //     });
    //
    //     yield call(callbacks.resolve);
    // } catch (error) {
    //     yield put({
    //         type: failureType(type),
    //         error,
    //         sagaPayload: payload,
    //     });
    //
    //     yield call(
    //         callbacks.reject,
    //         new SubmissionError({
    //             _error: error.message ?? 'Incorrect response',
    //         }),
    //     );
    // }
}

function* handleUpdatePassword(action: AuthUpdatePasswordAction): Iterable<any> {
    const {
        payload: { data, callbacks },
    } = action;

    yield resolveApiCall(
        action,
        () => AuthApi.updatePassword(data),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function* (data: ResolverApiSuccess) {
            // const result = data.payload;

            yield call(callbacks.resolve);
            yield put(push(Router.generate(routes.HOME)));
        },
        function* (data: ResolverApiFailure) {
            const {
                error: { response },
            } = data;

            yield call(callbacks.reject, makeFormErrorsFromResponse<ResetPasswordFormData>(response?.data));
        },
    );

    // const {
    //     type,
    //     payload: { data, callbacks },
    //     payload,
    // } = action;
    // yield put({ type: requestType(type) });
    //
    // try {
    //     const result: any = yield AuthApi.updatePassword(data);
    //
    //     yield put({
    //         type: successType(type),
    //         payload: result,
    //         sagaPayload: payload,
    //     });
    //
    //     yield call(callbacks.resolve);
    // } catch (error) {
    //     yield put({
    //         type: failureType(type),
    //         error,
    //         sagaPayload: payload,
    //     });
    //
    //     yield call(
    //         callbacks.reject,
    //         new SubmissionError({
    //             _error: error.message ?? 'Incorrect response',
    //         }),
    //     );
    // }
}

export default function* (): Generator {
    yield takeLatest(AuthActions.AUTH_LOGIN, handleLogin);
    // yield takeLatest(AuthActions.AUTH_CHECK, handleAuthCheck);
    yield takeLatest(AuthActions.AUTH_LOGOUT, handleUserLogout);
    yield takeLatest(AuthActions.AUTH_REQUEST_PASSWORD_RESET, handleRecoveryPasswordRequest);
    yield takeLatest(AuthActions.AUTH_CHECK_RESET_CODE, handleValidateRecoveryCode);
    yield takeLatest(AuthActions.AUTH_UPDATE_PASSWORD, handleUpdatePassword);
}
