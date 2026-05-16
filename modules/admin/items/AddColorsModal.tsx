"use client";

import React, { FC, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { toast } from "react-toastify";
import { BiLoader } from "react-icons/bi";
import Image from "next/image";

import { ItemModalProps, SingleColorFormValues } from "../../products/products.types";

import CommonModal from "@/components/CommonModal";
import CropModal from "@/components/ImageCropper";
import { MAX_SIZE_MB } from "@/constants/data";
import { addColors } from "@/modules/products/products.service";
import { colorInitialValues, colorValidationSchema } from "@/modules/products/products.utils";


export const AddColorsModal: FC<ItemModalProps> = ({ isOpen, onClose, item, handleReload }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [cropState, setCropState] = useState<File | null>(null);

    const handleSubmit = async (values: SingleColorFormValues) => {
        try {
            setIsLoading(true);
            const formData = new FormData();

            formData.append("itemId", String(item.id));
            formData.append("name", values.name);
            formData.append("hexCode", values.hexCode);

            if (values.file) {
                formData.append("colorImage", values.file);
            }

            const res = await addColors(formData);
            if (res.success) {
                toast.success(res.message);
                handleReload();
                onClose();
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            toast.error("Process execution error configuring colors schema mappings.");
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-2 bg-white/10 border border-black/10 rounded-lg focus:outline-none focus:border-black transition-all duration-300 placeholder:text-gray-500";

    return (
        <CommonModal isOpen={isOpen} onClose={onClose} title={`Add color to: ${item.name}`} maxWidth="max-w-md">
            <Formik
                initialValues={colorInitialValues}
                validationSchema={colorValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }: FormikProps<SingleColorFormValues>) => (
                    <Form className="px-4 space-y-4">
                        <div className="space-y-3">
                            {/* Color Name Input */}
                            <label className="block">
                                <span className="text-xs font-medium tracking-wider">Color Name</span>
                                <Field name="name" placeholder="e.g. Alpine Blue" className={inputClass} />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-[10px]" />
                            </label>

                            {/* Hex Code Picker & Text Input */}
                            <label className="block">
                                <span className="text-xs font-medium tracking-wider">Color Specifier (Hex)</span>
                                <div className="flex gap-2 items-center">
                                    <Field type="color" name="hexCode" className="w-8 h-8 rounded border cursor-pointer align-middle" />
                                    <Field name="hexCode" placeholder="#FFFFFF" className={inputClass} />
                                </div>
                                <ErrorMessage name="hexCode" component="div" className="text-red-500 text-[10px]" />
                            </label>

                            {/* File Upload Input */}
                            <div className="flex flex-col min-w-[120px] mt-1">
                                <span className="text-xs font-medium tracking-wider">Variant Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-xs text-gray-900 file:mr-4 file:py-1 file:px-3
                                               file:rounded-md file:border file:text-xs file:font-semibold
                                               file:bg-gray-50 hover:file:bg-gray-100 file:border-gray-200
                                               cursor-pointer"
                                    onChange={(e) => {
                                        const targetFile = e.target.files?.[0];
                                        if (targetFile) {
                                            if (targetFile.size > MAX_SIZE_MB) {
                                                toast.error("Image asset larger than maximum size limits.");
                                                return;
                                            }
                                            setCropState(targetFile);
                                        }
                                    }}
                                />
                                <ErrorMessage name="file" component="div" className="text-red-500 text-[10px] mt-1" />

                                {/* Render Selected Image Preview */}
                                {values.previewUrl && (
                                    <div className="relative w-20 h-20 mt-3 border rounded overflow-hidden shadow-sm">
                                        <Image src={values.previewUrl} fill className="object-cover" alt="Cropped Preview" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cropper Modal Trigger */}
                        {cropState && (
                            <CropModal
                                imageFile={cropState}
                                cropWidth={500}
                                cropHeight={500}
                                onClose={() => setCropState(null)}
                                onCropComplete={(croppedFile) => {
                                    setFieldValue("file", croppedFile);
                                    setFieldValue("previewUrl", URL.createObjectURL(croppedFile));
                                    setCropState(null);
                                }}
                            />
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 my-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isLoading}
                                className="w-full bg-gray-300 p-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="w-full bg-primary text-white p-2 rounded flex justify-center items-center gap-2"
                            >
                                {isLoading ? <BiLoader className="animate-spin" /> : "Add Color Variant"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CommonModal>
    );
};

export default AddColorsModal;