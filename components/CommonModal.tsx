"use client";

import React, { FC, ReactNode } from "react";
import { CgClose } from "react-icons/cg";

type CommonModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    maxWidth?: string;
};

const CommonModal: FC<CommonModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = "max-w-xl",
}) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-lg w-full ${maxWidth} max-h-[90vh] overflow-hidden flex flex-col mx-3`}
            >
                {/* Header */}
                <div className="flex justify-between items-start gap-5 m-4 pb-2 border-b border-b-gray-400">
                    <h2 className="font-semibold w-[90%]">{title}</h2>

                    <CgClose
                        className="w-4 h-4 cursor-pointer"
                        onClick={onClose}
                    />
                </div>

                {/* Body */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default CommonModal;