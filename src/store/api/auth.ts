import { api } from './';
import UserAuthService from 'src/services/user-auth';

type LoginPayload = { username: string; password: string; remember?: boolean };
type TokenResponse = { token: string; refreshToken: string };

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<TokenResponse, LoginPayload>({
            query: (body) => ({ url: '/auths/admin', method: 'POST', body }),
            async onQueryStarted(arg, { queryFulfilled }) {
                const { data } = await queryFulfilled;
                await UserAuthService.login(data.token, data.refreshToken, Boolean(arg?.remember));
            },
            extraOptions: { disableRefreshToken: true },
        }),

        resetPasswordRequest: builder.mutation<void, { username: string }>({
            query: (body) => ({ url: '/forgot-password', method: 'POST', body }),
            extraOptions: { disableRefreshToken: true },
        }),

        validateResetPasswordToken: builder.mutation<TokenResponse, { token: string }>({
            query: (body) => ({ url: '/forgot-password/validate-token', method: 'POST', body }),
            async onQueryStarted(_arg, { queryFulfilled }) {
                const { data } = await queryFulfilled;
                await UserAuthService.login(data.token, data.refreshToken);
            },
            extraOptions: { disableRefreshToken: true },
        }),

        updatePassword: builder.mutation<void, { password: string; passwordRepeat: string }>({
            query: (body) => ({ url: '/users/reset-password', method: 'POST', body }),
            extraOptions: { disableRefreshToken: true },
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useResetPasswordRequestMutation,
    useValidateResetPasswordTokenMutation,
    useUpdatePasswordMutation,
} = authApi;
