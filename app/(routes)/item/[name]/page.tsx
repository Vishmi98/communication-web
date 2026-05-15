"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import {
  ItemDataType,
} from "@/modules/products/products.types";
import {
  getRelatedItems,
  getCategories,
  getMainCategories,
  getSubCategories,
  getItemById,
} from "@/modules/products/products.service";
import StarRating from "@/components/StarRatings";
import CommonButton from "@/components/CommonButton";
import useCartStore from "@/store/cartStore";
import CartToast from "@/modules/cart/ui/CartToast";


const slugify = (text?: string) =>
  text
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-") || "";

const ItemPage = () => {
  const params = useParams();
  const router = useRouter();

  const itemSlug = params?.name as string;

  console.log("itemSlug", itemSlug);

  const [item, setItem] =
    useState<ItemDataType | null>(null);

  const [selectedImage, setSelectedImage] =
    useState<string>("");

  const [selectedColor, setSelectedColor] =
    useState<string>("");

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [toastConfig, setToastConfig] = useState({
    show: false,
    itemName: "",
    quantity: 1,
  });
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (card: ItemDataType) => {
    addToCart({
      id: card.id,
      title: card.name,
      price: card.newPrice > 0 ? card.newPrice : card.price, // ✅ use newPrice
      image: card.mainImagePath,
      rate: card.rating,
      quantity: quantity, // ✅ use state
      color: selectedColor, // ✅ ADD COLOR
    });

    setToastConfig({
      show: true,
      itemName: card.name,
      quantity,
    });

    setTimeout(() => {
      setToastConfig((prev) => ({
        ...prev,
        show: false,
      }));
    }, 2500);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);

        // ⚠ TEMP SOLUTION
        // Replace later with getItemBySlug API

        const categoriesRes =
          await getCategories();

        if (!categoriesRes.success) return;

        for (const category of categoriesRes.categories) {
          const mainRes =
            await getMainCategories(
              category.id
            );

          if (!mainRes.success) continue;

          for (const main of mainRes.mainCategories) {
            const subRes =
              await getSubCategories(
                category.id,
                main.id
              );

            if (!subRes.success) continue;

            for (const sub of subRes.subCategories) {
              const itemsRes =
                await getRelatedItems(
                  category.id,
                  main.id,
                  sub.id
                );

              if (!itemsRes.success) continue;

              const matchedItem =
                itemsRes.items.find(
                  (i) =>
                    slugify(i.name) ===
                    slugify(itemSlug)
                );

              if (matchedItem) {
                const itemRes =
                  await getItemById({
                    id: matchedItem.id,
                  });

                if (itemRes.success && itemRes.item) {
                  setItem(itemRes.item);

                  setSelectedImage(
                    itemRes.item.mainImagePath
                  );

                  if (itemRes.item.colors?.length) {
                    setSelectedColor(
                      String(
                        itemRes.item.colors[0].name
                      )
                    );
                  }
                }

                return;
              }
            }
          }
        }
      } catch (error) {
        console.error(
          "Item page error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemSlug]);

  const handleBuyNow = () => {
    addToCart({
      id: item!.id,
      title: item!.name,
      price: item!.newPrice > 0 ? item!.newPrice : item!.price,
      image: item!.mainImagePath,
      rate: item!.rating,
      quantity,
      color: selectedColor,
    });

    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="w-[95%] mx-auto py-10 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="h-[400px] bg-gray-200 rounded-2xl" />

          <div>
            <div className="h-8 w-72 bg-gray-200 rounded mb-4" />
            <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
            <div className="h-10 w-40 bg-gray-200 rounded mb-6" />

            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="w-[95%] mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">
          Item Not Found
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen w-[95%] mx-auto py-10">

        {/* BREADCRUMB */}
        <p className="text-sm text-gray-500 mb-8">
          Home /{" "}
          {item.categoryInfo?.name} /{" "}
          {item.mainCategoryInfo?.name} /{" "}
          {item.subCategoryInfo?.name}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="flex flex-col md:flex-row gap-5 w-full items-center md:items-start">
            {/* MAIN IMAGE */}
            <div className="relative h-[400px] w-full md:w-[80%] rounded-2xl overflow-hidden border">
              <Image
                src={
                  selectedImage ||
                  "/placeholder.jpg"
                }
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* GALLERY */}
            <div className="flex flex-col gap-3 overflow-y-auto w-full md:w-[20%]">
              {[
                item.mainImagePath,
                ...(item.imagePaths || []),
              ]
                .filter(Boolean)
                .map((image, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedImage(image)
                    }
                    className={`relative min-w-[90px] h-[90px] rounded-xl overflow-hidden border-2 ${selectedImage === image
                      ? "border-primary"
                      : "border-gray-200"
                      }`}
                  >
                    <Image
                      src={image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>

            {/* TITLE */}
            <h1 className="text-xl md:text-3xl font-bold">
              {item.name}
            </h1>

            {/* BRAND */}
            {item.brand && <p className="text-gray-500 mt-1">
              Brand:{" "}
              <span className="font-medium">
                {item.brand}
              </span>
            </p>}

            {/* RATING */}
            <div className="flex items-center text-yellow-500 gap-2 mt-2">
              {item.rating > 0 && <StarRating
                rating={item.rating}
              />}

              {item.reviews > 0 && <span className="text-gray-500">
                ({item.reviews})
              </span>}
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4 mt-4">
              {item.newPrice > 0 ? (
                <>
                  <p className="text-xl md:text-2xl font-bold text-secondary">
                    Rs. {item.newPrice}
                  </p>

                  <p className="text-sm md:text-xl text-gray-400 line-through">
                    Rs. {item.price}
                  </p>
                </>
              ) : (
                <p className="text-xl md:text-2xl font-bold text-secondary">
                  Rs. {item.price}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-5">
              <p className="text-gray-600 leading-7">
                {item.description}
              </p>
            </div>

            {/* COLORS */}
            {item.colors?.length > 0 && (
              <div className="mt-6">
                <h2 className="font-semibold mb-3">
                  Colors
                </h2>

                <div className="flex gap-3">
                  {item.colors.map(
                    (color) => (
                      <button
                        key={String(
                          color.id
                        )}
                        onClick={() =>
                          setSelectedColor(
                            String(
                              color.name
                            )
                          )
                        }
                        className={`w-10 h-10 rounded-full border-4 transition ${selectedColor ===
                          color.name
                          ? "border-black"
                          : "border-gray-200"
                          }`}
                        style={{
                          backgroundColor:
                            String(
                              color.hexCode
                            ),
                        }}
                      />
                    )
                  )}
                </div>

                <p className="text-sm text-gray-500 mt-3">
                  Selected:{" "}
                  {selectedColor}
                </p>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-8">
              <h2 className="font-semibold mb-3">
                Quantity
              </h2>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                  className="w-8 h-8 rounded-lg border"
                >
                  -
                </button>

                <span className="text-lg font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                  className="w-8 h-8 rounded-lg border"
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-10">
              <CommonButton
                title="Add to Cart"
                onPress={() => handleAddToCart(item!)}
              />

              <CommonButton
                title="Buy Now"
                onPress={handleBuyNow}
                backgroundColor="bg-white"
                textColor="text-black"
                shadowColor="rgba(0,0,0,0.08)"
                className="border border-black"
              />
            </div>
          </div>
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

export default ItemPage;