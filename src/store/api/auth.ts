import { api } from './';
import UserAuthService from 'src/services/user-auth';
import type { LoginData, RecoveryRequestFormData, ValidateCodeFormData, ResetPasswordFormData } from 'src/types/auth';
import type { SignUpData } from 'src/types/signup';

type TokenResponse = { token: string; refreshToken: string };

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<TokenResponse, LoginData>({
            query: (body) => ({ url: '/auths/user', method: 'POST', body }),
            async onQueryStarted(_arg, { queryFulfilled }) {
                const { data } = await queryFulfilled;
                await UserAuthService.login(data.token, data.refreshToken);
            },
            extraOptions: { disableRefreshToken: true },
        }),

        resetPasswordRequest: builder.mutation<void, RecoveryRequestFormData>({
            query: (body) => ({ url: '/users/reset-password', method: 'POST', body }),
            extraOptions: { disableRefreshToken: true },
        }),

        validateResetPasswordCode: builder.mutation<TokenResponse, ValidateCodeFormData>({
            query: (body) => ({ url: '/users/verify-reset-password-code', method: 'POST', body }),
            async onQueryStarted(_arg, { queryFulfilled }) {
                const { data } = await queryFulfilled;
                await UserAuthService.login(data.token, data.refreshToken);
            },
            extraOptions: { disableRefreshToken: true },
        }),

        updatePassword: builder.mutation<void, ResetPasswordFormData>({
            query: (body) => ({ url: '/users/change-password', method: 'POST', body }),
            extraOptions: { disableRefreshToken: true },
        }),

        signup: builder.mutation<any, SignUpData>({
            query: (body) => ({ url: '/auths/signup', method: 'POST', body }),
            extraOptions: { disableRefreshToken: true },
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useResetPasswordRequestMutation,
    useValidateResetPasswordCodeMutation,
    useUpdatePasswordMutation,
    useSignupMutation,
} = authApi;
