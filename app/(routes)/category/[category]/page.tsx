"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
    CategoryDataType,
    MainCategoryDataType,
} from "@/modules/products/products.types";

import {
    getCategories,
    getMainCategories,
} from "@/modules/products/products.service";


const CategoryPage = () => {
    const params = useParams();
    const slug = params?.category as string;

    const formattedCategory = decodeURIComponent(slug || "")
        .replace(/-/g, " ")
        .toLowerCase();

    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [mainCategories, setMainCategories] = useState<
        MainCategoryDataType[]
    >([]);
    const [loading, setLoading] = useState(true);

    // 1️⃣ FETCH ALL CATEGORIES
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await getCategories();

                if (!res.success) return;

                setCategories(res.categories);

                // 2️⃣ FIND CATEGORY ID FROM SLUG
                const matchedCategory = res.categories.find((cat) =>
                    cat.name.toLowerCase() === formattedCategory
                );

                if (!matchedCategory) return;

                // 3️⃣ FETCH MAIN CATEGORIES
                const mainRes = await getMainCategories(
                    matchedCategory.id
                );

                if (mainRes.success) {
                    setMainCategories(mainRes.mainCategories);
                }
            } catch (error) {
                console.error("CategoryPage error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [formattedCategory]);

    if (loading) {
        return (
            <div className="w-[95%] mx-auto py-10">
                <div className="animate-pulse">
                    <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-56 bg-gray-200 rounded-2xl"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const selectedCategory = categories.find(
        (cat) => cat.name.toLowerCase() === formattedCategory
    );

    return (
        <div className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10 mt-5 md:mt-0">

            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-4 capitalize">
                Home / {selectedCategory?.name || formattedCategory}
            </p>

            {/* Heading */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold capitalize">
                    {selectedCategory?.name || formattedCategory}
                </h1>
            </div>

            {/* MAIN CATEGORY GRID */}
            {mainCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">
                        No categories available
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        There are no items in this category yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mainCategories.map((main) => {
                        const mainSlug = main.name
                            .toLowerCase()
                            .replace(/\s+/g, "-");

                        return (
                            <Link
                                key={main.id}
                                href={`/category/${slug}/${mainSlug}`}
                                className="relative h-56 rounded-2xl overflow-hidden shadow-lg group bg-white"
                            >
                                <Image
                                    src={main.imagePath || "/placeholder.jpg"}
                                    alt={main.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                />

                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />

                                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                                    <h2 className="text-xl font-bold">
                                        {main.name}
                                    </h2>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;