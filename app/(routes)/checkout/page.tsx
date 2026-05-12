"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import useCartStore from "@/store/cartStore";
import CommonButton from "@/components/CommonButton";


const CheckoutPage = () => {
    const { cart, clearCart } = useCartStore();

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // form state
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        payment: "cod",
    });

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const shipping = cart.length * 255;
    const total = subtotal + shipping;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault(); // 🔥 THIS IS REQUIRED

        if (loading) return;

        setLoading(true);

        try {
            toast.success("Order placed!");
            clearCart();
            router.push("/success");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10">
            <h1 className="text-xl md:text-2xl font-bold mb-8">
                Checkout
            </h1>

            {cart.length === 0 ? (
                <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                    <FiShoppingBag size={40} className="text-gray-400 mb-4" />

                    <h2 className="text-lg font-semibold text-gray-600">
                        No items to checkout
                    </h2>

                    <Link
                        href="/"
                        className="bg-primary px-4 py-2 mt-6 rounded-lg text-white hover:bg-primary/90 transition-all"
                    >
                        Go Shopping
                    </Link>
                </div>
            ) : (
                <form
                    onSubmit={handlePlaceOrder}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Billing */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white">
                            <h2 className="text-lg font-semibold mb-4">
                                Billing Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    required
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="border px-3 py-2 rounded-md w-full"
                                />
                                <input
                                    required
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="border px-3 py-2 rounded-md w-full"
                                />
                                <input
                                    required
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="border px-3 py-2 rounded-md w-full"
                                />
                                <input
                                    required
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    className="border px-3 py-2 rounded-md w-full"
                                />
                                <input
                                    required
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Address"
                                    className="border px-3 py-2 rounded-md w-full md:col-span-2"
                                />
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white">
                            <h2 className="text-lg font-semibold mb-4">
                                Payment Method
                            </h2>

                            <div className="flex flex-col gap-3 text-sm">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={form.payment === "cod"}
                                        onChange={handleChange}
                                    />
                                    Cash on Delivery
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        onChange={handleChange}
                                    />
                                    Card Payment
                                </label>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white">
                            <h2 className="text-lg font-semibold mb-4">
                                Order Items
                            </h2>

                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                            <Image
                                                src={
                                                    item.image ||
                                                    "/images/placeholder.png"
                                                }
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p>{item.title}</p>
                                            <p className="text-sm text-gray-500">
                                                {item.quantity} × LKR{" "}
                                                {item.price.toLocaleString("en-US")}
                                            </p>
                                        </div>

                                        <p className="font-semibold text-primary">
                                            LKR{" "}
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toLocaleString("en-US")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 h-fit sticky top-24">
                        <h2 className="text-xl font-semibold mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-5">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Subtotal</span>
                                <span>
                                    LKR {subtotal.toLocaleString("en-US")}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Shipping</span>
                                <span>
                                    LKR {shipping.toLocaleString("en-US")}
                                </span>
                            </div>

                            <div className="border-t pt-4 flex justify-between">
                                <span className="font-semibold">
                                    Total
                                </span>
                                <span className="text-primary font-bold text-xl">
                                    LKR {total.toLocaleString("en-US")}
                                </span>
                            </div>
                        </div>

                        <CommonButton type="submit" title={loading ? "Processing..." : "Place Order"} onPress={() => handlePlaceOrder} />
                    </div>
                </form>
            )}
        </div>
    );
};

export default CheckoutPage;