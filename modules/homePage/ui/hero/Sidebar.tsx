"use client";

import React, { JSX, useEffect, useState } from "react";
import Link from "next/link";

import {
    MdDevices,
    MdHeadphones,
    MdMenuBook,
    MdOutlineLiveTv,
} from "react-icons/md";

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

const Sidebar = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [mainCategories, setMainCategories] = useState<
        MainCategoryDataType[]
    >([]);
    const [subCategories, setSubCategories] = useState<
        SubCategoryDataType[]
    >([]);

    // LOADING STATES
    const [categoriesLoading, setCategoriesLoading] =
        useState<boolean>(true);

    const [menuLoading, setMenuLoading] =
        useState<boolean>(false);

    const iconStyle = "text-secondary";
    const iconSize = 20;

    const slugify = (text: string) =>
        text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

    // CATEGORY ICONS
    const iconMap: Record<string, JSX.Element> = {
        electronicDevices: (
            <MdDevices
                className={iconStyle}
                size={iconSize}
            />
        ),

        electronicAccessories: (
            <MdHeadphones
                className={iconStyle}
                size={iconSize}
            />
        ),

        books: (
            <MdMenuBook
                className={iconStyle}
                size={iconSize}
            />
        ),

        tv: (
            <MdOutlineLiveTv
                className={iconStyle}
                size={iconSize}
            />
        ),
    };

    // MATCH CATEGORY WITH ICON
    const getCategoryIcon = (
        categoryName: string
    ) => {
        const name = categoryName.toLowerCase();

        // Electronic Devices
        if (
            name.includes("electronic devices")
        ) {
            return iconMap.electronicDevices;
        }

        // Electronic Accessories
        if (
            name.includes(
                "electronic accessories"
            )
        ) {
            return iconMap.electronicAccessories;
        }

        // Books & Stationery
        if (
            name.includes("books") ||
            name.includes("stationery")
        ) {
            return iconMap.books;
        }

        // TV & Home Appliances
        if (
            name.includes("tv") ||
            name.includes("home appliances")
        ) {
            return iconMap.tv;
        }

        // DEFAULT ICON
        return iconMap.electronicDevices;
    };

    // FETCH CATEGORIES
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setCategoriesLoading(true);

                const response =
                    await getCategories();

                if (response.success) {
                    setCategories(
                        response.categories
                    );
                }
            } catch (error) {
                console.error(
                    "Error fetching categories:",
                    error
                );
            } finally {
                setCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // FETCH MAIN CATEGORIES + SUB CATEGORIES
    const handleMouseEnter = async (
        index: number,
        categoryId: number
    ) => {
        try {
            setMenuLoading(true);

            const mainResponse = await getMainCategories(categoryId);

            // ❌ CLOSE MENU IF NO MAIN CATEGORIES
            if (
                !mainResponse.success ||
                !mainResponse.mainCategories ||
                mainResponse.mainCategories.length === 0
            ) {
                setHoveredIndex(null);
                setMainCategories([]);
                setSubCategories([]);
                return;
            }

            // ✅ OPEN MENU ONLY IF DATA EXISTS
            setHoveredIndex(index);
            setMainCategories(mainResponse.mainCategories);

            const subCategoryPromises =
                mainResponse.mainCategories.map(async (mainCategory) => {
                    const subResponse = await getSubCategories(
                        categoryId,
                        mainCategory.id
                    );

                    return subResponse.subCategories || [];
                });

            const subResults = await Promise.all(subCategoryPromises);

            setSubCategories(subResults.flat());
        } catch (error) {
            console.error("Error fetching menu data:", error);
            setHoveredIndex(null); // safety fallback
        } finally {
            setMenuLoading(false);
        }
    };

    return (
        <div className="relative w-full bg-white shadow-lg border-r border-gray-200">
            <ul className="flex flex-col">
                {/* CATEGORY SKELETONS */}
                {categoriesLoading &&
                    Array.from({
                        length: 6,
                    }).map((_, index) => (
                        <li
                            key={index}
                            className="px-4 py-3 flex items-center gap-3 animate-pulse"
                        >
                            <div className="w-5 h-5 rounded bg-gray-200" />

                            <div className="h-4 w-40 rounded bg-gray-200" />
                        </li>
                    ))}

                {/* REAL CATEGORIES */}
                {!categoriesLoading &&
                    categories.map(
                        (category, index) => {
                            const categorySlug =
                                slugify(
                                    category.name
                                );

                            const relatedMainCategories =
                                mainCategories.filter(
                                    (
                                        main
                                    ) =>
                                        main.categoryId ===
                                        category.id
                                );

                            return (
                                <li
                                    key={
                                        category.id
                                    }
                                    onMouseEnter={() =>
                                        handleMouseEnter(
                                            index,
                                            category.id
                                        )
                                    }
                                    onMouseLeave={() =>
                                        setHoveredIndex(
                                            null
                                        )
                                    }
                                    className="group relative px-4 py-3 hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
                                >
                                    {/* CATEGORY */}
                                    <Link
                                        href={`/category/${categorySlug}`}
                                        className="flex items-center gap-3 w-full"
                                    >
                                        {getCategoryIcon(
                                            category.name
                                        )}

                                        <span className="font-medium text-sm">
                                            {
                                                category.name
                                            }
                                        </span>
                                    </Link>

                                    {/* MEGA MENU */}
                                    {hoveredIndex ===
                                        index && (
                                            <div className="absolute top-0 left-full w-[875px] bg-white border shadow-xl z-50 p-5 grid grid-cols-3 gap-5 min-h-[300px]">
                                                {/* MENU SKELETON */}
                                                {menuLoading &&
                                                    Array.from(
                                                        {
                                                            length: 3,
                                                        }
                                                    ).map(
                                                        (
                                                            _,
                                                            skeletonIndex
                                                        ) => (
                                                            <div
                                                                key={
                                                                    skeletonIndex
                                                                }
                                                                className="animate-pulse"
                                                            >
                                                                <div className="h-5 w-32 bg-gray-200 rounded mb-4" />

                                                                <div className="space-y-3">
                                                                    {Array.from(
                                                                        {
                                                                            length: 5,
                                                                        }
                                                                    ).map(
                                                                        (
                                                                            __,
                                                                            subIndex
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    subIndex
                                                                                }
                                                                                className="h-4 w-40 bg-gray-200 rounded"
                                                                            />
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}

                                                {/* REAL MENU */}
                                                {!menuLoading &&
                                                    relatedMainCategories.map(
                                                        (
                                                            mainCategory
                                                        ) => {
                                                            const mainSlug =
                                                                slugify(
                                                                    mainCategory.name
                                                                );

                                                            const relatedSubCategories =
                                                                subCategories.filter(
                                                                    (
                                                                        sub
                                                                    ) =>
                                                                        sub.mainCategoryId ===
                                                                        mainCategory.id
                                                                );

                                                            return (
                                                                <div
                                                                    key={
                                                                        mainCategory.id
                                                                    }
                                                                >
                                                                    {/* MAIN CATEGORY */}
                                                                    <Link
                                                                        href={`/category/${categorySlug}/${mainSlug}`}
                                                                        className="font-bold text-sm mb-3 block hover:text-secondary"
                                                                    >
                                                                        {
                                                                            mainCategory.name
                                                                        }
                                                                    </Link>

                                                                    {/* SUB CATEGORY */}
                                                                    <ul className="space-y-3 text-sm text-gray-600">
                                                                        {relatedSubCategories.map(
                                                                            (
                                                                                subCategory
                                                                            ) => {
                                                                                const subSlug =
                                                                                    slugify(
                                                                                        subCategory.name
                                                                                    );

                                                                                return (
                                                                                    <li
                                                                                        key={
                                                                                            subCategory.id
                                                                                        }
                                                                                    >
                                                                                        <Link
                                                                                            href={`/category/${categorySlug}/${mainSlug}/${subSlug}`}
                                                                                            className="flex items-center gap-2 hover:text-secondary"
                                                                                        >
                                                                                            {
                                                                                                subCategory.name
                                                                                            }
                                                                                        </Link>
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        )}
                                </li>
                            );
                        }
                    )}
            </ul>
        </div>
    );
};

export default Sidebar;