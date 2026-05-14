"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { BsX } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";

import useCartStore from "@/store/cartStore";
import CartItemCard from "@/modules/cart/ui/CartItemCard";
import CommonButton from "@/components/CommonButton";
import { getCookieUser } from "@/utils/cookie.util";
import { getEffectivePrice } from "@/constants/utils";


const CartPage = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const user = getCookieUser()

    const subtotal = cart.reduce(
        (total, item) =>
            total + getEffectivePrice(item) * item.quantity,
        0
    );

    const shipping = cart.length * 255;

    const total = subtotal + shipping;

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        if (!user) {
            setOpenLoginModal(true);
            return;
        }

        setIsLoading(true);

        try {
            // Simulate processing
            await new Promise((resolve) => setTimeout(resolve, 800));
            router.push("/checkout");
        } catch (error) {
            console.error("Checkout failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10 mt-5 md:mt-0">
                {/* Heading */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">
                            Shopping Cart
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {cart.length} items in your cart
                        </p>
                    </div>

                    {cart.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="flex cursor-pointer items-center justify-center text-sm gap-2 border border-red-200 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
                        >
                            <FiTrash2 />
                            Clear Cart
                        </button>
                    )}
                </div>

                {cart.length === 0 ? (
                    <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                        <div className="bg-white shadow-md rounded-full p-5 mb-5">
                            <FiShoppingBag size={30} className="text-gray-400" />
                        </div>

                        <h2 className="md:text-lg font-semibold text-gray-600">
                            Your cart is empty
                        </h2>

                        <Link
                            href="/"
                            className="bg-primary px-4 py-2 mt-6 rounded-lg text-white hover:bg-primary/90 transition-all"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 flex flex-col gap-5">
                            {cart.map((item) => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onIncrease={() => addToCart(item)}
                                    onDecrease={() =>
                                        removeFromCart(item.id)
                                    }
                                    onRemove={() =>
                                        removeFromCart(item.id)
                                    }
                                />
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 h-fit sticky top-24">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-5">
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span>LKR {subtotal.toLocaleString("en-US")}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>Shipping</span>
                                    <span>LKR {shipping.toLocaleString("en-US")}</span>
                                </div>

                                <div className="border-t pt-4 flex items-center justify-between">
                                    <span className="text-lg font-semibold text-gray-800">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold text-primary">
                                        LKR {total.toLocaleString("en-US")}
                                    </span>
                                </div>
                            </div>

                            <CommonButton title="Proceed to Checkout" onPress={handleCheckout} />
                        </div>
                    </div>
                )}
            </div>
            {/* LOGIN MODAL */}
            <AnimatePresence>
                {openLoginModal && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="fixed inset-0 z-[9999] backdrop-blur-xs bg-black/30 flex items-center justify-center px-4"
                    >
                        <motion.div
                            initial={{
                                scale: 0.8,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            exit={{
                                scale: 0.8,
                                opacity: 0,
                            }}
                            className="w-full max-w-md bg-white border border-white/30 rounded-3xl p-8 relative"
                        >
                            <button
                                onClick={() =>
                                    setOpenLoginModal(
                                        false
                                    )
                                }
                                className="absolute top-4 right-4 text-muted hover:text-white"
                            >
                                <BsX size={22} />
                            </button>

                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-5">
                                    <HiOutlineShoppingBag size={28} />
                                </div>

                                <h2 className="text-2xl font-bold mb-3">
                                    Login Required
                                </h2>

                                <p className="text-muted mb-8">
                                    Please login to continue
                                    your checkout.
                                </p>

                                <button
                                    onClick={() =>
                                        router.push(
                                            "/login"
                                        )
                                    }
                                    className="w-full bg-primary  cursor-pointer hover:bg-primary/90 text-white font-bold py-4 rounded-full transition-all"
                                >
                                    Login
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CartPage;