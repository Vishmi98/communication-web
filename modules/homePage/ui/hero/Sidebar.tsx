"use client";

import React, { JSX, useState } from "react";
import {
    MdCameraAlt,
    MdChildFriendly,
    MdLaptopMac,
    MdOutlineBed,
    MdOutlineCheckroom,
    MdOutlineHome,
    MdOutlineKitchen,
    MdOutlineLiveTv,
    MdOutlineVideogameAsset,
    MdOutlineWifi,
    MdPhoneAndroid,
    MdTerrain,
} from "react-icons/md";
import { BiBook } from "react-icons/bi";
import Link from "next/link";

import { MENUITEMS } from "@/constants/data";

const Sidebar = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const iconStyle = "text-secondary";
    const iconSize = 20;

    const slugify = (text: string) =>
        text.toLowerCase().replace(/\s+/g, "-");

    const iconMap: Record<string, JSX.Element> = {
        tv: <MdOutlineLiveTv className={iconStyle} size={iconSize} />,
        phone: <MdPhoneAndroid className={iconStyle} size={iconSize} />,
        laptop: <MdLaptopMac className={iconStyle} size={iconSize} />,
        game: <MdOutlineVideogameAsset className={iconStyle} size={iconSize} />,
        camera: <MdCameraAlt className={iconStyle} size={iconSize} />,
        wifi: <MdOutlineWifi className={iconStyle} size={iconSize} />,
        kettle: <MdOutlineKitchen className={iconStyle} size={iconSize} />,
        home: <MdOutlineHome className={iconStyle} size={iconSize} />,
        bed: <MdOutlineBed className={iconStyle} size={iconSize} />,
        shirt: <MdOutlineCheckroom className={iconStyle} size={iconSize} />,
        baby: <MdChildFriendly className={iconStyle} size={iconSize} />,
        mountain: <MdTerrain className={iconStyle} size={iconSize} />,
        book: <BiBook className={iconStyle} size={iconSize} />,
    };

    return (
        <div className="relative w-full bg-white shadow-lg border-r border-gray-200">
            <ul className="flex flex-col">
                {MENUITEMS.map((item, index) => {
                    const categorySlug = slugify(item.name);

                    return (
                        <li
                            key={item.id}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative px-4 py-3 hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
                        >
                            {/* CATEGORY */}
                            <Link
                                href={`/category/${categorySlug}`}
                                className="flex items-center gap-3 w-full"
                            >
                                {iconMap[item.icon]}
                                <span className="font-medium text-sm">
                                    {item.name}
                                </span>
                            </Link>

                            {/* MEGA MENU */}
                            {hoveredIndex === index && (
                                <div className="absolute top-0 left-full w-[875px] bg-white border shadow-xl z-50 p-5 grid grid-cols-3 gap-5">
                                    {item.subMenu.sections.map((section) => {
                                        const mainSlug = slugify(section.heading);

                                        return (
                                            <div key={section.heading}>
                                                {/* MAIN CATEGORY */}
                                                <Link
                                                    href={`/category/${categorySlug}/${mainSlug}`}
                                                    className="font-bold text-sm mb-3 block hover:text-secondary"
                                                >
                                                    {section.heading}
                                                </Link>

                                                {/* SUB CATEGORY */}
                                                <ul className="space-y-3 text-sm text-gray-600">
                                                    {section.items.map((subItem) => {
                                                        const subSlug = slugify(subItem.name);

                                                        return (
                                                            <li key={subItem.name}>
                                                                <Link
                                                                    href={`/category/${categorySlug}/${mainSlug}/${subSlug}`}
                                                                    className="flex items-center gap-2 hover:text-secondary"
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
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

export default Sidebar;