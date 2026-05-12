import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from 'react-icons/md';

import { ItemProps } from '../homePage.types';

import StarRating from '@/components/StarRatings';


const ItemCard: React.FC<ItemProps> = ({ card }) => {
    return (
        <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-l transition duration-300 bg-white overflow-hidden">
            <div className="w-full h-52 relative group">
                <Image
                    src={card.image}
                    alt={card.itemName}
                    fill
                    className="object-cover cursor-pointer transition-all duration-1500 group-hover:scale-110 rounded-t-lg"
                />
                <FaRegHeart className='absolute top-2 left-2' />
                <MdOutlineShoppingCart className='absolute bottom-2 right-2 p-1 rounded-full bg-white' size={30} />
            </div>
            <div className="p-4 flex flex-col gap-1">
                <Link href="" className="text-base font-semibold text-gray-800 line-clamp-1 cursor-pointer hover:text-primary">{card.itemName}</Link>
                <div className="flex items-center gap-1 text-yellow-500 text-xs">
                    <StarRating rating={card.ratings} />
                    <span className="text-gray-400">({card.soldQuantity} sold)</span>
                </div>
                <div className="text-lg font-bold text-gray-900">${card.price.toLocaleString('en-US')}</div>
                <p className="text-xs text-gray-500 line-clamp-2">{card.description}</p>
            </div>
        </div>
    );
};

export default ItemCard;
