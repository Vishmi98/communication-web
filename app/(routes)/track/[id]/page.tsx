"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    BsArrowLeft,
    BsChatDots,
    BsPhone
} from "react-icons/bs";
import {
    IoCheckmarkDoneOutline,
    IoBicycleOutline,
    IoTimeOutline
} from "react-icons/io5";
import Image from "next/image";
import { useParams } from "next/navigation";

import { getOrderById } from "@/modules/cart/cart.service";
import { OrderDataType } from "@/modules/cart/cart.types";


const TrackOrderPage = () => {
    const [order, setOrder] = useState<OrderDataType | null>(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const orderId = Number(params.id);

    const fetchOrder = async () => {
        try {
            setLoading(true);

            const response = await getOrderById({ id: orderId });

            if (response.success) {
                setOrder(response.order);
            } else {
                setOrder(null);
            }
        } catch (error) {
            console.error("Failed to fetch order:", error);
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const startPolling = async () => {
            await fetchOrder();
        };

        startPolling();

        interval = setInterval(async () => {
            const response = await getOrderById({ id: orderId });

            if (response.success) {
                setOrder(response.order);

                // 🚀 STOP POLLING WHEN DELIVERED
                if (response.order.status === "Delivered") {
                    clearInterval(interval);
                }
            }
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const getSteps = (status: string) => {
        const currentStep = [
            "Pending",
            "Accepted",
            "Out for Delivery",
            "Delivered"
        ].indexOf(status);

        return [
            {
                id: 1,
                title: "Order Received",
                desc: "We received your order",
                icon: <IoCheckmarkDoneOutline />,
                state:
                    currentStep >= 0 ? "complete" : "upcoming"
            },
            {
                id: 2,
                title: "On The Way",
                desc: "Driver heading to you",
                icon: <IoBicycleOutline />,
                state:
                    currentStep === 2
                        ? "current"
                        : currentStep > 2
                            ? "complete"
                            : "upcoming"
            },
            {
                id: 3,
                title: "Delivered",
                desc: "Enjoy your food",
                icon: <IoCheckmarkDoneOutline />,
                state:
                    currentStep === 3
                        ? "complete"
                        : "upcoming"
            }
        ];
    };

    if (loading) {
        return (
            <main className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10 mt-5 md:mt-0">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 animate-pulse">

                    {/* Header Skeleton */}
                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">

                        <div className="space-y-4">
                            <div className="h-4 w-32 bg-black/5 rounded"></div>
                            <div className="h-8 w-64 bg-black/5 rounded"></div>
                            <div className="h-4 w-40 bg-black/5 rounded"></div>
                        </div>

                        <div className="h-20 w-48 bg-black/5 rounded-2xl"></div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* Left Skeleton */}
                        <div className="space-y-6">

                            {/* Timeline skeleton */}
                            <div className="bg-black/5 border border-gray-300 p-6 rounded-3xl space-y-8">

                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 bg-black/5 rounded-xl"></div>

                                        <div className="space-y-2 flex-1">
                                            <div className="h-4 w-40 bg-black/5 rounded"></div>
                                            <div className="h-3 w-60 bg-black/5 rounded"></div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* Contact skeleton */}
                            <div className="bg-black/5 border border-gray-300 p-5 rounded-3xl flex justify-between items-center">
                                <div className="space-y-2">
                                    <div className="h-3 w-24 bg-black/5 rounded"></div>
                                    <div className="h-4 w-32 bg-black/5 rounded"></div>
                                </div>

                                <div className="flex gap-2">
                                    <div className="w-10 h-10 bg-black/5 rounded-full"></div>
                                    <div className="w-10 h-10 bg-black/5 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Skeleton */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Items */}
                            <div className="bg-black/5 border border-gray-300 p-6 rounded-3xl space-y-4">

                                <div className="h-6 w-40 bg-black/5 rounded"></div>

                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between border-b border-black/10 pb-4"
                                    >
                                        <div className="space-y-2">
                                            <div className="h-4 w-40 bg-black/5 rounded"></div>
                                            <div className="h-3 w-20 bg-black/5 rounded"></div>
                                        </div>

                                        <div className="h-4 w-16 bg-black/5 rounded"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="bg-black/5 border border-gray-300 p-6 rounded-3xl space-y-4">

                                <div className="h-6 w-32 bg-black/5 rounded"></div>

                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex justify-between">
                                        <div className="h-4 w-24 bg-black/5 rounded"></div>
                                        <div className="h-4 w-20 bg-black/5 rounded"></div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10 mt-5 md:mt-0">
                Order Not Found
            </main>
        );
    }

    const steps = getSteps(order.status);

    return (
        <main className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10 mt-5 md:mt-0">
            <div>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <Link href="/menu" className="flex items-center gap-2 text-muted hover:text-primary transition-colors mb-4">
                            <BsArrowLeft /> <span>Back to Menu</span>
                        </Link>

                        <h1 className="text-2xl md:text-3xl font-libre font-bold">
                            Track Order{" "}
                            <span className="text-primary">
                                #{order.id}
                            </span>
                        </h1>

                        <p className="text-muted mt-2">
                            {order.customer.name}
                        </p>
                    </div>

                    <div className="bg-black/5 border border-gray-300 px-6 py-4 rounded-2xl">
                        <p className="text-sm text-muted mb-1">
                            Estimated Arrival
                        </p>
                        <div className="flex items-center gap-2 text-black font-bold text-xl">
                            <IoTimeOutline />
                            {new Date(
                                order.estimatedDeliveryTime
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left */}
                    <div className="space-y-6">

                        {/* Timeline */}
                        <div className="bg-black/5 border border-gray-300 p-6 rounded-3xl">
                            <div className="space-y-12">

                                {steps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className="flex gap-4 relative"
                                    >
                                        {index !==
                                            steps.length - 1 && (
                                                <div
                                                    className={`absolute left-5 top-12 w-0.5 h-10 ${step.state === "complete"
                                                        ? "bg-primary"
                                                        : "bg-black/5"
                                                        }`}
                                                />
                                            )}

                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${step.state ===
                                                "complete"
                                                ? "bg-primary text-white"
                                                : step.state ===
                                                    "current"
                                                    ? "bg-primary/20 text-primary border border-primary animate-pulse"
                                                    : "bg-black/5 text-zinc-500"
                                                }`}
                                        >
                                            {step.icon}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-muted">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Card */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            className="bg-primary/10 border border-primary/20 p-5 rounded-3xl flex items-center justify-between"
                        >
                            <p className="text-sm text-primary">
                                Need Help?
                            </p>

                            <div className="flex gap-3">
                                <button className="w-11 h-11 rounded-full bg-black/5 hover:bg-primary flex items-center justify-center transition">
                                    <BsChatDots />
                                </button>

                                <button className="w-11 h-11 rounded-full bg-black/5 hover:bg-primary flex items-center justify-center transition">
                                    <BsPhone />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Order Items */}
                        <div className="bg-black/5 border border-gray-300 p-6 rounded-3xl">
                            <h2 className="text-xl font-bold mb-5">
                                Order Items
                            </h2>

                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between border-b border-black/10 pb-4"
                                    >
                                        <div className="flex gap-5">
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                <Image
                                                    src={item.mainImagePath}
                                                    alt="Product"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">
                                                    {item.name}
                                                </h3>

                                                <p className="text-sm text-muted">
                                                    Qty: {item.quantity}
                                                </p>
                                                {item.color && (
                                                    <p className="text-sm text-gray-500">
                                                        Color: {item.color}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <p className="font-semibold">
                                            $
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-black/5 border border-gray-300 p-6 rounded-3xl">
                            <h2 className="text-xl font-bold mb-5">
                                Summary
                            </h2>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Status</span>
                                    <span className="text-primary">
                                        {order.status}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Payment</span>
                                    <span>
                                        {order.paymentMethod}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Address</span>
                                    <span className="text-right max-w-xs">
                                        {order.customer.address}
                                    </span>
                                </div>

                                <div className="flex justify-between font-bold pt-4 border-t border-black/10">
                                    <span>Total</span>
                                    <span className="font-bold">
                                        $
                                        {order.totalAmount.toFixed(
                                            2
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default TrackOrderPage;