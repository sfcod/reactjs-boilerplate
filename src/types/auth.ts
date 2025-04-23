import type { User } from './user';

export interface VerifyCodeData {
    code: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface LoginResultData {
    token: string;
    refreshToken: string;
}

export interface RecoveryRequestFormData {
    username: string;
}

export interface ValidateCodeFormData {
    token: string;
}

export interface ResetPasswordFormData {
    password: string;
    passwordRepeat: string;
}

export interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface SignupResultData extends User {}
