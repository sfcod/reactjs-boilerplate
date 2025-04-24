import { api } from './';
import type { LoginData, LoginResultData, SignupData, SignupResultData } from '../../types/auth';

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResultData, LoginData>({
            query: (data) => ({
                url: `/auths/user`,
                method: 'POST',
                body: data,
            }),
            extraOptions: { disableRefreshToken: true },
        }),

        signup: builder.mutation<SignupResultData, SignupData>({
            query: (data) => ({
                url: `/auths/signup`,
                method: 'POST',
                body: data,
            }),
            extraOptions: { disableRefreshToken: true },
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
