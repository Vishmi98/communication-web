import React from "react";
import Image from "next/image";
import Link from "next/link";

import { MENUITEMS } from "@/constants/data";


interface Props {
    params: Promise<{
        category: string;
        mainCategory: string;
    }>;
}

const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-");

const CategoryMainPage = async ({ params }: Props) => {
    const { category, mainCategory } = await params;

    const cleanCategory = decodeURIComponent(category);
    const cleanMain = decodeURIComponent(mainCategory);

    const selectedCategory = MENUITEMS.find(
        (item) => slugify(item.name) === slugify(cleanCategory)
    );

    const selectedSection = selectedCategory?.subMenu.sections.find(
        (section) => slugify(section.heading) === slugify(cleanMain)
    );

    return (
        <div className="min-h-screen w-[95%] mx-auto py-10">
            <p className="text-sm text-gray-500 mb-4">
                Home / {selectedCategory?.name} / {selectedSection?.heading}
            </p>

            {/* Heading */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold capitalize">
                    {selectedSection?.heading}
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedSection?.items.map((item) => {
                    const subSlug = slugify(item.name);

                    return (
                        <Link
                            key={item.name}
                            href={`/category/${slugify(cleanCategory)}/${slugify(cleanMain)}/${subSlug}`}
                            className="relative h-56 rounded-2xl overflow-hidden shadow-lg group"
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-500"
                            />

                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

                            <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                                <h2 className="text-xl font-bold">
                                    {item.name}
                                </h2>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryMainPage;