"use client"

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { GIVEAWAY_IMAGES } from '@/constants/data';


const GiveAwaySlider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1324, min: 764 },
      items: 4,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 764, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      itemClass=""
    >
      {GIVEAWAY_IMAGES.map((image) => (
        <div key={image.id} className="relative rounded overflow-hidden shadow-md h-[260px] w-[260px]">
          <Link href={image.href}>
            <Image
              src={image.src}
              alt={image.alt}
              width={200}
              height={100}
              className="w-full h-full object-cover rounded hover:opacity-90 transition"
            />
          </Link>
        </div>
      ))}
    </Carousel>
  )
}

export default GiveAwaySlider
