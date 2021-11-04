import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginFormData } from 'src/screens/Auth/screens/Login/components/LoginForm';
import { ThunkConfig } from 'src/store/configure-store';
import { resolveApiCall } from 'src/services/api-handlers/api-resolver';
import { AuthApi } from 'src/services/end-points';
import UserAuthService from 'src/services/user-auth';
import { push } from 'connected-react-router';
import Router from 'src/navigation/router';
import routes from 'src/navigation/routes';
import { makeFormErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import { RecoveryRequestFormData } from 'src/screens/Auth/screens/PasswordRecovery/components/RecoveryRequestForm';
import { ValidateCodeFormData } from 'src/screens/Auth/screens/PasswordRecovery/components/ValidateCodeForm';
import { ResetPasswordFormData } from 'src/screens/Auth/screens/PasswordRecovery/components/UpdatePasswordForm';

export const login = createAsyncThunk<void, LoginFormData, ThunkConfig>('auth/login', async (payload, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const { auth } = getState();

    return resolveApiCall(
        thunkAPI,
        auth,
        async () => {
            const { data } = await AuthApi.login(payload.username, payload.password);
            await UserAuthService.login(data.token);
            dispatch(push(Router.generate(routes.HOME)));
        },
        async (err) => {
            const { response } = err;
            return makeFormErrors<LoginFormData>({
                _error: response?.status < 500 ? 'Incorrect email or password' : 'Something went wrong',
            });
        },
    );
});

export const logout = createAsyncThunk<void, void, ThunkConfig>('auth/logout', async (payload, thunkAPI) => {
    const { dispatch } = thunkAPI;

    await UserAuthService.logout();
    dispatch(push(Router.generate(routes.HOME)));
});

export const resetPasswordRequest = createAsyncThunk<void, RecoveryRequestFormData, ThunkConfig>(
    'auth/reset-password',
    async (payload, thunkAPI) => {
        const { getState } = thunkAPI;
        const { auth } = getState();

        return resolveApiCall(
            thunkAPI,
            auth,
            async () => AuthApi.resetPasswordRequest(payload),
            async (err) => {
                const { response } = err;

                return makeFormErrors<RecoveryRequestFormData>({
                    _error: response?.status < 500 ? 'Unknown email address' : 'Something went wrong',
                });
            },
        );
    },
);

export const validateRecoveryCode = createAsyncThunk<void, ValidateCodeFormData, ThunkConfig>(
    'auth/validate-recovery-code',
    async (payload, thunkAPI) => {
        const { getState } = thunkAPI;
        const { auth } = getState();

        return resolveApiCall(
            thunkAPI,
            auth,
            async () => {
                const { data } = await AuthApi.validateResetPasswordToken(payload);
                await UserAuthService.login(data.token);
            },
            async (err) => {
                const { response } = err;

                return makeFormErrors<RecoveryRequestFormData>({
                    _error: response?.status < 500 ? 'Invalid code' : 'Something went wrong',
                });
            },
        );
    },
);

export const updatePassword = createAsyncThunk<void, ResetPasswordFormData, ThunkConfig>(
    'auth/update-password',
    async (payload, thunkAPI) => {
        const { getState } = thunkAPI;
        const { auth } = getState();

        return resolveApiCall(
            thunkAPI,
            auth,
            async () => AuthApi.updatePassword(payload),
            async (err) => {
                const { response } = err;

                return makeFormErrors<RecoveryRequestFormData>({
                    _error: response?.status < 500 ? 'Invalid code' : 'Something went wrong',
                });
            },
        );
    },
);
