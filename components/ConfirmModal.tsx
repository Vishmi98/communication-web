"use client"

import { useState } from "react";
import { BiLoader } from "react-icons/bi";

import CommonModal from "./CommonModal";

import { ConfirmModalProps } from "@/constants/types";


export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            setIsLoading(true);
            await onConfirm();
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <CommonModal isOpen={isOpen} onClose={onClose} title="Confirmation" maxWidth="max-w-md">
            <div className="px-4 pb-4 space-y-5">
                <p className="text-sm">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-full bg-gray-300 p-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className="w-full bg-primary text-white p-2 rounded flex justify-center items-center gap-2"
                    >
                        {isLoading ? <BiLoader className="animate-spin" /> : "Confirm"}
                    </button>
                </div>
            </div>
        </CommonModal>
    );
};
