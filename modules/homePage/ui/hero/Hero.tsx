import React from 'react'

import Sidebar from './Sidebar'
import HeroImageSlider from './HeroImageSlider'


const Hero = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-5">
            <div className="hidden md:flex md:col-span-2">
                <Sidebar />
            </div>
            <div className="md:col-span-5">
                <HeroImageSlider />
            </div>
        </div>
    )
}

export default Hero
