"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
    CategoryDataType,
    ItemDataType,
    MainCategoryDataType,
    SubCategoryDataType,
} from "@/modules/products/products.types";

import {
    getCategories,
    getMainCategories,
    getRelatedItems,
    getSubCategories,
} from "@/modules/products/products.service";
import ItemCard from "@/modules/products/ui/ItemCard";
import ItemCardSkeleton from "@/modules/products/ui/ItemCardSkeleton";
import useCartStore from "@/store/cartStore";
import CartToast from "@/modules/cart/ui/CartToast";
import { getEffectivePrice } from "@/constants/utils";


const SubCategoryPage = () => {
    const params = useParams();

    const categorySlug = params?.category as string;
    const mainSlug = params?.mainCategory as string;
    const subSlug = params?.subCategory as string;

    const addToCart = useCartStore((state) => state.addToCart);

    const [loading, setLoading] = useState(true);
    const [toastConfig, setToastConfig] = useState({
        show: false,
        itemName: "",
        quantity: 1,
    });

    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [mainCategories, setMainCategories] = useState<
        MainCategoryDataType[]
    >([]);
    const [subCategories, setSubCategories] = useState<
        SubCategoryDataType[]
    >([]);

    const [items, setItems] = useState<ItemDataType[]>([]);

    const formattedCategory = decodeURIComponent(categorySlug || "")
        .replace(/-/g, " ")
        .toLowerCase();

    const formattedMain = decodeURIComponent(mainSlug || "")
        .replace(/-/g, " ")
        .toLowerCase();

    const formattedSub = decodeURIComponent(subSlug || "")
        .replace(/-/g, " ")
        .toLowerCase();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // 1️⃣ GET ALL CATEGORIES
                const catRes = await getCategories();
                if (!catRes.success) return;

                setCategories(catRes.categories);

                const matchedCategory = catRes.categories.find(
                    (c) =>
                        c.name.toLowerCase() === formattedCategory
                );

                if (!matchedCategory) return;

                // 2️⃣ GET MAIN CATEGORIES
                const mainRes = await getMainCategories(
                    matchedCategory.id
                );

                if (!mainRes.success) return;

                setMainCategories(mainRes.mainCategories);

                const matchedMain = mainRes.mainCategories.find(
                    (m) =>
                        m.name.toLowerCase() === formattedMain
                );

                if (!matchedMain) return;

                // 3️⃣ GET SUB CATEGORIES
                const subRes = await getSubCategories(
                    matchedCategory.id,
                    matchedMain.id
                );

                if (!subRes.success) return;

                setSubCategories(subRes.subCategories);

                const matchedSub = subRes.subCategories.find(
                    (s) =>
                        s.name.toLowerCase() === formattedSub
                );

                if (!matchedSub) return;

                // 4️⃣ GET RELATED ITEMS (FINAL API)
                const itemRes = await getRelatedItems(
                    matchedCategory.id,
                    matchedMain.id,
                    matchedSub.id
                );

                if (itemRes.success) {
                    setItems(itemRes.items);
                }
            } catch (error) {
                console.error("SubCategoryPage error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [formattedCategory, formattedMain, formattedSub]);

    const handleAddToCart = (card: ItemDataType) => {
        addToCart({
            id: card.id,
            title: card.name,
            price: getEffectivePrice(card),
            image: card.mainImagePath,
            rate: card.rating,
            quantity: 1,
        });

        setToastConfig({
            show: true,
            itemName: card.name,
            quantity: 1,
        });

        setTimeout(() => {
            setToastConfig((prev) => ({
                ...prev,
                show: false,
            }));
        }, 2500);
    };

    if (loading) {
        return (
            <div className="w-[95%] mx-auto py-10">

                {/* BREADCRUMB SKELETON */}
                <div className="h-4 w-64 bg-gray-200 rounded mb-4 animate-pulse" />

                {/* TITLE SKELETON */}
                <div className="h-8 w-52 bg-gray-200 rounded mb-8 animate-pulse" />

                {/* ITEM SKELETONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ItemCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10 mt-5 md:mt-0">

                {/* Breadcrumb */}
                <p className="text-sm text-gray-500 mb-4 capitalize">
                    Home / {formattedCategory} / {formattedMain} /{" "}
                    {formattedSub}
                </p>

                {/* Heading */}
                <h1 className="text-3xl font-bold mb-8 capitalize">
                    {formattedSub}
                </h1>

                {/* ITEMS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.length === 0 ? (
                        <div className="col-span-full text-center py-16">
                            <h2 className="text-2xl font-semibold text-gray-700">
                                No Items Found
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Try another category or come back later.
                            </p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <ItemCard
                                key={item.id}
                                item={item}
                                onAdd={() => handleAddToCart(item)}
                            />
                        ))
                    )}
                </div>
            </div>
            <CartToast
                show={toastConfig.show}
                itemName={toastConfig.itemName}
                quantity={toastConfig.quantity}
            />
        </>
    );
};

export default SubCategoryPage;