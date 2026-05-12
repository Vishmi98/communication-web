"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiAlignLeft } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";

import SearchArea from "./SearchArea";
import MobileTabBar from "./MobileTabBar";

import useCartStore from "@/store/cartStore";


const TopNav = () => {
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [navBg, setNavBg] = useState(false);
    const cartCount = useCartStore((state) => state.cartCount);

    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= 90) {
                setNavBg(true);
            } else {
                setNavBg(false);
            }
        };

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const openNav = () => setShowMobileNav(true);
    const closeNav = () => setShowMobileNav(false);

    return (
        <>
            <div className="w-full p-0.5">
                <div className="w-[95%] mx-auto flex flex-col">
                    <div className="grid grid-cols-2 md:grid-cols-4 items-center">
                        <div className="col-span-1 flex items-center">
                            <BiAlignLeft
                                onClick={openNav}
                                className='w-[1.2rem] h-[1.2rem] md:hidden text-secondary'
                            />
                            <Link href="/">
                                <Image
                                    src="/logo.png"
                                    width={100}
                                    height={50}
                                    alt="Logo"
                                    className="cursor-pointer"
                                />
                            </Link>
                        </div>

                        <div className="col-span-2 justify-center hidden md:flex">
                            <SearchArea />
                        </div>

                        <div className="col-span-1 flex justify-end items-center space-x-5">
                            <Link href='/cart' className="relative flex cursor-pointer">
                                <MdOutlineShoppingCart size={25} />
                                {cartCount > 0 && (
                                    <span className="absolute top-[-6] right-[-6] bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <button className="relative flex">
                                <HiHeart size={25} />
                            </button>

                            <button className="relative flex">
                                <FaUser size={25} />
                            </button>
                        </div>
                    </div>

                    <div className="col-span-2 justify-center flex md:hidden">
                        <SearchArea />
                    </div>
                </div>
            </div>
            {showMobileNav && (
                <MobileTabBar showNav={showMobileNav} closeNav={closeNav} />
            )}
        </>
    );
};

export default TopNav;
