"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BsCartCheck } from "react-icons/bs";


interface CartToastProps {
    show: boolean;
    itemName: string;
    quantity?: number; // Added optional quantity prop
}

const CartToast = ({ show, itemName, quantity = 1 }: CartToastProps) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="fixed bottom-10 right-6 md:right-10 z-[2000] flex flex-col gap-2 items-end w-[90%] md:w-[40%]"
                >
                    <div className="bg-white border border-primary/30 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px]">
                        <div className="bg-primary/20 p-2 rounded-full text-primary">
                            <BsCartCheck size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm">Added to Cart!</p>
                            {/* Dynamic quantity display */}
                            <p className="text-xs text-zinc-400 line-clamp-2">
                                {quantity}x {itemName}
                            </p>
                        </div>
                        <Link
                            href="/cart"
                            className="text-[10px] bg-primary text-white px-3 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                        >
                            GO TO CART
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartToast;