"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";
import { BiCopy, BiCheck } from "react-icons/bi"; // Added utility icons
import { toast } from "react-toastify";

import { OrderDataType } from "@/modules/cart/cart.types";

type Props = {
    order: OrderDataType;
};

const OrderCard = ({ order }: Props) => {
    const [copied, setCopied] = useState<boolean>(false);

    // Copy to Clipboard interaction logic
    const handleCopyTracking = async (trackingNum: string) => {
        try {
            await navigator.clipboard.writeText(trackingNum);
            setCopied(true);
            toast.success("Tracking number copied to clipboard!");

            // Revert icon layout state back after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            toast.error("Failed to copy tracking number.");
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg md:p-4 p-2 bg-white shadow-sm hover:shadow-md transition-all">
            {/* Top Section */}
            <div className="flex flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">
                        Order #{order.id}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-LK", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
              ${order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-primary/10 text-primary"
                            }`}
                    >
                        {order.status}
                    </span>
                    <Link href={`/track/${order.id}`} className="text-gray-500 hover:text-black transition">
                        <BsEye size={20} />
                    </Link>
                </div>
            </div>

            {/* Tracking Number Section (Renders only if tracking number is assigned) */}
            {order.trackingNumber && (
                <div className="mt-3 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Tracking ID:
                        </span>
                        <span className="text-sm font-mono font-bold text-gray-800">
                            {order.trackingNumber}
                        </span>
                    </div>
                    <button
                        onClick={() => handleCopyTracking(order.trackingNumber!)}
                        className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded border transition-all ${copied
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 active:scale-95"
                            }`}
                        title={copied ? "Copied!" : "Copy tracking number"}
                    >
                        {copied ? (
                            <>
                                <BiCheck className="h-4 w-4 text-green-600" />
                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <BiCopy className="h-3.5 w-3.5" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Items */}
            <div className="mt-4 space-y-4">
                {order.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-4 border border-gray-100 rounded-lg p-3"
                    >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                                src={item.mainImagePath}
                                alt="Product"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="font-semibold text-gray-800">
                                    {item.name}
                                </h4>

                                <p className="text-sm text-gray-500 mt-1">
                                    Quantity: {item.quantity}
                                </p>

                                {item.color && (
                                    <p className="text-sm text-gray-500">
                                        Color: {item.color}
                                    </p>
                                )}
                            </div>

                            <p className="font-bold text-lg">
                                Rs. {item.price.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-4 border-t border-gray-100 pt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-sm text-gray-500">
                        Payment Method:{" "}
                        <span className="font-medium text-gray-800">
                            {order.paymentMethod}
                        </span>
                    </p>

                    <p className="text-sm text-gray-500">
                        Delivery Fee:{" "}
                        <span className="font-medium text-gray-800">
                            Rs. {order.deliveryFee.toLocaleString()}
                        </span>
                    </p>
                </div>

                <div className="text-left md:text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>

                    <h2 className="text-2xl font-bold text-primary">
                        Rs. {order.totalAmount.toLocaleString()}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;