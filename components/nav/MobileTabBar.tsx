"use client";

import React, { useEffect, useRef, useState } from "react";
import { BiX, BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

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
import { MobileTabBarProps } from "@/constants/types";


const MobileTabBar = ({ showNav, closeNav }: MobileTabBarProps) => {
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [expandedMain, setExpandedMain] = useState<string | null>(null);

    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [mainCategories, setMainCategories] = useState<MainCategoryDataType[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategoryDataType[]>([]);

    const [loading, setLoading] = useState(true);
    const [menuLoading, setMenuLoading] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const navOpenStyle = showNav ? "translate-x-0" : "translate-x-[-100%]";

    const slugify = (text: string) =>
        text.toLowerCase().trim().replace(/\s+/g, "-");

    // CLOSE ON OUTSIDE CLICK
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                closeNav();
                setExpandedItem(null);
                setExpandedMain(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [closeNav]);

    // FETCH CATEGORIES
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);

                const res = await getCategories();

                if (res.success) {
                    setCategories(res.categories);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // LOAD MAIN + SUB CATEGORIES
    const handleCategoryClick = async (
        index: number,
        categoryId: number
    ) => {
        try {
            setMenuLoading(true);

            const mainRes = await getMainCategories(categoryId);

            if (
                !mainRes.success ||
                mainRes.mainCategories.length === 0
            ) {
                setExpandedItem(null);
                setMainCategories([]);
                setSubCategories([]);
                return;
            }

            setExpandedItem(index);
            setMainCategories(mainRes.mainCategories);

            const subRes = await Promise.all(
                mainRes.mainCategories.map(async (main) => {
                    const res = await getSubCategories(
                        categoryId,
                        main.id
                    );
                    return res.subCategories || [];
                })
            );

            setSubCategories(subRes.flat());
        } catch (err) {
            console.error(err);
            setExpandedItem(null);
        } finally {
            setMenuLoading(false);
        }
    };

    return (
        <div ref={dropdownRef}>
            {/* Overlay */}
            <div
                onClick={closeNav}
                className={`${navOpenStyle} fixed inset-0 bg-black/50 w-full h-full z-[10000] transition-all`}
            />

            {/* Sidebar */}
            <ul
                className={`${navOpenStyle} fixed top-0 left-0 w-[75%] h-full bg-white z-[10006] transition-transform duration-300 overflow-y-auto p-5`}
            >
                {/* HEADER */}
                <div className="flex justify-between mb-4">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            width={100}
                            height={50}
                            alt="Logo"
                        />
                    </Link>

                    <BiX
                        onClick={closeNav}
                        className="w-6 h-6 text-black cursor-pointer"
                    />
                </div>

                {/* LOADING */}
                {loading &&
                    Array.from({ length: 5 }).map((_, i) => (
                        <li key={i} className="h-10 bg-gray-200 animate-pulse mb-2 rounded" />
                    ))}

                {/* CATEGORY LIST */}
                {!loading &&
                    categories.map((cat, index) => {
                        const categorySlug = slugify(cat.name);
                        const isOpen = expandedItem === index;

                        const relatedMain = mainCategories.filter(
                            (m) => m.categoryId === cat.id
                        );

                        return (
                            <li key={cat.id} className="border-b py-3">
                                {/* CATEGORY */}
                                <div className="flex justify-between items-center">
                                    <Link
                                        href={`/category/${categorySlug}`}
                                        onClick={closeNav}
                                        className="text-sm font-medium"
                                    >
                                        {cat.name}
                                    </Link>

                                    <BiChevronDown
                                        onClick={() =>
                                            handleCategoryClick(index, cat.id)
                                        }
                                        className={`cursor-pointer transition-transform ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>

                                {/* MAIN + SUB MENU */}
                                {isOpen && (
                                    <div className="pl-4 mt-1 space-y-4">
                                        {menuLoading ? (
                                            <div className="space-y-3 animate-pulse">
                                                {/* MAIN skeleton */}
                                                {Array.from({ length: 1 }).map((_, i) => (
                                                    <div key={i} className="space-y-2">
                                                        <div className="h-3 w-28 bg-gray-200 rounded" />

                                                        {/* SUB skeleton */}
                                                        <div className="pl-3 space-y-2">
                                                            {Array.from({ length: 2 }).map((_, j) => (
                                                                <div
                                                                    key={j}
                                                                    className="h-2.5 w-40 bg-gray-200 rounded"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            relatedMain.map((main) => {
                                                const mainSlug = slugify(main.name);

                                                const relatedSub = subCategories.filter(
                                                    (s) => s.mainCategoryId === main.id
                                                );

                                                return (
                                                    <div key={main.id}>
                                                        {/* MAIN */}
                                                        <Link
                                                            href={`/category/${categorySlug}/${mainSlug}`}
                                                            onClick={closeNav}
                                                            className="text-xs font-semibold"
                                                        >
                                                            {main.name}
                                                        </Link>

                                                        {/* SUB */}
                                                        <ul className="pl-3 mt-1 space-y-1">
                                                            {relatedSub.length === 0 ? (
                                                                <li className="text-xs text-gray-400">
                                                                    {/* No sub categories */}
                                                                </li>
                                                            ) : (
                                                                relatedSub.map((sub) => {
                                                                    const subSlug = slugify(
                                                                        sub.name
                                                                    );

                                                                    return (
                                                                        <li key={sub.id}>
                                                                            <Link
                                                                                href={`/category/${categorySlug}/${mainSlug}/${subSlug}`}
                                                                                onClick={closeNav}
                                                                                className="text-xs text-gray-600 hover:text-secondary"
                                                                            >
                                                                                {sub.name}
                                                                            </Link>
                                                                        </li>
                                                                    );
                                                                })
                                                            )}
                                                        </ul>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                )}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default MobileTabBar;