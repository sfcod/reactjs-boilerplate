export interface VerifyCodeData {
    code: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RecoveryRequestFormData {
    username: string;
}

export interface ValidateCodeFormData {
    code: string;
}

export interface ResetPasswordFormData {
    password: string;
    repeatPassword: string;
}
