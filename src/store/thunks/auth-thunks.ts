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
import { SignupApi } from 'src/services/end-points';
import { makeFormErrorsFromResponse } from 'src/components/react-hook-form/utils/make-form-errors';
import type { SignUpData } from '../../types/signup.ts';

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
                const { data } = await AuthApi.validateResetPasswordToken(payload);
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

export const signup = createAsyncThunk<void, SignUpData, ThunkConfig>('auth/signup', async (payload, thunkAPI) => {
    console.debug({ payload });
    return resolveApiCall(
        thunkAPI,
        thunkAPI.getState().auth,
        async () => {
            const response = await SignupApi.signup(payload);
            return response.data;
        },
        async (err) => {
            return makeFormErrorsFromResponse<SignUpData>(err.response.data);
        },
    );
    // try {
    //     const { data } = await SignupApi.signup(payload);
    //     await UserAuthService.login(data.token, data.refreshToken);
    // } catch (err) {
    //     const { response } = err as any;
    //     const error = (() => {
    //         if ((err as any)?.code == AxiosError.ERR_NETWORK) {
    //             return 'No internet connection. Check your network and try again';
    //         }
    //         if (response?.status < 500) {
    //             return response.data.message || 'Incorrect credentials';
    //         }
    //         return 'Something went wrong';
    //     })();
    //     return makeFormErrorsFromResponse<SignUpData>(error);
    // }
});
