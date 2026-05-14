"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";

import { OrderDataType } from "@/modules/cart/cart.types";


type Props = {
    order: OrderDataType;
};

const OrderCard = ({ order }: Props) => {
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

                    {/* <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
              ${order.isPaid
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                    >
                        {order.isPaid ? "Paid" : "Cash on Delivery"}
                    </span> */}
                    <Link href={`/track/${order.id}`} className="text-gray-500 hover:text-black transition">
                        <BsEye size={20} />
                    </Link>
                </div>
            </div>

            {/* Items */}
            <div className="mt-2 space-y-4">
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
            <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
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