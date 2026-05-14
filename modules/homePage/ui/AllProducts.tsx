"use client";

import React, { useEffect, useState } from "react";

import { getItems } from "@/modules/products/products.service";
import { ItemDataType } from "@/modules/products/products.types";
import ItemCard from "@/modules/products/ui/ItemCard";
import ItemCardSkeleton from "@/modules/products/ui/ItemCardSkeleton";

const AllProducts = () => {
    const [showAll, setShowAll] = useState(false);
    const [items, setItems] = useState<ItemDataType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);

                const res = await getItems();

                if (res.success) {
                    setItems(res.items);
                }
            } catch (error) {
                console.error("Failed to fetch items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const displayedItems = showAll ? items : items.slice(0, 8);

    // ✅ LOADING STATE (simple skeleton)
    if (loading) {
        return (
            <div className="w-full flex flex-col items-center gap-6 pb-10">
                <h1 className="text-xl md:text-2xl font-semibold">
                    More to love
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <ItemCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full gap-10 flex flex-col items-center justify-center pb-10">
            <h1 className="text-xl md:text-2xl font-semibold">
                More to love
            </h1>

            {/* EMPTY STATE */}
            {items.length === 0 ? (
                <p className="text-gray-500">No products found</p>
            ) : (
                <>
                    <div className="flex flex-col md:flex-row items-center justify-center w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center w-full">
                            {displayedItems.map((card) => (
                                <div key={card.id} className="w-full">
                                    <ItemCard
                                        item={card}
                                        onAdd={() => { }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TOGGLE BUTTON */}
                    {items.length > 8 && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="mt-5 border border-black text-black px-4 py-2 rounded hover:bg-primary hover:text-white transition"
                        >
                            {showAll ? "Show Less" : "View All"}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default AllProducts;