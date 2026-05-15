"use client"

import React, { FC, useState } from 'react'
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { toast } from 'react-toastify'
import { BiLoader } from 'react-icons/bi'

import { CategoryDataType } from '../../products.types'
import { categoryInitialValues, categoryValidationSchema } from '../../products.utils'
import { createCategory } from '../../products.service'

import CommonModal from '@/components/CommonModal'
import { AddModalProps } from '@/constants/types'


export const AddCategoryModal: FC<AddModalProps> = ({
    isOpen,
    onClose,
    handleReload,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (
        values: CategoryDataType,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            setIsLoading(true);

            // Your API layer handles the data picking, so passing the name property is sufficient
            const res = await createCategory(values.name);

            if (res.success) {
                toast.success(res.message || "Category created successfully!");
                resetForm();
                handleReload();
                onClose();
            } else {
                toast.error(res.message || "Failed to create category.");
            }
        } catch (error) {
            console.error("Category Submission Error:", error);
            toast.error("An error occurred while creating the category.");
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const inputClass = "w-full px-4 py-2 bg-white/10 border border-black/10 rounded-lg focus:outline-none focus:border-black transition-all duration-300 placeholder:text-gray-500";

    return (
        <CommonModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Category"
            maxWidth="max-w-xl"
        >
            <Formik
                initialValues={categoryInitialValues}
                validationSchema={categoryValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }: FormikProps<CategoryDataType>) => (
                    <Form>
                        <div className="flex flex-col gap-3 max-h-[65vh] overflow-y-auto px-4">
                            {/* NAME */}
                            <label>
                                <span className="text-xs font-medium tracking-wider">Name</span>
                                <Field
                                    name="name"
                                    className={inputClass}
                                    placeholder="Enter category name"
                                />
                                <ErrorMessage name="name" className="text-red-500 text-[10px]" component="div" />
                            </label>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex gap-2 mt-4 px-4 pb-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full bg-gray-300 p-2 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="w-full bg-primary text-white p-2 rounded flex justify-center items-center gap-2"
                            >
                                {isSubmitting || isLoading ? (
                                    <BiLoader className="animate-spin" />
                                ) : (
                                    "Create Category"
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CommonModal>
    );
};