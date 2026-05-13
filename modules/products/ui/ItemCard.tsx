"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ItemDataType } from "@/modules/products/products.types";
import StarRating from "@/components/StarRatings";

interface Props {
    item: ItemDataType;
    onAdd: () => void
}

const slugify = (text?: string) =>
    text
        ?.toLowerCase()
        .trim()
        .replace(/\s+/g, "-") || "";

const ItemCard = ({ item, onAdd }: Props) => {
    const itemSlug = slugify(item.name);

    const discountPercentage =
        item.newPrice > 0
            ? Math.round(
                ((item.price - item.newPrice) /
                    item.price) *
                100
            )
            : 0;

    return (
        <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
            {/* IMAGE */}
            <div className="relative h-60 overflow-hidden">
                <Image
                    src={
                        item.mainImagePath ||
                        "/placeholder.jpg"
                    }
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <button onClick={onAdd} className="bg-primary text-white px-5 py-2 text-sm font-medium rounded-md hover:bg-primary/90 transition-all duration-300">
                        Add to Cart
                    </button>
                </div>
                {/* DISCOUNT BADGE */}
                {item.newPrice > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                        -{discountPercentage}%
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-4">
                {/* NAME */}
                <Link href={`/item/${itemSlug}`} className="font-semibold text-lg line-clamp-2">
                    {item.name}
                </Link>

                {/* RATING */}
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-yellow-500">
                        <StarRating rating={item.rating} />
                    </div>

                    <span className="text-sm text-gray-400">
                        ({item.reviews})
                    </span>
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-3 mt-1">
                    {item.newPrice > 0 ? (
                        <>
                            <p className="text-xl font-bold text-secondary">
                                Rs. {item.newPrice}
                            </p>

                            <p className="text-sm text-gray-400 line-through">
                                Rs. {item.price}
                            </p>
                        </>
                    ) : (
                        <p className="text-xl font-bold text-secondary">
                            Rs. {item.price}
                        </p>
                    )}
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                <button
                    type="button"
                    onClick={onAdd}
                    className="
                bg-primary text-white px-3 py-2 rounded-full text-sm md:text-base
                cursor-pointer font-medium w-2/3 z-10 block md:hidden mt-3 w-full"
                >
                    Add to Cart
                </button>
            </div>

        </div>
    );
};

export default ItemCard;