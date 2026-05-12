import React from "react";
import Image from "next/image";

import { BEST_SELLERS, MENUITEMS } from "@/constants/data";
import RelatedProducts from "@/modules/products/ui/RelatedProducts";


interface Props {
    params: Promise<{
        category: string;
        mainCategory: string;
        subCategory: string;
    }>;
}

const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-");

const SubCategoryPage = async ({ params }: Props) => {
    const { category, mainCategory, subCategory } = await params;

    const cleanCategory = decodeURIComponent(category);
    const cleanMain = decodeURIComponent(mainCategory);
    const cleanSub = decodeURIComponent(subCategory);

    const selectedCategory = MENUITEMS.find(
        (item) => slugify(item.name) === slugify(cleanCategory)
    );

    const selectedSection = selectedCategory?.subMenu.sections.find(
        (section) => slugify(section.heading) === slugify(cleanMain)
    );

    const selectedItem = selectedSection?.items.find(
        (item) => slugify(item.name) === slugify(cleanSub)
    );

    const handleAddToCart = (id: number) => {
        console.log("Add to cart:", id);
    };

    return (
        <div className="min-h-screen w-[95%] mx-auto py-10">

            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-4">
                Home / {selectedCategory?.name} / {selectedSection?.heading} / {selectedItem?.name}
            </p>

            {/* Heading */}
            <h1 className="text-3xl font-bold mb-8">
                {selectedItem?.name}
            </h1>

            <RelatedProducts />
        </div>
    );
};

export default SubCategoryPage;