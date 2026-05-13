import * as Yup from 'yup';

import { LoginFormType, PasswordResetFormType, RegisterFormType, VerifyEmailTypes } from './auth.types';


export const loginFormInitialValues: LoginFormType = {
    email: '',
    password: ''
};

export const getLoginFormValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string().email("Please enter valid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });
};

export const registerFormInitialValues: RegisterFormType = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
};

export const getRegisterFormValidationSchema = () => {
    return Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });
};

export const emailModalInitialValues: VerifyEmailTypes = {
    code: '',
};

export const getEmailModalValidationSchema = () => {
    return Yup.object({
        code: Yup.string()
            .required("PIN is required")
            .length(6, "PIN must be 6 digits")
    });
}

export const passwordResetFormInitialValues: PasswordResetFormType = {
    email: '',
    firstName: ''
};

export const getPasswordResetFormValidationSchema = () => {
    return Yup.object({
        email: Yup.string()
            .email("Please enter valid email address")
            .required("Email is required")
            .max(50, "Email is too long"),
        firstName: Yup.string()
            .required("First Name is required")
    })
};