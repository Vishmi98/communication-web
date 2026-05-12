import React from 'react'
import { RiShoppingBag4Fill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import { TbBrandSketchFilled, TbClockFilled } from 'react-icons/tb'

import BestSellersSlider from './bestSellers/BestSellersSlider'
import SuperDealsSlider from './superDeals/SuperDealsSlider'
import BigSaveSlider from './bigSave/BigSaveSlider'


const TodayDeals = () => {
    return (
        <div className='w-full gap-10 flex flex-col items-center justify-center pb-10'>
            <h1 className='text-xl md:text-2xl font-semibold'>Today&apos;s Deals</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-5'>
                <div className='border border-gray-300 p-2 flex flex-col gap-5 items-center justify-start'>
                    <h3>Best Sellers</h3>
                    <div className='bg-yellow-300/30 p-2 rounded-full flex items-center justify-center gap-2'>
                        <RiShoppingBag4Fill size={20} className='text-yellow-500' />
                        <p className='text-sm font-medium'>
                            Top price & quality picks
                        </p>
                        <IoIosArrowForward />
                    </div>
                    <div className='w-full'>
                        <BestSellersSlider />
                    </div>
                </div>
                <div className='border border-gray-300 p-2 flex flex-col gap-5 items-center justify-start'>
                    <h3>Super Deals</h3>
                    <div className='bg-pink-600/30 p-2 rounded-full flex items-center justify-center gap-2'>
                        <TbClockFilled size={20} className='text-pink-600' />
                        <p className='text-sm font-medium'>
                            Up to 70% off
                        </p>
                        <IoIosArrowForward />
                    </div>
                    <div className='w-full'>
                        <SuperDealsSlider />
                    </div>
                </div>
                <div className='border border-gray-300 p-2 flex flex-col gap-5 items-center justify-start'>
                    <h3>Big Save</h3>
                    <div className='bg-[#F57224]/30 p-2 rounded-full flex items-center justify-center gap-2'>
                        <TbBrandSketchFilled size={20} className='text-secondary' />
                        <p className='text-sm font-medium'>
                            500+ Brands
                        </p>
                        <IoIosArrowForward />
                    </div>
                    <div className='w-full'>
                        <BigSaveSlider />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodayDeals
