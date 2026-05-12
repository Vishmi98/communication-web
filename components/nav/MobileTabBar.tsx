import React, { useEffect, useRef, useState } from 'react';
import { BiX } from 'react-icons/bi';

import { MobileTabBarProps } from '@/constants/types';


const MobileTabBar = ({ showNav, closeNav }: MobileTabBarProps) => {
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [expandedSubItem, setExpandedSubItem] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navOpenStyle = showNav ? "translate-x-0" : "translate-x-[-100%]";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeNav();
                setExpandedItem(null);
                setExpandedSubItem(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeNav]);

    return (
        <div ref={dropdownRef}>
            <div
                onClick={closeNav}
                className={`${navOpenStyle} fixed top-0 transform transition-all duration-500 z-[10000] left-0 right-0 bottom-0 bg-secondary opacity-50 w-[100vw] h-[100vh]`}
            ></div>
            <ul
                className={`${navOpenStyle} text-white fixed top-0 flex items-start px-5 pt-[2rem] flex-col justify-start h-[100%] transform transition-all duration-300 delay-200 w-[60%] bg-accent space-y-5 z-[10006]`}
            >
                <div className="flex items-center justify-end w-full">
                    <BiX onClick={closeNav} className="w-[1.5rem] h-[1.5rem] text-white" />
                </div>
               
            </ul>
        </div>
    );
};

export default MobileTabBar;
