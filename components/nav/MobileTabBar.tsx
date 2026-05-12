"use client";

import React, { useEffect, useRef, useState } from "react";
import { BiX, BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

import { MENUITEMS } from "@/constants/data";
import { MobileTabBarProps } from "@/constants/types";


const MobileTabBar = ({ showNav, closeNav }: MobileTabBarProps) => {
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [expandedSubItem, setExpandedSubItem] = useState<string | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const navOpenStyle = showNav ? "translate-x-0" : "translate-x-[-100%]";

    const slugify = (text: string) =>
        text.toLowerCase().replace(/\s+/g, "-");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                closeNav();
                setExpandedItem(null);
                setExpandedSubItem(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [closeNav]);

    return (
        <div ref={dropdownRef}>
            {/* Overlay */}
            <div
                onClick={closeNav}
                className={`${navOpenStyle} fixed inset-0 bg-black/50 w-full h-full z-[10000] transition-all`}
            />

            {/* Sidebar */}
            <ul
                className={`${navOpenStyle} fixed top-0 left-0 w-[75%] sm:w-[60%] h-full bg-white z-[10006] transition-transform duration-300 overflow-y-auto p-5`}
            >
                <div className="flex justify-between">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            width={100}
                            height={50}
                            alt="Logo"
                            className="cursor-pointer"
                        />
                    </Link>
                    {/* Close button */}
                    <div className="flex justify-end mb-4">
                        <BiX
                            onClick={closeNav}
                            className="w-6 h-6 text-black cursor-pointer"
                        />
                    </div>
                </div>

                {/* MENU ITEMS */}
                {MENUITEMS.map((item, index) => {
                    const categorySlug = slugify(item.name);
                    const isOpen = expandedItem === index;

                    return (
                        <li key={item.id} className="border-b py-3">
                            {/* Main Category */}
                            <div className="flex justify-between items-center">
                                <Link
                                    href={`/category/${categorySlug}`}
                                    onClick={closeNav}
                                    className="text-sm font-medium text-gray-800"
                                >
                                    {item.name}
                                </Link>

                                <BiChevronDown
                                    onClick={() =>
                                        setExpandedItem(
                                            isOpen ? null : index
                                        )
                                    }
                                    className={`cursor-pointer transition-transform ${isOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {/* Sub Menu Sections */}
                            {isOpen && (
                                <div className="pl-4 mt-3 space-y-3">
                                    {item.subMenu.sections.map((section) => {
                                        const mainSlug = slugify(
                                            section.heading
                                        );

                                        const subKey = `${index}-${section.heading}`;
                                        const subOpen =
                                            expandedSubItem === subKey;

                                        return (
                                            <div key={section.heading}>
                                                {/* Section heading */}
                                                <div className="flex justify-between items-center">
                                                    <Link
                                                        href={`/category/${categorySlug}/${mainSlug}`}
                                                        onClick={closeNav}
                                                        className="text-xs font-semibold text-gray-700"
                                                    >
                                                        {section.heading}
                                                    </Link>

                                                    <BiChevronDown
                                                        onClick={() =>
                                                            setExpandedSubItem(
                                                                subOpen
                                                                    ? null
                                                                    : subKey
                                                            )
                                                        }
                                                        className={`w-4 h-4 cursor-pointer transition-transform ${subOpen
                                                            ? "rotate-180"
                                                            : ""
                                                            }`}
                                                    />
                                                </div>

                                                {/* Sub items */}
                                                {subOpen && (
                                                    <ul className="pl-3 mt-2 space-y-2">
                                                        {section.items.map(
                                                            (subItem) => {
                                                                const subSlug =
                                                                    slugify(
                                                                        subItem.name
                                                                    );

                                                                return (
                                                                    <li
                                                                        key={
                                                                            subItem.name
                                                                        }
                                                                    >
                                                                        <Link
                                                                            href={`/category/${categorySlug}/${mainSlug}/${subSlug}`}
                                                                            onClick={
                                                                                closeNav
                                                                            }
                                                                            className="text-xs text-gray-600 hover:text-secondary"
                                                                        >
                                                                            {
                                                                                subItem.name
                                                                            }
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        );
                                    })}
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