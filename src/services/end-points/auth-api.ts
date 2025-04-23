import type { AxiosPromise } from 'axios';
import { EndPointService } from 'src/services/api-handlers/axios';
import type { LoginResultData, SignupData, SignupResultData } from '../../types/auth';

function login(username: string, password: string): AxiosPromise<LoginResultData> {
    return EndPointService.post('/auths/user', { username, password }, { handleRefreshTokens: false });
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

const refresh = (refreshToken: string): AxiosPromise<LoginResultData> => {
    return EndPointService.refresh(refreshToken);
};

function signup(data: SignupData): AxiosPromise<SignupResultData> {
    return EndPointService.post('/auths/signup', data);
}

export default {
    login,
    resetPasswordRequest,
    validateResetPasswordToken,
    updatePassword,
    refresh,
    signup,
};
