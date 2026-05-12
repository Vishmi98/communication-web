import React from 'react'
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';

import { DealCardType } from '../../homePage.types';


const BestSellerCard = ({ card, onAdd }: { card: DealCardType, onAdd: () => void }) => {
    const { image, title, price, rate } = card;

    return (
        <div className="group flex flex-col gap-5 items-center justify-center mx-5">
            {/* Image */}
            <div className="relative h-[150px] w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                />

                {/* Hover Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <button onClick={onAdd} className="bg-primary text-white px-5 py-2 text-sm font-medium rounded-md hover:bg-primary/90 transition-all duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className='text-start w-full'>
                <p className='capitalize font-medium text-sm line-clamp-2'>
                    {title}
                </p>

                <p className='text-lg font-semibold text-primary'>
                    LKR {price.toLocaleString('en-US')}
                </p>

                <p className='flex items-center text-xs gap-2'>
                    <FaStar size={14} className='text-yellow-400' />
                    {rate}
                </p>

                <p className='text-xs text-gray-400'>
                    100K sold
                </p>
            </div>
            <button
                type="button"
                onClick={onAdd}
                className="
                bg-primary text-white px-3 py-2 rounded-full text-sm md:text-base
                cursor-pointer font-medium w-2/3 z-10 block md:hidden"
            >
                Add to Cart
            </button>
        </div>
    )
}

export default BestSellerCard