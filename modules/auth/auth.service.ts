import { LoginFormType, LoginResponseDataType, LoginResponseType, RegisterFormType, RegisterResponseDataType, RegisterResponseType, ResetPasswordResponseType, VerifyDataType } from "./auth.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";
import { handleSaveCookieEmail } from "@/utils/cookie.util";


export const handleUserLogin = async ({ email, password }: LoginFormType): Promise<LoginResponseType> => {
    const response: LoginResponseDataType = await apiCall({
        url: `${URL}/user/login`,
        method: 'POST',
        body: { email, password },
    })

    if (response?.success) {
        if (response?.data?.token !== '') {
            return {
                success: true,
                message: response?.message,
                token: response?.data?.token
            }
        }
        else {
            handleSaveCookieEmail(email)
            window.location.href = '/verify_email';
            return {
                success: true,
                message: response?.message,
            }

        }
    }
    else {
        return {
            success: false,
            message: response?.message,
        }
    }
};

export const handleUserRegister = async ({
    email,
    password,
    firstName,
    lastName,
    phone,
}: RegisterFormType): Promise<RegisterResponseType> => {
    const response: RegisterResponseDataType = await apiCall({
        url: `${URL}/user/create`,
        method: 'POST',
        body: {
            email,
            password,
            firstName,
            lastName,
            phone
        },
    })

    if (response?.success) {
        return {
            success: true,
            message: response?.message,
            email: response?.data?.email
        }
    }
    else {
        return {
            success: false,
            message: response?.message,
            email: ''
        }
    }
};

export const handleVerifyUser = async ({ email, code }: VerifyDataType): Promise<LoginResponseType> => {
    const response: LoginResponseDataType = await apiCall({
        url: `${URL}/user/verify`,
        method: 'POST',
        body: { email, code },
    })

    if (response?.success) {
        return {
            success: true,
            message: response?.message,
            token: response?.data?.token
        }
    }
    else {
        return {
            success: false,
            message: response?.message,
        }
    }
};

export const restPassword = async (email: string, firstName: string): Promise<ResetPasswordResponseType> => {

    const response: ResetPasswordResponseType = await apiCall({
        url: `${URL}/user/reset-password`,
        method: 'POST',
        body: { email, firstName },
    })

    console.log("response:", response)
    return ({
        success: response.success,
        message: response.message,
    });
};
