"use client";

import React, { FC, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { toast } from "react-toastify";
import { BiLoader } from "react-icons/bi";
import Image from "next/image";

import {
    CategoryDataType,
    ItemType,
    MainCategoryDataType,
    SubCategoryDataType,
} from "../../products/products.types";

import {
    itemInitialValues,
    itemValidationSchema,
} from "../../products/products.utils";

import {
    createItem,
    getCategories,
    getMainCategories,
    getSubCategories,
} from "../../products/products.service";

import CommonModal from "@/components/CommonModal";
import { AddModalProps } from "@/constants/types";
import CropModal from "@/components/ImageCropper";
import { MAX_SIZE_MB } from "@/constants/data";


const AddItemModal: FC<AddModalProps> = ({
    isOpen,
    onClose,
    handleReload,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [tempImageFile, setTempImageFile] = useState<File | null>(null);

    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [mainCategories, setMainCategories] = useState<MainCategoryDataType[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategoryDataType[]>([]);

    const [mainImage, setMainImage] = useState<File | null>(null);

    // ---------------- FETCH CATEGORIES ----------------
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

    // ---------------- CATEGORY CHANGE ----------------
    const handleCategoryChange = async (categoryId: number, setFieldValue: any) => {
        setFieldValue("category", categoryId);
        setFieldValue("mainCategory", 0);
        setFieldValue("subCategory", 0);

        setMainCategories([]);
        setSubCategories([]);

        const res = await getMainCategories(categoryId);
        if (res.success) {
            setMainCategories(res.mainCategories);
        }
    };

    // ---------------- MAIN CATEGORY CHANGE ----------------
    const handleMainCategoryChange = async (
        categoryId: number,
        mainCategoryId: number,
        setFieldValue: any
    ) => {
        setFieldValue("mainCategory", mainCategoryId);
        setFieldValue("subCategory", 0);

        setSubCategories([]);

        const res = await getSubCategories(categoryId, mainCategoryId);
        if (res.success) {
            setSubCategories(res.subCategories);
        }
    };

    // ---------------- SUBMIT ----------------
    const handleSubmit = async (
        values: ItemType,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            setIsLoading(true);

            const formData = new FormData();

            // 1. Append standard text fields (excluding arrays and files)
            Object.entries(values).forEach(([key, value]) => {
                if (
                    key !== "imagePaths" &&
                    key !== "imageIds" &&
                    key !== "colors" &&
                    value !== undefined &&
                    value !== null
                ) {
                    formData.append(key, String(value));
                }
            });

            // 2. Key renamed from 'mainImage' to 'image' to match backend
            if (mainImage) {
                formData.append("image", mainImage);
            }

            // 3. Handle structural Nesting for Colors & Color Images
            if (values.colors && values.colors.length > 0) {
                formData.append("colors", JSON.stringify(values.colors));

                values.colors.forEach((color: any, index: number) => {
                    if (color.file) {
                        formData.append(`colorImage_${index}`, color.file);
                    }
                });
            }

            const res = await createItem(formData);

            if (res.success) {
                toast.success("Item created successfully!");
                resetForm();
                setMainImage(null);
                handleReload();
                onClose();
            } else {
                toast.error(res.message || "Failed to create item.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Error creating item");
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
            title="Add New Item"
            maxWidth="max-w-2xl"
        >
            <Formik
                initialValues={itemInitialValues}
                validationSchema={itemValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, isSubmitting, setFieldValue }: FormikProps<ItemType>) => (
                    <Form>
                        <div className="flex flex-col gap-3 max-h-[65vh] overflow-y-auto px-4">
                            {/* NAME */}
                            <label>
                                <span className="text-xs font-medium tracking-wider">Name</span>
                                <Field name="name" className={inputClass} />
                                <ErrorMessage name="name" className="text-red-500 text-[10px]" component="div" />
                            </label>

                            {/* DESCRIPTION */}
                            <label>
                                <span className="text-xs font-medium tracking-wider">Description</span>
                                <Field as="textarea" name="description" className={inputClass} />
                                <ErrorMessage name="description" className="text-red-500 text-[10px]" component="div" />
                            </label>

                            <div className="flex flex-col md:flex-row gap-3">
                                {/* PRICE */}
                                <label className="flex-1">
                                    <span className="text-xs font-medium tracking-wider">Price</span>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        placeholder="Price"
                                        value={values.price}
                                        onChange={(e) =>
                                            setFieldValue("price", Number(e.target.value))
                                        }
                                    />
                                </label>

                                {/* BRAND */}
                                <label className="flex-1">
                                    <span className="text-xs font-medium tracking-wider">Brand</span>
                                    <input
                                        className={inputClass}
                                        placeholder="Brand"
                                        value={values.brand}
                                        onChange={(e) =>
                                            setFieldValue("brand", e.target.value)
                                        }
                                    />
                                </label>
                            </div>

                            <div className="flex flex-col md:flex-row gap-3">
                                {/* MODEL */}
                                <label className="flex-1">
                                    <span className="text-xs font-medium tracking-wider">Model</span>
                                    <input
                                        className={inputClass}
                                        placeholder="Model"
                                        value={values.model}
                                        onChange={(e) =>
                                            setFieldValue("model", e.target.value)
                                        }
                                    />
                                </label>

                                {/* CATEGORY */}
                                <label className='flex-1'>
                                    <span className="text-xs font-medium tracking-wider">Category</span>
                                    <select
                                        className={selectClass}
                                        value={values.category}
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
                                </label>
                            </div>

                            <div className="flex flex-col md:flex-row gap-3">
                                {/* MAIN CATEGORY */}
                                <label className='flex-1'>
                                    <span className="text-xs font-medium tracking-wider">Main Category</span>
                                    <select
                                        className={selectClass}
                                        value={values.mainCategory}
                                        onChange={(e) =>
                                            handleMainCategoryChange(
                                                values.category,
                                                Number(e.target.value),
                                                setFieldValue
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

                                {/* SUB CATEGORY */}
                                <label className='flex-1'>
                                    <span className="text-xs font-medium tracking-wider">Sub Category</span>
                                    <select
                                        className={selectClass}
                                        value={values.subCategory}
                                        onChange={(e) =>
                                            setFieldValue(
                                                "subCategory",
                                                Number(e.target.value)
                                            )
                                        }
                                    >
                                        <option value={0}>Select Sub Category</option>
                                        {subCategories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            {/* MAIN IMAGE */}
                            <label className="flex flex-col">
                                <span className="text-xs font-medium tracking-wider">Main Image (≤ 1.1 MB)</span>
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
                                        cropWidth={500} // Target product image layout widths
                                        cropHeight={500}
                                    />
                                )}

                                {mainImage && (
                                    <Image
                                        src={URL.createObjectURL(mainImage)}
                                        alt="Preview"
                                        width={200}
                                        height={200}
                                        className="mt-2 rounded-sm"
                                    />
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
                                    "Create Item"
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CommonModal>
    );
};

export default AddItemModal;