"use client";

import React from "react";

const BestSellerCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 mx-5 animate-pulse">

            {/* Image skeleton */}
            <div className="h-[150px] w-full bg-gray-200 rounded-lg" />

            {/* Title skeleton */}
            <div className="h-4 w-3/4 bg-gray-200 rounded" />

            {/* Price skeleton */}
            <div className="h-5 w-1/2 bg-gray-200 rounded" />

            {/* Rating skeleton */}
            <div className="flex items-center gap-2">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-3 w-10 bg-gray-200 rounded" />
            </div>

            {/* Button skeleton */}
            <div className="h-10 w-full bg-gray-200 rounded-full md:hidden" />
        </div>
    );
};

export default BestSellerCardSkeleton;