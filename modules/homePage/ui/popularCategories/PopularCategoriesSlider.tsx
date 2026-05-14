"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { MainCategoryDataType } from "@/modules/products/products.types";
import { getAllMainCategories } from "@/modules/products/products.service";


const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, "-");

const PopularCategoriesSlider = () => {
  const [categories, setCategories] = useState<MainCategoryDataType[]>([]);
  const [loading, setLoading] = useState(true);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1324, min: 764 },
      items: 4,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 764, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const res = await getAllMainCategories();

        if (res.success) {
          setCategories(res.mainCategories);
        }
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Carousel
        responsive={responsive}
        infinite
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative rounded overflow-hidden shadow-md h-[300px] md:h-[260px] w-full md:w-[260px] mx-2 bg-gray-200 animate-pulse"
          />
        ))}
      </Carousel>
    );
  }

  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={5000}
      keyBoardControl
    >
      {categories.map((category) => {
        const categorySlug = slugify(category.categoryInfo?.name || "");
        const mainSlug = slugify(category.name);

        return (
          <div
            key={category.id}
            className="relative rounded overflow-hidden shadow-md h-[300px] md:h-[260px] w-full md:w-[260px] mx-2"
          >
            {/* ✅ FIXED ROUTE */}
            <Link href={`/category/${categorySlug}/${mainSlug}`}>
              <Image
                src={category.imagePath || "/placeholder.jpg"}
                alt={category.name}
                width={260}
                height={260}
                className="w-full h-full object-cover rounded hover:opacity-90 transition"
              />
            </Link>

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white p-2 text-center text-sm font-medium">
              {category.name}
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default PopularCategoriesSlider;