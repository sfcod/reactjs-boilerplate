import { AxiosPromise } from 'axios';
import { EndPointService } from 'src/services/api-handlers/axios';

function login(username: string, password: string): AxiosPromise {
    return EndPointService.post('/login-check', { username, password });
}

function resetPasswordRequest(payload: any): AxiosPromise {
    return EndPointService.post('/forgot-password', payload);
}

function validateResetPasswordToken(payload: any): AxiosPromise {
    return EndPointService.post('/forgot-password/validate-token', payload);
}

function updatePassword(payload: any): AxiosPromise {
    return EndPointService.post('/users/reset-password', payload);
}

export default {
    login,
    resetPasswordRequest,
    validateResetPasswordToken,
    updatePassword,
};
