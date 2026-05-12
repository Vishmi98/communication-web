import React from 'react'

import PopularCategoriesSlider from './PopularCategoriesSlider'


const PopularCategories = () => {
    return (
        <div className='w-full gap-10 flex flex-col items-center justify-center pb-10'>
            <h1 className='text-xl md:text-2xl font-semibold'>Popular Categories</h1>
            <div className='w-full'>
                <PopularCategoriesSlider />
            </div>
        </div>
    )
}

export default PopularCategories
