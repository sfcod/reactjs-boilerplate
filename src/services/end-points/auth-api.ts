import type { AxiosPromise } from 'axios';
import { EndPointService } from 'src/services/api-handlers/axios';

function login(username: string, password: string): AxiosPromise<any> {
    return EndPointService.post('/auths/user', { username, password });
}

function resetPasswordRequest(payload: { username: string }): AxiosPromise<any> {
    return EndPointService.post('/users/reset-password', payload);
}

function validateResetPasswordCode(payload: { code: string }): AxiosPromise<any> {
    return EndPointService.post('/users/verify-reset-password-code', payload);
}

function updatePassword(payload: { password: string; repeatPassword: string }): AxiosPromise<any> {
    return EndPointService.post('/users/change-password', payload);
}

const refresh = (refreshToken: any): AxiosPromise<any> => {
    return EndPointService.post(`/refresh`, { refreshToken });
};

export default {
    login,
    resetPasswordRequest,
    validateResetPasswordCode,
    updatePassword,
    refresh,
};
