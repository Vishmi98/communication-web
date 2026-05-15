"use client"

import React, { FC, useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { toast } from 'react-toastify'
import { BiLoader } from 'react-icons/bi'
import Image from 'next/image'

import { CategoryDataType, MainCategoryDataType, SubCategoryType } from '../../products.types'
import { getCategories, getMainCategories, createSubCategory } from '../../products.service'
import { subCategoryInitialValues, subCategoryValidationSchema } from '../../products.utils'

import CommonModal from '@/components/CommonModal'
import { AddModalProps } from '@/constants/types'
import { MAX_SIZE_MB } from '@/constants/data'
import CropModal from '@/components/ImageCropper'


export const AddSubCategoryModal: FC<AddModalProps> = ({
    isOpen,
    onClose,
    handleReload,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [mainCategories, setMainCategories] = useState<MainCategoryDataType[]>([]);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [tempImageFile, setTempImageFile] = useState<File | null>(null);
    const [mainImage, setMainImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getCategories();
            if (res.success) setCategories(res.categories);
        };

        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    // ---------------- IMAGE CHANGE HANDLER ----------------
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_SIZE_MB) {
            toast.error("Please upload an image smaller than 1.1 MB.");
            return;
        }

        setTempImageFile(file);
        setIsCropOpen(true);
    };

    // ---------------- CROP COMPLETE HANDLER ----------------
    const handleCropComplete = (croppedFile: File) => {
        setMainImage(croppedFile);
        setTempImageFile(null);
        setIsCropOpen(false);
    };

    const handleCategoryChange = async (categoryId: number, setFieldValue: any) => {
        setFieldValue("categoryId", categoryId);
        setFieldValue("mainCategoryId", 0);

        setMainCategories([]);

        const res = await getMainCategories(categoryId);
        if (res.success) {
            setMainCategories(res.mainCategories);
        }
    };

    // ---------------- FORM SUBMISSION ----------------
    const handleSubmit = async (
        values: SubCategoryType,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        // Enforce image requirement since backend expects multipart/form-data for image properties
        if (!mainImage) {
            toast.error("Please upload and crop an image for the main category.");
            setSubmitting(false);
            return;
        }

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("categoryId", String(values.categoryId));
            formData.append("mainCategoryId", String(values.mainCategoryId));
            formData.append("image", mainImage);

            const res = await createSubCategory(formData);

            if (res.success) {
                toast.success(res.message || "Sub Category created successfully!");
                resetForm();
                setMainImage(null);
                handleReload();
                onClose();
            } else {
                toast.error(res.message || "Failed to create sub category.");
            }
        } catch (error) {
            console.error("Sub Category Submission Error:", error);
            toast.error("An error occurred while creating the sub category.");
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const inputClass = "w-full px-4 py-2 bg-white/10 border border-black/10 rounded-lg focus:outline-none focus:border-black transition-all duration-300 placeholder:text-gray-500";

    const selectClass = "w-full px-4 py-2.5 bg-white/10 border border-black/10 rounded-lg focus:outline-none focus:border-black transition-all duration-300 placeholder:text-gray-500";

    return (
        <CommonModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Sub Category"
            maxWidth="max-w-xl"
        >
            <Formik
                initialValues={subCategoryInitialValues}
                validationSchema={subCategoryValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values, setFieldValue }: FormikProps<SubCategoryType>) => (
                    <Form>
                        <div className="flex flex-col gap-3 max-h-[65vh] overflow-y-auto px-4">

                            {/* CATEGORY SELECT */}
                            <label className='flex-1'>
                                <span className="text-xs font-medium tracking-wider block mb-1">Category</span>
                                <select
                                    className={selectClass}
                                    value={values.categoryId}
                                    onChange={(e) =>
                                        handleCategoryChange(
                                            Number(e.target.value),
                                            setFieldValue
                                        )
                                    }
                                >
                                    <option value={0}>Select Category</option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage name="categoryId" className="text-red-500 text-[10px] mt-0.5" component="div" />
                            </label>

                            <label className='flex-1'>
                                <span className="text-xs font-medium tracking-wider">Main Category</span>
                                <select
                                    className={selectClass}
                                    value={values.mainCategoryId}
                                    onChange={(e) =>
                                        setFieldValue(
                                            "mainCategoryId",
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    <option value={0}>Select Main Category</option>
                                    {mainCategories.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </label>


                            {/* NAME INPUT */}
                            <label>
                                <span className="text-xs font-medium tracking-wider block mb-1">Name</span>
                                <Field
                                    name="name"
                                    className={inputClass}
                                    placeholder="Enter main category name"
                                />
                                <ErrorMessage name="name" className="text-red-500 text-[10px] mt-0.5" component="div" />
                            </label>

                            {/* MAIN IMAGE UPLOAD */}
                            <label className="flex flex-col">
                                <span className="text-xs font-medium tracking-wider block mb-1">Image (≤ 1.1 MB)</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-xs text-gray-900 file:mr-4 file:py-1 file:px-3
                                                file:rounded-md file:border file:text-xs file:font-semibold
                                                file:bg-gray-50 hover:file:bg-gray-100 file:border-gray-200
                                                cursor-pointer"
                                />

                                {/* Crop Modal Injection */}
                                {isCropOpen && tempImageFile && (
                                    <CropModal
                                        imageFile={tempImageFile}
                                        onCropComplete={handleCropComplete}
                                        onClose={() => setIsCropOpen(false)}
                                        cropWidth={500}
                                        cropHeight={500}
                                    />
                                )}

                                {mainImage && (
                                    <div className="mt-2 relative w-[200px] h-[200px]">
                                        <Image
                                            src={URL.createObjectURL(mainImage)}
                                            alt="Preview"
                                            fill
                                            className="rounded-md object-cover border border-black/10"
                                        />
                                    </div>
                                )}
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
                                    "Create Sub Category"
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CommonModal>
    );
};