import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from 'src/store/configure-store';
import { SignupApi } from 'src/services/end-points';
import UserAuthService from 'src/services/user-auth';
import { makeFormErrors } from 'src/components/react-hook-form/utils/make-form-errors';
import { AxiosError } from 'axios';
import type { SignUpData } from '../../types/signup.ts';

export const signup = createAsyncThunk<void, SignUpData, ThunkConfig>('auth/signup', async (payload, thunkAPI) => {
    try {
        const { data } = await SignupApi.signup(payload);
        await UserAuthService.login(data.token, data.refreshToken);
    } catch (err) {
        const { response } = err as any;
        const error = (() => {
            if ((err as any)?.code == AxiosError.ERR_NETWORK) {
                return 'No internet connection. Check your network and try again';
            }
            if (response?.status < 500) {
                return response.data.message || 'Incorrect credentials';
            }
            return 'Something went wrong';
        })();
        return thunkAPI.rejectWithValue(
            makeFormErrors<SignUpData>({
                _error: error,
            }),
        );
    }
});
