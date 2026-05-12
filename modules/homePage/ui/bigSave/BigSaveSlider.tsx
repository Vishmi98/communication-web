"use client"

import React, { useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import BigSaveCard from './BigSaveCard';

import { BEST_SELLERS } from '@/constants/data';
import useCartStore from '@/store/cartStore';
import { DealCardType } from '@/modules/homePage/homePage.types';


const BigSaveSlider = () => {
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

  const handleAddToCart = (card: DealCardType) => {
    addToCart({
      id: card.id,
      title: card.title,
      price: card.price,
      image: card.image,
      rate: card.rate,
      quantity: 1,
    });

    setToastConfig({
      show: true,
      itemName: card.title,
      quantity: 1,
    });

    setTimeout(() => {
      setToastConfig((prev) => ({
        ...prev,
        show: false,
      }));
    }, 2500);
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
    >
      {BEST_SELLERS.map((data) => (
        <BigSaveCard key={data.id} card={data} onAdd={() => handleAddToCart(data)} />
      ))}
    </Carousel>
  )
}

export default BigSaveSlider
