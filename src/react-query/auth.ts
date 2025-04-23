import { useMutation } from '@tanstack/react-query';
import type { LoginData, SignupData } from 'src/types/auth';
import authApi from 'src/services/end-points/auth-api';
import { extractData } from 'src/helpers/axios';

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginData) => extractData(authApi.login(data.username, data.password)),
        onSuccess: (result, data) => {
            console.log('useLogin', { result, data });
        },
    });
};

export const useSignup = () => {
    return useMutation({
        mutationFn: (data: SignupData) => extractData(authApi.signup(data)),
    });
};
