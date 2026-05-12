"use client"

import React, { useState } from 'react'

import ItemCard from './ItemCard';

import { PRODUCTS } from '@/constants/data';


const AllProducts = () => {
    const [showAll, setShowAll] = useState(false);

    const displayedItems = showAll ? PRODUCTS : PRODUCTS.slice(0, 8);

    return (
        <div className='w-full gap-10 flex flex-col items-center justify-center pb-10'>
            <h1 className='text-xl md:text-2xl font-semibold'>More to love</h1>
            <div className="flex flex-col md:flex-row items-center justify-center w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center w-full">
                    {displayedItems.map((card) => (
                        <div key={card.id} className="w-full">
                            <ItemCard card={card} />
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={() => setShowAll(!showAll)}
                className="mt-5 border border-black text-black px-4 py-2 rounded hover:border-none hover:bg-primary hover:text-white transition"
            >
                {showAll ? 'Show Less' : 'View All'}
            </button>
        </div>
    )
}

export default AllProducts
