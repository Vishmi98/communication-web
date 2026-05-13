export type LoginFormType = {
    email: string;
    password: string;
}

export type LoginResponseType = {
    success: boolean;
    message?: string;
    token?: string
}

export type LoginResponseDataType = {
    success: boolean;
    message: string;
    data: { token: string, isVerify: boolean }
}

export type RegisterFormType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
}

export type RegisterResponseType = {
    success: boolean;
    message: string;
    email: string;
}

export type RegisterResponseDataType = {
    success: boolean;
    message: string;
    data: { email: string }
}

export type VerifyEmailTypes = {
    code: string;
}

export type VerifyDataType = {
    email: string;
    code: string;
}

export type PasswordResetFormType = {
    email: string;
    firstName: string;
}

export type ResetPasswordResponseType = {
    success: boolean;
    message: string;
}