"use client";

import React, { FC, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { toast } from "react-toastify";
import { BiLoader } from "react-icons/bi";
import Image from "next/image";

import {
    CategoryDataType,
    MainCategoryDataType,
    SubCategoryDataType,
    ItemType,
    EditItemModalProps
} from "../../products/products.types";
import { updateItem, getCategories, getMainCategories, getSubCategories } from "../../products/products.service";
import { itemValidationSchema } from "../../products/products.utils";

import CommonModal from "@/components/CommonModal";
import CropModal from "@/components/ImageCropper";
import { MAX_SIZE_MB } from "@/constants/data";


export const EditItemModal: FC<EditItemModalProps> = ({ isOpen, onClose, initialValues, handleReload }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [tempImageFile, setTempImageFile] = useState<File | null>(null);
    const [replacementMainImage, setReplacementMainImage] = useState<File | null>(null);

    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [mainCategories, setMainCategories] = useState<MainCategoryDataType[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategoryDataType[]>([]);

    // ---------------- FETCH CASCADING CATEGORIES ----------------
    useEffect(() => {
        const fetchCascadingCategories = async () => {
            const catRes = await getCategories();
            if (catRes.success) setCategories(catRes.categories);

            if (initialValues?.category) {
                const mainRes = await getMainCategories(initialValues.category);
                if (mainRes.success) setMainCategories(mainRes.mainCategories);
            }
            if (initialValues?.category && initialValues?.mainCategory) {
                const subRes = await getSubCategories(initialValues.category, initialValues.mainCategory);
                if (subRes.success) setSubCategories(subRes.subCategories);
            }
        };

        if (isOpen && initialValues) {
            fetchCascadingCategories();
        }
    }, [isOpen, initialValues]);

    // Cleanup object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            if (replacementMainImage) {
                URL.revokeObjectURL(URL.createObjectURL(replacementMainImage));
            }
        };
    }, [replacementMainImage]);

    // ---------------- CATEGORY CHANGE HANDLER ----------------
    const handleCategoryChange = async (categoryId: number, setFieldValue: any) => {
        setFieldValue("category", categoryId);
        setFieldValue("mainCategory", 0);
        setFieldValue("subCategory", 0);
        setMainCategories([]);
        setSubCategories([]);

        if (categoryId > 0) {
            const res = await getMainCategories(categoryId);
            if (res.success) setMainCategories(res.mainCategories);
        }
    };

    // ---------------- MAIN CATEGORY CHANGE HANDLER ----------------
    const handleMainCategoryChange = async (categoryId: number, mainCategoryId: number, setFieldValue: any) => {
        setFieldValue("mainCategory", mainCategoryId);
        setFieldValue("subCategory", 0);
        setSubCategories([]);

        if (mainCategoryId > 0) {
            const res = await getSubCategories(categoryId, mainCategoryId);
            if (res.success) setSubCategories(res.subCategories);
        }
    };

    // ---------------- SUBMIT HANDLER ----------------
    const handleSubmit = async (
        values: ItemType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        if (!initialValues?.id) {
            toast.error("Invalid product reference id.");
            return;
        }

        try {
            setIsLoading(true);
            const formData = new FormData();

            formData.append("itemId", String(initialValues.id));

            // Append standard configurations
            const textFields = [
                "name", "description", "brand", "model", "price",
                "newPrice", "category", "mainCategory", "subCategory",
                "rating", "reviews"
            ];

            textFields.forEach(field => {
                const value = values[field as keyof ItemType];
                if (value !== undefined && value !== null) {
                    formData.append(field, String(value));
                }
            });

            if (replacementMainImage) {
                formData.append("image", replacementMainImage);
            }

            const res = await updateItem(formData);
            if (res.success) {
                toast.success(res.message);
                setReplacementMainImage(null);
                handleReload();
                onClose();
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            console.error("Mutation Error:", err);
            toast.error("Internal process error runtime mutation submission.");
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const inputClass = "w-full px-4 py-2 bg-white/10 border border-black/10 rounded-lg focus:outline-none focus:border-black transition-all duration-300 placeholder:text-gray-500 text-sm";
    const selectClass = "w-full px-4 py-2.5 bg-white/10 border border-black/10 rounded-lg focus:outline-none focus:border-black transition-all duration-300 placeholder:text-gray-500 text-sm";

    if (!initialValues) return null;

    return (
        <CommonModal isOpen={isOpen} onClose={onClose} title="Update Item" maxWidth="max-w-2xl">
            <Formik
                initialValues={initialValues}
                validationSchema={itemValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ values, isSubmitting, setFieldValue }: FormikProps<ItemType>) => (
                    <Form>
                        <div className="flex flex-col gap-3 max-h-[65vh] overflow-y-auto px-4">
                            {/* ITEM NAME */}
                            <label>
                                <span className="text-xs font-medium tracking-wider">Item Name Identifier</span>
                                <Field name="name" className={inputClass} />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-[10px]" />
                            </label>

                            {/* DESCRIPTION */}
                            <label>
                                <span className="text-xs font-medium tracking-wider">Description Block Document</span>
                                <Field as="textarea" name="description" rows={3} className={inputClass} />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-[10px]" />
                            </label>

                            {/* PRICES */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <label>
                                    <span className="text-xs font-medium tracking-wider">Price</span>
                                    <Field type="number" name="price" className={inputClass} />
                                    <ErrorMessage name="price" component="div" className="text-red-500 text-[10px]" />
                                </label>
                                <label>
                                    <span className="text-xs font-medium tracking-wider">New Price (Optional)</span>
                                    <Field type="number" name="newPrice" className={inputClass} />
                                    <ErrorMessage name="newPrice" component="div" className="text-red-500 text-[10px]" />
                                </label>
                            </div>

                            {/* BRAND & MODEL */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <label>
                                    <span className="text-xs font-medium tracking-wider">Brand</span>
                                    <Field name="brand" className={inputClass} />
                                    <ErrorMessage name="brand" component="div" className="text-red-500 text-[10px]" />
                                </label>
                                <label>
                                    <span className="text-xs font-medium tracking-wider">Model</span>
                                    <Field name="model" className={inputClass} />
                                    <ErrorMessage name="model" component="div" className="text-red-500 text-[10px]" />
                                </label>
                            </div>

                            {/* CASCADING CATEGORIES DROPDOWNS */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <label>
                                    <span className="text-xs font-medium tracking-wider">Category</span>
                                    <select
                                        name="category"
                                        className={selectClass}
                                        value={values.category || 0}
                                        onChange={(e) => handleCategoryChange(Number(e.target.value), setFieldValue)}
                                    >
                                        <option value={0}>Select</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                    <ErrorMessage name="category" component="div" className="text-red-500 text-[10px]" />
                                </label>

                                <label>
                                    <span className="text-xs font-medium tracking-wider">Main Category</span>
                                    <select
                                        name="mainCategory"
                                        className={selectClass}
                                        value={values.mainCategory || 0}
                                        onChange={(e) => handleMainCategoryChange(values.category, Number(e.target.value), setFieldValue)}
                                    >
                                        <option value={0}>Select</option>
                                        {mainCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                    <ErrorMessage name="mainCategory" component="div" className="text-red-500 text-[10px]" />
                                </label>

                                <label>
                                    <span className="text-xs font-medium tracking-wider">Sub Category Node</span>
                                    <select
                                        name="subCategory"
                                        className={selectClass}
                                        value={values.subCategory || 0}
                                        onChange={(e) => setFieldValue("subCategory", Number(e.target.value))}
                                    >
                                        <option value={0}>Select</option>
                                        {subCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                    <ErrorMessage name="subCategory" component="div" className="text-red-500 text-[10px]" />
                                </label>
                            </div>

                            {/* IMAGE ACTIONS AND BUFFERS */}
                            <div className="mt-2 border border-gray-300 p-2 rounded-lg flex flex-col md:flex-row gap-4 items-center">
                                <div className="flex-1 space-y-1 w-full">
                                    <span className="text-xs font-medium tracking-wider">Main Image (≤ 1.1 MB)</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="block w-full text-xs text-gray-900 file:mr-4 file:py-1 file:px-3
                                            file:rounded-md file:border file:text-xs file:font-semibold
                                            file:bg-gray-50 hover:file:bg-gray-100 file:border-gray-200
                                            cursor-pointer"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (file.size > MAX_SIZE_MB) {
                                                    toast.error("File size constraint limit cap of 1.1 MB breached.");
                                                    return;
                                                }
                                                setTempImageFile(file);
                                                setIsCropOpen(true);
                                            }
                                        }}
                                    />
                                </div>

                                <div className="flex gap-4 self-start md:self-auto">
                                    {initialValues.mainImagePath && (
                                        <div className="text-center">
                                            <span className="block text-[9px] text-gray-500 mb-0.5">Current</span>
                                            <div className="relative w-16 h-16 border rounded bg-white overflow-hidden">
                                                <Image src={initialValues.mainImagePath} fill className="object-cover" alt="Current Asset" />
                                            </div>
                                        </div>
                                    )}
                                    {replacementMainImage && (
                                        <div className="text-center">
                                            <span className="block text-[9px] text-green-600 mb-0.5">New</span>
                                            <div className="relative w-16 h-16 border border-green-400 rounded bg-white overflow-hidden">
                                                <Image src={URL.createObjectURL(replacementMainImage)} fill className="object-cover" alt="New Buffer Setup" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* INTERNAL CROPMODAL SUB-INJECTION */}
                        {isCropOpen && tempImageFile && (
                            <CropModal
                                imageFile={tempImageFile}
                                cropWidth={500}
                                cropHeight={500}
                                onClose={() => setIsCropOpen(false)}
                                onCropComplete={(cropped) => {
                                    setReplacementMainImage(cropped);
                                    setIsCropOpen(false);
                                }}
                            />
                        )}

                        {/* INTERACTION ACTION BAR BUTTONS */}
                        <div className="flex gap-2 mt-4 px-4 pb-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full bg-gray-300 text-sm font-medium p-2 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="w-full bg-primary text-white text-sm font-medium p-2 rounded flex justify-center items-center gap-2 transition"
                            >
                                {isSubmitting || isLoading ? (
                                    <BiLoader className="animate-spin text-lg" />
                                ) : (
                                    "Update Item"
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CommonModal>
    );
};

export default EditItemModal;