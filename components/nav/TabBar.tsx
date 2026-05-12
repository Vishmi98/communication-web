"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoReorderThreeOutline } from "react-icons/io5";

import { TABS_DATA } from "@/constants/data";


const TabBar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-7 gap-5 w-[95%] h-[50px] mx-auto border-b-2 border-primary py-1">
      {/* Left Side - All Categories */}
      <div className="col-span-2 hidden md:flex items-center justify-center gap-2 bg-gray-200 text-black font-semibold rounded-full h-full px-4 cursor-pointer">
        <IoReorderThreeOutline size={20} />
        <span>All Categories</span>
      </div>

      {/* Tabs */}
      <div className="col-span-7  scrollbar-none md:col-span-5 overflow-x-auto md:overflow-x-hidden flex items-center justify-between h-full">
        {TABS_DATA.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeIndex === index;

          return (
            <Link
              href="/"
              key={tab.id}
              onClick={() => setActiveIndex(index)}
              className={`group flex items-center gap-2 text-nowrap text-sm font-semibold px-3 py-2 h-full transition duration-300 rounded-md
                ${isActive ? "text-secondary" : "text-gray-600 hover:text-white hover:bg-primary"}`}
            >
              <Icon
                size={20}
                className={isActive ? "text-secondary" : "text-primary group-hover:text-white"}
              />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default TabBar;
