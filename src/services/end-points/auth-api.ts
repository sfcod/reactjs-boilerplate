import type { AxiosPromise } from 'axios';
import { EndPointService } from 'src/services/api-handlers/axios';

function login(username: string, password: string): AxiosPromise<any> {
    return EndPointService.post('/auths/admin', { username, password });
}

function resetPasswordRequest(payload: { username: string }): AxiosPromise<any> {
    return EndPointService.post('/forgot-password', payload);
}

function validateResetPasswordToken(payload: { token: string }): AxiosPromise<any> {
    return EndPointService.post('/forgot-password/validate-token', payload);
}

function updatePassword(payload: { password: string; passwordRepeat: string }): AxiosPromise<any> {
    return EndPointService.post('/users/reset-password', payload);
}

const refresh = (refreshToken: any): AxiosPromise<any> => {
    return EndPointService.post(`/refresh`, { refreshToken });
};

export default {
    login,
    resetPasswordRequest,
    validateResetPasswordToken,
    updatePassword,
    refresh,
};
