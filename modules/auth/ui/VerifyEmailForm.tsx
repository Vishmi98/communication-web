"use client";

import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import { emailModalInitialValues, getEmailModalValidationSchema } from '../auth.utils';
import { handleVerifyUser } from '../auth.service';

import { UserStoreUserType } from '@/constants/types';
import { getCookieEmail, handleRemoveCookieEmail, handleSaveCookieToken, handleSaveCookieUser } from '@/utils/cookie.util';
import CommonButton from '@/components/CommonButton';
import userStore from '@/store/userStore';


const VerifyEmailForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { addUser } = userStore();
    const emailModalValidationSchema = getEmailModalValidationSchema();
    const email = getCookieEmail();

    const inputClasses = "w-full px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-black transition-all duration-300 placeholder:text-gray-600 text-center tracking-[0.5em] text-lg font-bold";

    const handleSubmit = async (values: { code: string }, { setSubmitting }: any) => {
        try {
            setIsLoading(true);
            const res = await handleVerifyUser({ email, code: values.code });

            if (res.success && res?.token) {
                const decoded = jwt.decode(res?.token) as { user: UserStoreUserType };

                handleSaveCookieToken(res?.token);
                handleSaveCookieUser(JSON.stringify(decoded.user));
                addUser(decoded.user);

                handleRemoveCookieEmail();

                toast.success(res.message || "Email verified successfully!");
                window.location.href = "/";
            } else {
                toast.error(res.message || "Invalid verification code");
            }
        } catch (error) {
            console.error(error);
            toast.error("Verification failed");
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md border border-white/10 p-5 rounded-2xl shadow-2xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Verify Email</h2>
                <p className="text-sm mt-1 leading-relaxed">
                    We&apos;ve sent a six-digit code to <span className="text-primary font-medium">{email}</span>. Please enter it below to continue.
                </p>
            </div>

            <Formik
                initialValues={emailModalInitialValues}
                validationSchema={emailModalValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit: formikSubmit }) => (
                    <Form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium uppercase tracking-wider">
                                Verification Code
                            </label>
                            <Field
                                type="text"
                                name="code"
                                placeholder="000000"
                                className={inputClasses}
                            />
                            <ErrorMessage name="code" component="div" className="text-red-500 text-[10px]" />
                        </div>

                        <div className="mt-2">
                            <CommonButton
                                title={isLoading ? "Verifying..." : "Verify Account"}
                                onPress={formikSubmit}
                                backgroundColor="bg-primary"
                                className="w-full"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default VerifyEmailForm;