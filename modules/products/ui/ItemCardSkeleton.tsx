"use client";

import React from "react";

const ItemCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate-pulse">

            {/* IMAGE */}
            <div className="h-60 bg-gray-200" />

            {/* CONTENT */}
            <div className="p-4">

                {/* TITLE */}
                <div className="h-5 bg-gray-200 rounded w-full mb-2" />
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />

                {/* RATING */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-10 bg-gray-200 rounded" />
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                    <div className="h-5 w-16 bg-gray-200 rounded" />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
            </div>
        </div>
    );
};

export default ItemCardSkeleton;