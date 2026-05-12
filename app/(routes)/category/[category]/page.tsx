import React from "react";
import Image from "next/image";
import Link from "next/link";

import { MENUITEMS } from "@/constants/data";

interface Props {
    params: Promise<{
        category: string;
    }>;
}

const CategoryPage = async ({ params }: Props) => {
    const { category } = await params;

    const formattedCategory = decodeURIComponent(category).replace(/-/g, " ");

    const selectedCategory = MENUITEMS.find(
        (item) =>
            item.name.toLowerCase() === formattedCategory.toLowerCase()
    );

    return (
        <div className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10">

            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-4">
                Home / {formattedCategory}
            </p>

            {/* Heading */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold capitalize">
                    {formattedCategory}
                </h1>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {selectedCategory?.subMenu.sections.map((section) => {
                    const coverImage = section.image;

                    return (
                        <div
                            key={section.heading}
                            className="relative h-56 rounded-2xl overflow-hidden shadow-lg group"
                        >

                            {/* Background Image */}
                            {coverImage && (
                                <Image
                                    src={coverImage}
                                    alt={section.heading}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                />
                            )}

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

                            {/* Content */}
                            <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                                <h2 className="text-xl font-bold">
                                    {section.heading}
                                </h2>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {section.items.slice(0, 3).map((item) => (
                                        <Link
                                            key={item.name}
                                            href={`/category/${category}/${item.name
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}`}
                                            className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryPage;