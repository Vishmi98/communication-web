import React from 'react'

import GiveAwaySlider from './GiveAwaySlider'


const GiveAway = () => {
    return (
        <div className='w-full gap-10 flex flex-col items-center justify-center pb-10'>
            <h1 className='text-xl md:text-2xl font-semibold'>FIRST Member Giveaways</h1>
            <div className='w-full'>
                <GiveAwaySlider />
            </div>
        </div>
    )
}

export default GiveAway
