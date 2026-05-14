"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import useCartStore from "@/store/cartStore";

import { getCookieUser } from "@/utils/cookie.util";
import { createOrder } from "@/modules/cart/cart.service";

import { OrderType } from "@/modules/cart/cart.types";
import { BsArrowLeft } from "react-icons/bs";


const CheckoutPage = () => {

    const { cart, clearCart } = useCartStore();

    const user = getCookieUser();

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    // Form State
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        note: "",
        payment: "Cash",
    });

    // Calculations
    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const shipping = cart.length > 0 ? 255 : 0;

    const total = subtotal + shipping;

    // Handle Inputs
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Place Order
    const handlePlaceOrder = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (loading) return;

        const userId = user && user.id ? Number(user.id) : 0;

        // User Validation
        if (!userId) {
            toast.error("Please login first");
            return;
        }

        // Cart Validation
        if (cart.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        // Form Validation
        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.phone.trim() ||
            !form.address.trim()
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        setLoading(true);

        try {

            // Build Order Items
            const orderItems = cart.map((item) => ({
                id: Number(item.id),
                quantity: item.quantity,
                name: item.title,
                color: "",
                mainImagePath: item.image || "",
                price: item.price,
            }));

            // Request Body
            const body: OrderType = {
                customer: {
                    id: Number(userId),
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    address: form.address,
                },

                items: orderItems,

                paymentMethod: form.payment,

                note: form.note,
                totalAmount: total,
                deliveryFee: shipping,
            };

            // Create Order API
            const response = await createOrder(body);

            if (!response.success) {

                toast.error(
                    response.message ||
                    "Failed to place order"
                );

                return;
            }

            // Success
            toast.success(
                "Order placed successfully"
            );

            // Clear Cart
            clearCart();

            // Redirect
            router.push(
                `/success?orderId=${response.order.id}`
            );

        } catch (error) {

            console.error("ORDER_ERROR:", error);

            toast.error(
                "Something went wrong"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10">

            <div className="mb-1">
                <Link
                    href="/cart"
                    className="flex items-center gap-2 text-zinc-400 hover:text-primary mb-4"
                >
                    <BsArrowLeft />
                    Back to Cart
                </Link>
            </div>

            <h1 className="text-xl md:text-2xl font-bold mb-8">
                Checkout
            </h1>

            {cart.length === 0 ? (
                <div className="h-[60vh] flex flex-col items-center justify-center text-center">

                    <FiShoppingBag
                        size={40}
                        className="text-gray-400 mb-4"
                    />

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

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Billing Details */}
                        <div className="border border-gray-200 rounded-xl p-5 bg-white">

                            <h2 className="text-lg font-semibold mb-4">
                                Billing Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="border border-gray-300 px-4 py-3 md:col-span-2 rounded-lg w-full outline-none focus:border-primary"
                                />

                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="border border-gray-300 px-4 py-3 rounded-lg w-full outline-none focus:border-primary"
                                />

                                <input
                                    required
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="border border-gray-300 px-4 py-3 rounded-lg w-full outline-none focus:border-primary"
                                />

                                <input
                                    required
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Full Address"
                                    className="border border-gray-300 px-4 py-3 rounded-lg w-full md:col-span-2 resize-none outline-none focus:border-primary"
                                />

                                <textarea
                                    name="note"
                                    value={form.note}
                                    onChange={handleChange}
                                    placeholder="Additional Note (Optional)"
                                    rows={3}
                                    className="border border-gray-300 px-4 py-3 rounded-lg w-full md:col-span-2 resize-none outline-none focus:border-primary"
                                />

                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="border border-gray-200 rounded-xl p-5 bg-white">

                            <h2 className="text-lg font-semibold mb-4">
                                Payment Method
                            </h2>

                            <div className="flex flex-col gap-4">

                                <label className="flex items-center gap-3 cursor-pointer">

                                    <input
                                        type="radio"
                                        name="payment"
                                        value="Cash"
                                        checked={
                                            form.payment === "Cash"
                                        }
                                        onChange={handleChange}
                                    />

                                    <span>
                                        Cash on Delivery
                                    </span>

                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">

                                    <input
                                        type="radio"
                                        name="payment"
                                        value="Card"
                                        checked={
                                            form.payment === "Card"
                                        }
                                        onChange={handleChange}
                                    />

                                    <span>
                                        Card Payment
                                    </span>

                                </label>

                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="border border-gray-200 rounded-xl p-5 bg-white">

                            <h2 className="text-lg font-semibold mb-5">
                                Order Items
                            </h2>

                            <div className="space-y-4">

                                {cart.map((item) => (

                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 border-b pb-4"
                                    >

                                        {/* Image */}
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border">

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

                                        {/* Content */}
                                        <div className="flex-1">

                                            <h3 className="font-medium text-gray-800">
                                                {item.title}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Quantity:
                                                {" "}
                                                {item.quantity}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                LKR
                                                {" "}
                                                {item.price.toLocaleString(
                                                    "en-US"
                                                )}
                                            </p>
                                            {item.color && (
                                                <p className="text-sm text-gray-500">
                                                    Color: {item.color}
                                                </p>
                                            )}
                                        </div>

                                        {/* Total */}
                                        <div className="font-semibold text-primary">

                                            LKR
                                            {" "}
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toLocaleString("en-US")}

                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 h-fit sticky top-24">

                        <h2 className="text-xl font-semibold mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between text-sm text-gray-600">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    LKR
                                    {" "}
                                    {subtotal.toLocaleString(
                                        "en-US"
                                    )}
                                </span>

                            </div>

                            <div className="flex justify-between text-sm text-gray-600">

                                <span>
                                    Shipping
                                </span>

                                <span>
                                    LKR
                                    {" "}
                                    {shipping.toLocaleString(
                                        "en-US"
                                    )}
                                </span>

                            </div>

                            <div className="border-t pt-4 flex justify-between items-center">

                                <span className="font-semibold text-lg">
                                    Total
                                </span>

                                <span className="text-primary font-bold text-2xl">

                                    LKR
                                    {" "}
                                    {total.toLocaleString(
                                        "en-US"
                                    )}

                                </span>

                            </div>

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-full flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                        >

                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Confirm & Place Order"
                            )}

                        </button>

                    </div>

                </form>
            )}
        </div>
    );
};

export default CheckoutPage;