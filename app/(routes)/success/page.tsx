"use client";

import React from "react";
import Link from "next/link";
import { FiCheckCircle, FiHome, FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";

import CommonButton from "@/components/CommonButton";


const SuccessPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen border-t-2 border-primary w-[95%] mx-auto flex items-center justify-center py-10">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-md w-full text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <FiCheckCircle size={50} className="text-green-500" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Order Placed Successfully!
                </h1>

                <p className="text-gray-500 mt-3 text-sm md:text-base">
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>

                {/* Order Info Box */}
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
                    <p>Your order will be delivered soon.</p>
                    <p className="mt-1">You will receive an email confirmation shortly.</p>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex flex-col gap-3">

                    <CommonButton
                        title="Back to Home"
                        onPress={() => router.push("/")}
                        className="flex items-center justify-center gap-2"
                        textClassName="flex items-center gap-2"
                    />

                    <CommonButton
                        title="View Orders"
                        backgroundColor="bg-white"
                        textColor="text-gray-800"
                        className="border border-gray-300 hover:bg-white/90 flex items-center justify-center gap-2"
                        onPress={() => router.push("/profile")}
                        textClassName="flex items-center gap-2"
                    />
                </div>

                {/* Small note */}
                <p className="text-xs text-gray-400 mt-6">
                    Need help? Contact support anytime.
                </p>
            </div>
        </div>
    );
};

export default SuccessPage;