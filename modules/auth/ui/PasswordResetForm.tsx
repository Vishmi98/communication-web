"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { MdDone } from 'react-icons/md';

import { PasswordResetFormType } from '../auth.types';
import { restPassword } from '../auth.service';
import { getPasswordResetFormValidationSchema, passwordResetFormInitialValues } from '../auth.utils';

import CommonButton from '@/components/CommonButton';


const PasswordResetForm = () => {
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const passwordResetFormValidationSchema = getPasswordResetFormValidationSchema();

    const handleSubmit = async (values: PasswordResetFormType) => {
        setIsLoading(true);
        try {
            const response = await restPassword(values.email, values.firstName);
            if (response.success) {
                setIsSuccess(true);
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full max-w-md border border-white/10 p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-300">
                {/* Animated Check Icon Container */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                    <div className="relative flex items-center justify-center w-16 h-16 bg-primary text-black rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]">
                        <MdDone size={35} className="animate-bounce-short" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Check Your Inbox
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        We've sent a new password to your email. Please check your inbox (and spam folder) to log back into your account.
                    </p>
                </div>

                {/* Action Button */}
                <CommonButton
                    title="Go to Login"
                    onPress={() => router.push('/login')}
                    backgroundColor="bg-primary"
                    className="w-full"
                />
            </div>
        );
    }

    const inputClasses = "w-full px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-black transition-all duration-300 placeholder:text-gray-500";

    return (
        <>
            <div className="w-full max-w-md border border-white/10 p-5 rounded-2xl shadow-2xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">Reset Password</h2>
                    <p className="text-zinc-400 text-sm mt-1">Please enter your email and first name to reset your password.</p>
                </div>
                <Formik
                    initialValues={passwordResetFormInitialValues}
                    validationSchema={passwordResetFormValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form className="flex flex-col gap-4">
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
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium uppercase tracking-wider">
                                    First Name
                                </label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    placeholder="Your First Name"
                                    className={inputClasses}
                                />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-[10px]" />
                            </div>

                            <div>
                                <CommonButton
                                    title={isLoading ? "Resetting..." : "Reset Password"}
                                    onPress={handleSubmit}
                                    backgroundColor="bg-primary"
                                    className="w-full"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default PasswordResetForm;
