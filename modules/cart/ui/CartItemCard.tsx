"use client";

import React from "react";
import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

import { CartItemDataType } from "../cart.types";
import { FaStar } from "react-icons/fa6";


interface Props {
    item: CartItemDataType;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

const CartItemCard = ({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}: Props) => {
    return (
        <div className="rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-5">
            {/* Image */}
            <div className="relative h-[120px] w-full sm:w-[140px] overflow-hidden rounded-xl bg-gray-100">
                <Image
                    src={item.image || "/images/placeholder.png"}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="">
                        {item.title}
                    </h3>

                    <div className="flex items-center gap-10">
                        <p className="text-primary font-bold text-lg mt-1">
                            LKR {item.price.toLocaleString("en-US")}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                            <FaStar size={12} className="text-yellow-400" />
                            <span className="text-sm text-gray-400">
                                {item.rate}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                        <button
                            onClick={onDecrease}
                            className="px-3 py-2 hover:bg-gray-100 transition-all"
                        >
                            <FiMinus />
                        </button>

                        <span className="px-4 text-sm font-medium">
                            {item.quantity}
                        </span>

                        <button
                            onClick={onIncrease}
                            className="px-3 py-2 hover:bg-gray-100 transition-all"
                        >
                            <FiPlus />
                        </button>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={onRemove}
                        className="text-red-500 hover:text-red-600 transition-all"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItemCard;