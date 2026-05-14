"use client"

import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import BestSellerCardSkeleton from '../bestSellers/BestSellerCardSkeleton';
import BestSellerCard from '../bestSellers/BestSellerCard';

import useCartStore from '@/store/cartStore';
import { ItemDataType } from '@/modules/products/products.types';
import CartToast from '@/modules/cart/ui/CartToast';
import { getItems } from '@/modules/products/products.service';


const SuperDealsSlider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1324 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1324, min: 764 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 764, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const addToCart = useCartStore((state) => state.addToCart);
  const [toastConfig, setToastConfig] = useState({
    show: false,
    itemName: "",
    quantity: 1,
  });
  const [items, setItems] = useState<ItemDataType[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH ITEMS
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

  const handleAddToCart = (card: ItemDataType) => {
    addToCart({
      id: card.id,
      title: card.name,
      price: card.newPrice > 0 ? card.newPrice : card.price, // ✅ important
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
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        keyBoardControl
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <BestSellerCardSkeleton key={index} />
        ))}
      </Carousel>
    );
  }

  return (
    <>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
      >
        {items.map((data) => (
          <BestSellerCard
            key={data.id}
            card={data}
            onAdd={() => handleAddToCart(data)}
          />
        ))}
      </Carousel>
      <div className="flex items-end">
        <CartToast
          show={toastConfig.show}
          itemName={toastConfig.itemName}
          quantity={toastConfig.quantity}
        />
      </div>
    </>
  )
}

export default SuperDealsSlider
