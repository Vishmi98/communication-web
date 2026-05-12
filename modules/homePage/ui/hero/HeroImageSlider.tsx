"use client"

import React from 'react'
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";

import { SLIDE_IMAGES } from '@/constants/data';


const HeroImageSlider = () => {
    const properties = {
        duration: 3000,
        transitionDuration: 500,
        infinite: true,
        // indicators: true,
        arrows: true,
        pauseOnHover: true,
        autoplay: true,
        prevArrow: (
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full cursor-pointer z-10">
                <FaArrowLeft />
            </div>
        ),
        nextArrow: (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full cursor-pointer z-10">
                <FaArrowRight />
            </div>
        ),
    };

    return (
        <div className='w-full flex flex-col gap-5 mt-3'>
            <div className="w-full relative border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                <Slide {...properties}>
                    {SLIDE_IMAGES.map((img) => (
                        <div className="relative w-full h-44 md:h-[420px]" key={img.id}>
                            <Image
                                src={img.url}
                                alt={img.alt}
                                layout="fill"
                                objectFit="cover"
                                priority
                            />
                        </div>
                    ))}
                </Slide>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 w-full gap-5'>
                {SLIDE_IMAGES.map((img) => (
                    <div className="relative w-full h-[150px] md:h-[200px] border border-gray-300 rounded-lg overflow-hidden group" key={img.id}>
                        <Image
                            src={img.url}
                            alt={img.alt}
                            layout="fill"
                            objectFit="cover"
                            priority
                            className='transition-all duration-1500 group-hover:scale-110 cursor-pointer'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HeroImageSlider
