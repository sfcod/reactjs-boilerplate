import { AxiosPromise } from 'axios';
import { EndPointService } from 'src/services/api-handlers/axios';

function login(username: string, password: string): AxiosPromise {
    return EndPointService.post('/login-check', { username, password });
}

function resetPasswordRequest(payload: { username: string }): AxiosPromise {
    return EndPointService.post('/forgot-password', payload);
}

function validateResetPasswordToken(payload: { token: string }): AxiosPromise {
    return EndPointService.post('/forgot-password/validate-token', payload);
}

function updatePassword(payload: { password: string; passwordRepeat: string }): AxiosPromise {
    return EndPointService.post('/users/reset-password', payload);
}

export default {
    login,
    resetPasswordRequest,
    validateResetPasswordToken,
    updatePassword,
};
