import React from 'react'

import TodayDeals from './TodayDeals'
import AllProducts from './AllProducts'
import Hero from './hero/Hero'
import GiveAway from './giveAway/GiveAway'
import PopularCategories from './popularCategories/PopularCategories'


const Home = () => {
    return (
        <div className='w-[95%] mx-auto space-y-16'>
            <Hero />
            <TodayDeals />
            <GiveAway />
            <PopularCategories />
            <AllProducts />
        </div>
    )
}

export default Home
