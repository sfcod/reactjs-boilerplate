import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from 'src/store/configure-store';
import { resolveApiCall } from 'src/services/api-handlers/api-resolver';
import { AuthApi } from 'src/services/end-points';
import UserAuthService from 'src/services/user-auth';
import { makeFormErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import { AxiosError } from 'axios';
import type {
    LoginData,
    RecoveryRequestFormData,
    ResetPasswordFormData,
    ValidateCodeFormData,
} from '../../types/auth.ts';

export const login = createAsyncThunk<void, LoginData, ThunkConfig>('auth/login', async (payload, thunkAPI) => {
    try {
        const { data } = await AuthApi.login(payload.username, payload.password);
        await UserAuthService.login(data.token, data.refreshToken);
    } catch (err) {
        const { response } = err as any;
        const error = (() => {
            if ((err as any)?.code == AxiosError.ERR_NETWORK) {
                return 'No internet connection. Check your network and try again';
            }
            if (response?.status < 500) {
                return response.data.message || 'Incorrect email or password';
            }
            return 'Something went wrong';
        })();
        return thunkAPI.rejectWithValue(
            makeFormErrors<LoginData>({
                _error: error,
            }),
        );
    }
});

export const logout = createAsyncThunk<void, void, ThunkConfig>('auth/logout', async () => {
    await UserAuthService.logout();
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
                const { data } = await AuthApi.validateResetPasswordCode(payload);
                await UserAuthService.login(data.token, data.refreshToken);
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
            async () => {
                await AuthApi.updatePassword(payload);
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
