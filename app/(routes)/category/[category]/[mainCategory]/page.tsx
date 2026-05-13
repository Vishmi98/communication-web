"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
    CategoryDataType,
    MainCategoryDataType,
    SubCategoryDataType,
} from "@/modules/products/products.types";

import {
    getCategories,
    getMainCategories,
    getSubCategories,
} from "@/modules/products/products.service";


const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-");

const CategoryMainPage = () => {
    const params = useParams();

    const categorySlug = params?.category as string;
    const mainSlug = params?.mainCategory as string;

    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [mainCategories, setMainCategories] = useState<
        MainCategoryDataType[]
    >([]);
    const [subCategories, setSubCategories] = useState<
        SubCategoryDataType[]
    >([]);

    const [loading, setLoading] = useState(true);

    const formattedCategory = decodeURIComponent(categorySlug || "")
        .replace(/-/g, " ")
        .toLowerCase();

    const formattedMain = decodeURIComponent(mainSlug || "")
        .replace(/-/g, " ")
        .toLowerCase();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // 1️⃣ GET ALL CATEGORIES
                const catRes = await getCategories();
                if (!catRes.success) return;

                setCategories(catRes.categories);

                // 2️⃣ FIND CATEGORY ID
                const matchedCategory = catRes.categories.find(
                    (c) =>
                        c.name.toLowerCase() === formattedCategory
                );

                if (!matchedCategory) return;

                // 3️⃣ GET MAIN CATEGORIES
                const mainRes = await getMainCategories(
                    matchedCategory.id
                );

                if (!mainRes.success) return;

                setMainCategories(mainRes.mainCategories);

                // 4️⃣ FIND MAIN CATEGORY ID
                const matchedMain = mainRes.mainCategories.find(
                    (m) =>
                        m.name.toLowerCase() === formattedMain
                );

                if (!matchedMain) return;

                // 5️⃣ GET SUB CATEGORIES (NEW API YOU GAVE)
                const subRes = await getSubCategories(
                    matchedCategory.id,
                    matchedMain.id
                );

                if (subRes.success) {
                    setSubCategories(subRes.subCategories);
                }
            } catch (error) {
                console.error("CategoryMainPage error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [formattedCategory, formattedMain]);

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

    return (
        <div className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10 mt-5 md:mt-0">

            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-4 capitalize">
                Home / {formattedCategory} / {formattedMain}
            </p>

            {/* Heading */}
            <h1 className="text-3xl font-bold mb-8 capitalize">
                {formattedMain}
            </h1>

            {/* SUB CATEGORY GRID */}
            {/* SUB CATEGORY GRID */}
            {subCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">
                        No sub categories found
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        There are no items under this section yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subCategories.map((sub) => {
                        const subSlug = slugify(sub.name);

                        return (
                            <Link
                                key={sub.id}
                                href={`/category/${categorySlug}/${mainSlug}/${subSlug}`}
                                className="relative h-56 rounded-2xl overflow-hidden shadow-lg group bg-white"
                            >
                                <Image
                                    src={sub.imagePath || "/placeholder.jpg"}
                                    alt={sub.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                />

                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />

                                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                                    <h2 className="text-xl font-bold">
                                        {sub.name}
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

export default CategoryMainPage;