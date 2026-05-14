"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FiSearch,
    FiX,
} from "react-icons/fi";

import {
    searchItems,
    searchCategories,
    searchMainCategories,
    searchSubCategories,
} from "@/modules/homePage/homePage.service";
import {
    ItemDataType,
    CategoryDataType,
    MainCategoryDataType,
    SubCategoryDataType,
} from "@/modules/products/products.types";


const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

const SearchArea = () => {
    const router = useRouter();

    const [query, setQuery] =
        useState("");

    const [items, setItems] =
        useState<ItemDataType[]>(
            []
        );

    const [categories, setCategories] =
        useState<CategoryDataType[]>(
            []
        );

    const [
        mainCategories,
        setMainCategories,
    ] = useState<
        MainCategoryDataType[]
    >([]);

    const [
        subCategories,
        setSubCategories,
    ] = useState<
        SubCategoryDataType[]
    >([]);

    const [loading, setLoading] =
        useState(false);

    const [open, setOpen] =
        useState(false);

    // 🔎 SEARCH
    const handleSearch =
        async () => {
            if (
                query.trim().length < 2
            ) {
                setItems([]);
                setCategories([]);
                setMainCategories(
                    []
                );
                setSubCategories(
                    []
                );
                setOpen(false);
                return;
            }

            try {
                setLoading(true);

                const [
                    itemRes,
                    categoryRes,
                    mainCategoryRes,
                    subCategoryRes,
                ] = await Promise.all([
                    searchItems(query),
                    searchCategories(
                        query
                    ),
                    searchMainCategories(
                        query
                    ),
                    searchSubCategories(
                        query
                    ),
                ]);

                if (
                    itemRes.success
                ) {
                    setItems(
                        itemRes.items
                    );
                }

                if (
                    categoryRes.success
                ) {
                    setCategories(
                        categoryRes.categories
                    );
                }

                if (
                    mainCategoryRes.success
                ) {
                    setMainCategories(
                        mainCategoryRes.mainCategories
                    );
                }

                if (
                    subCategoryRes.success
                ) {
                    setSubCategories(
                        subCategoryRes.subCategories
                    );
                }

                setOpen(true);
            } catch (error) {
                console.error(
                    "Search error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

    // ❌ CLEAR SEARCH
    const clearSearch = () => {
        setQuery("");
        setItems([]);
        setCategories([]);
        setMainCategories([]);
        setSubCategories([]);
        setOpen(false);
    };

    // ✅ ITEM PAGE
    const handleItemSelect = (
        item: ItemDataType
    ) => {
        const categorySlug =
            slugify(
                item.categoryInfo
                    ?.name || ""
            );

        const mainSlug =
            slugify(
                item
                    .mainCategoryInfo
                    ?.name || ""
            );

        const subSlug =
            slugify(
                item
                    .subCategoryInfo
                    ?.name || ""
            );

        const itemSlug =
            slugify(item.name);

        clearSearch();

        // ✅ FULL PATH
        if (
            categorySlug &&
            mainSlug &&
            subSlug
        ) {
            router.push(
                `/category/${categorySlug}/${mainSlug}/${subSlug}/${itemSlug}`
            );

            return;
        }

        // ✅ CATEGORY + MAIN CATEGORY
        if (
            categorySlug &&
            mainSlug
        ) {
            router.push(
                `/category/${categorySlug}/${mainSlug}/${itemSlug}`
            );

            return;
        }

        // ✅ CATEGORY ONLY
        if (categorySlug) {
            router.push(
                `/category/${categorySlug}/${itemSlug}`
            );

            return;
        }

        // ✅ FALLBACK
        router.push(
            `/item/${itemSlug}`
        );
    };

    // ✅ CATEGORY PAGE
    const handleCategorySelect =
        (
            category: CategoryDataType
        ) => {
            const categorySlug =
                slugify(
                    category.name
                );

            clearSearch();

            router.push(
                `/category/${categorySlug}`
            );
        };

    // ✅ MAIN CATEGORY PAGE
    // const handleMainCategorySelect =
    //     (
    //         category: MainCategoryDataType
    //     ) => {
    //         const categorySlug =
    //             slugify(
    //                 category
    //                     .categoryInfo
    //                     ?.name || ""
    //             );

    //         const mainSlug =
    //             slugify(
    //                 category.name
    //             );

    //         clearSearch();

    //         router.push(
    //             `/category/${categorySlug}/${mainSlug}`
    //         );
    //     };

    // ✅ SUB CATEGORY PAGE
    // const handleSubCategorySelect =
    //     (
    //         category: SubCategoryDataType
    //     ) => {
    //         const categorySlug =
    //             slugify(
    //                 category
    //                     .categoryInfo
    //                     ?.name || ""
    //             );

    //         const mainSlug =
    //             slugify(
    //                 category
    //                     .mainCategoryInfo
    //                     ?.name || ""
    //             );

    //         const subSlug =
    //             slugify(
    //                 category.name
    //             );

    //         clearSearch();

    //         router.push(
    //             `/category/${categorySlug}/${mainSlug}/${subSlug}`
    //         );
    //     };

    const noResults =
        items.length === 0 &&
        categories.length === 0 &&
        mainCategories.length ===
        0 &&
        subCategories.length ===
        0;

    return (
        <div className="relative w-full max-w-[500px]">
            {/* INPUT */}
            <div className="relative w-full">
                <input
                    value={query}
                    onChange={(e) =>
                        setQuery(
                            e.target.value
                        )
                    }
                    onKeyDown={(
                        e
                    ) => {
                        if (
                            e.key ===
                            "Enter"
                        ) {
                            handleSearch();
                        }
                    }}
                    placeholder="Search products..."
                    className="w-full border border-gray-300 rounded-full pl-12 pr-12 py-2 outline-none focus:border-primary"
                />

                {/* SEARCH ICON */}
                <button
                    type="button"
                    onClick={
                        handleSearch
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                >
                    <FiSearch
                        size={20}
                    />
                </button>

                {/* CLEAR ICON */}
                {query && (
                    <button
                        type="button"
                        onClick={
                            clearSearch
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
                    >
                        <FiX
                            size={20}
                        />
                    </button>
                )}
            </div>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute top-full mt-2 w-full bg-white shadow-xl rounded-lg z-50 max-h-[500px] overflow-y-auto border border-gray-100">

                    {/* LOADING */}
                    {loading && (
                        <p className="p-4 text-sm text-gray-500">
                            Searching...
                        </p>
                    )}

                    {/* NO RESULTS */}
                    {!loading &&
                        noResults && (
                            <p className="p-4 text-sm text-gray-500">
                                No
                                results
                                found
                            </p>
                        )}

                    {/* PRODUCTS */}
                    {items.length >
                        0 && (
                            <div className="p-2 space-y-2">
                                {items.map(
                                    (
                                        item
                                    ) => (
                                        <div
                                            key={
                                                item.id
                                            }
                                            onClick={() =>
                                                handleItemSelect(
                                                    item
                                                )
                                            }
                                            className="hover:bg-gray-100 cursor-pointer"
                                        >
                                            <p className="text-sm font-medium">
                                                {
                                                    item.name
                                                }
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                    {/* CATEGORIES */}
                    {/* {categories.length >
                        0 && (
                            <div>
                                <p className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase">
                                    Categories
                                </p>

                                {categories.map(
                                    (
                                        category
                                    ) => (
                                        <div
                                            key={
                                                category.id
                                            }
                                            onClick={() =>
                                                handleCategorySelect(
                                                    category
                                                )
                                            }
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <p className="text-sm font-medium">
                                                {
                                                    category.name
                                                }
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        )} */}

                    {/* MAIN CATEGORIES */}
                    {/* {mainCategories.length >
                        0 && (
                            <div>
                                <p className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase">
                                    Main
                                    Categories
                                </p>

                                {mainCategories.map(
                                    (
                                        category
                                    ) => (
                                        <div
                                            key={
                                                category.id
                                            }
                                            onClick={() =>
                                                handleMainCategorySelect(
                                                    category
                                                )
                                            }
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <p className="text-sm font-medium">
                                                {
                                                    category.name
                                                }
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {
                                                    category
                                                        .categoryInfo
                                                        ?.name
                                                }
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        )} */}

                    {/* SUB CATEGORIES */}
                    {/* {subCategories.length >
                        0 && (
                            <div>
                                <p className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase">
                                    Sub
                                    Categories
                                </p>

                                {subCategories.map(
                                    (
                                        category
                                    ) => (
                                        <div
                                            key={
                                                category.id
                                            }
                                            onClick={() =>
                                                handleSubCategorySelect(
                                                    category
                                                )
                                            }
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <p className="text-sm font-medium">
                                                {
                                                    category.name
                                                }
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {
                                                    category
                                                        .mainCategoryInfo
                                                        ?.name
                                                }
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        )} */}
                </div>
            )}

            {/* BACKDROP */}
            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() =>
                        setOpen(false)
                    }
                />
            )}
        </div>
    );
};

export default SearchArea;