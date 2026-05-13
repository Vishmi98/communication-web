"use client";

import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi';

import { LoginFormType } from '../auth.types';
import { handleUserLogin } from '../auth.service';
import { getLoginFormValidationSchema, loginFormInitialValues } from '../auth.utils';

import { LOCAL_STORE } from '@/constants/key';
import { UserStoreUserType } from '@/constants/types';
import { handleSaveCookieToken, handleSaveCookieUser } from '@/utils/cookie.util';
import CommonButton from '@/components/CommonButton';


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: LoginFormType, { resetForm }: { resetForm: () => void }) => {
        try {
            setIsLoading(true);

            const res = await handleUserLogin({ email: values.email, password: values.password });

            if (res.success && res?.token) {
                localStorage.setItem(LOCAL_STORE.LOCAL_USER, res.token);

                const decoded = jwt.decode(res.token) as { user: UserStoreUserType };
                handleSaveCookieToken(res.token);
                handleSaveCookieUser(JSON.stringify(decoded.user));

                toast.success(res.message);
                window.location.href = "/";
            } else {
                resetForm();
                toast.error(res.message);
            }
        } catch (error) {
            resetForm();
            console.error(error);
            toast.error("Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = "w-full px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-black transition-all duration-300 placeholder:text-gray-500";

    return (
        <>
            <div className="w-full max-w-md border border-white/10 p-5 rounded-2xl shadow-2xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">Login</h2>
                    <p className="text-zinc-400 text-sm mt-1">Please enter your details to sign in.</p>
                </div>
                <Formik
                    initialValues={loginFormInitialValues}
                    validationSchema={getLoginFormValidationSchema()}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form className="flex flex-col gap-4">
                            {/* Email Field */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium uppercase tracking-wider">
                                    Email Address
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    className={inputClasses}
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-[10px]" />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium uppercase tracking-wider">
                                    Password
                                </label>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        className={inputClasses}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-black transition-colors"
                                    >
                                        {showPassword ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-[10px]" />
                            </div>

                            <Link
                                href='/password-reset'
                                className="text-end text-xs text-zinc-400 hover:text-black transition-colors"
                            >
                                Forgot Password?
                            </Link>

                            <div>
                                <CommonButton
                                    title={isLoading ? "Signing In..." : "Sign In"}
                                    onPress={handleSubmit}
                                    backgroundColor="bg-primary"
                                    className="w-full"
                                />
                            </div>

                            <div className="text-center text-sm text-muted">
                                <span>Don't have an account? </span>
                                <Link
                                    href='/register'
                                    className="font-semibold text-black hover:text-black/70 transition-colors cursor-pointer"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default LoginForm;
