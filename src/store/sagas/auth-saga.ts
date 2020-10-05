import { SubmissionError } from 'redux-form';
import { call, put, takeLatest } from 'redux-saga/effects';
import { failureType, handleError, requestType, successType } from 'src/services/api-handlers/api-resolver';
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

function* handleLogin(action: AuthLoginAction): Iterable<any> {
    const {
        type,
        payload: { data, callbacks },
        payload,
    } = action;
    yield put({ type: requestType(type) });

    try {
        const result: any = yield AuthApi.login(data.email, data.password)
            .catch(({ response }) => {
                return response;
            })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error('Incorrect email or code');
                }

                return response.data;
            });

        yield UserAuthService.login(result.token);

        yield put({
            type: successType(type),
            payload: result,
            sagaPayload: payload,
        });

        yield call(callbacks.resolve);

        yield put(push(Router.generate(routes.PROFILE)));
    } catch (error) {
        yield put({
            type: failureType(type),
            error,
            sagaPayload: payload,
        });

        yield call(
            callbacks.reject,
            new SubmissionError({
                _error: error.message ?? 'Incorrect response',
            }),
        );
    }
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

// function* handleUserLogout(action: AuthLogoutAction): Iterable<any> {
//     const { type } = action;
//
//     yield put({ type: requestType(type) });
//
//     try {
//         yield UserAuthService.logout();
//
//         // Redirect to the Home screen
//         yield put(push(Router.generate(routes.HOME)));
//
//         // Store request response to the Redux
//         yield put({
//             type: successType(type),
//             payload: {},
//             sagaPayload: {},
//         });
//     } catch (error) {
//         yield put({
//             type: failureType(type),
//             error,
//             sagaPayload: {},
//         });
//
//         yield handleError({
//             error,
//             sagaPayload: {},
//         });
//     }
// }
//
// function* handleRequestPasswordReset(action: RequestPasswordResetAction): Iterable<any> {
//     const {
//         type,
//         payload: { status, callbacks },
//         payload,
//     } = action;
//     yield resolveApiCall(
//         action,
//         () => AuthApi.requestPasswordReset(status),
//         function* (result: ResolverApiSuccess) {
//             yield call(callbacks.resolve);
//             yield NavigationService.navigate(routes.PasswordRecovery.CheckResetPassword, { email: status.email });
//         },
//         function* (result: ResolverApiFailure) {
//             if (result.error && result.error.response && result.error.response.status) {
//                 yield call(
//                     callbacks.reject,
//                     new SubmissionError({
//                         _error: result.error.response.status.message,
//                     }),
//                 );
//             }
//             handleError(result);
//         },
//     );
// }
//
// function* handleUpdatePassword(action: UpdatePasswordAction): Iterable<any> {
//     const {
//         type,
//         payload: { status, callbacks },
//         payload,
//     } = action;
//
//     const token = KeyValueStorageService.get('password-reset-token', true);
//
//     yield resolveApiCall(
//         action,
//         () => AuthApi.updatePassword(status, token),
//         function* (result: ResolverApiSuccess) {
//             yield call(callbacks.resolve);
//
//             yield UserAuthService.repairByData(token);
//
//             yield NavigationService.resetStackAction([{ routeName: routes.Account }]);
//         },
//         function* (result: ResolverApiFailure) {
//             if (result.error && result.error.response && result.error.response.status) {
//                 yield call(
//                     callbacks.reject,
//                     new SubmissionError({
//                         _error: result.error.response.status.message,
//                     }),
//                 );
//             }
//             handleError(result);
//         },
//     );
// }
//
// function* handleCheckResetCode(action: CheckResetCodeAction): Iterable<any> {
//     const {
//         type,
//         payload: { status, callbacks },
//         payload,
//     } = action;
//     yield resolveApiCall(
//         action,
//         () => AuthApi.checkResetCode(status),
//         function* (result: ResolverApiSuccess) {
//             yield call(callbacks.resolve);
//
//             const {
//                 payload: { token },
//             } = result;
//             KeyValueStorageService.set('password-reset-token', token);
//
//             yield NavigationService.navigate(routes.PasswordRecovery.UpdatePassword, { email: status.email });
//         },
//         function* (result: ResolverApiFailure) {
//             if (result.error && result.error.response && result.error.response.status) {
//                 yield call(
//                     callbacks.reject,
//                     new SubmissionError({
//                         _error: result.error.response.status.message,
//                     }),
//                 );
//             }
//             handleError(result);
//         },
//     );
// }

function* handleRecoveryPasswordRequest(action: AuthResetPasswordRequestAction): Iterable<any> {
    const {
        type,
        payload: { data, callbacks },
        payload,
    } = action;
    yield put({ type: requestType(type) });

    try {
        const result: any = yield AuthApi.resetPasswordRequest(data)
            .catch(({ response }) => {
                return response;
            })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error('Unknown email address');
                }

                return response.data;
            });

        yield put({
            type: successType(type),
            payload: result,
            sagaPayload: payload,
        });

        yield call(callbacks.resolve);
    } catch (error) {
        yield put({
            type: failureType(type),
            error,
            sagaPayload: payload,
        });

        yield call(
            callbacks.reject,
            new SubmissionError({
                _error: error.message ?? 'Incorrect response',
            }),
        );
    }
}

function* handleValidateRecoveryCode(action: AuthValidateRecoveryCodeAction): Iterable<any> {
    const {
        type,
        payload: { data, callbacks },
        payload,
    } = action;
    yield put({ type: requestType(type) });

    try {
        const result: any = yield AuthApi.validateResetPasswordToken(data)
            .catch(({ response }) => {
                return response;
            })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error('Invalid code');
                }

                return response.data;
            });

        yield UserAuthService.login(result.token);

        yield put({
            type: successType(type),
            payload: result,
            sagaPayload: payload,
        });

        yield call(callbacks.resolve);
    } catch (error) {
        yield put({
            type: failureType(type),
            error,
            sagaPayload: payload,
        });

        yield call(
            callbacks.reject,
            new SubmissionError({
                _error: error.message ?? 'Incorrect response',
            }),
        );
    }
}

function* handleUpdatePassword(action: AuthUpdatePasswordAction): Iterable<any> {
    const {
        type,
        payload: { data, callbacks },
        payload,
    } = action;
    yield put({ type: requestType(type) });

    try {
        const result: any = yield AuthApi.updatePassword(data);

        yield put({
            type: successType(type),
            payload: result,
            sagaPayload: payload,
        });

        yield call(callbacks.resolve);
    } catch (error) {
        yield put({
            type: failureType(type),
            error,
            sagaPayload: payload,
        });

        yield call(
            callbacks.reject,
            new SubmissionError({
                _error: error.message ?? 'Incorrect response',
            }),
        );
    }
}

export default function* () {
    yield takeLatest(AuthActions.AUTH_LOGIN, handleLogin);
    // yield takeLatest(AuthActions.AUTH_CHECK, handleAuthCheck);
    yield takeLatest(AuthActions.AUTH_LOGOUT, handleUserLogout);
    yield takeLatest(AuthActions.AUTH_REQUEST_PASSWORD_RESET, handleRecoveryPasswordRequest);
    yield takeLatest(AuthActions.AUTH_CHECK_RESET_CODE, handleValidateRecoveryCode);
    yield takeLatest(AuthActions.AUTH_UPDATE_PASSWORD, handleUpdatePassword);
}
