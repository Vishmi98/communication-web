import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

import { StarRatingProps } from '@/constants/types';


const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => {
                if (index < fullStars) {
                    return (
                        <FaStar key={index} className="w-3 h-3 text-secondary" />
                    );
                } else if (index === fullStars && hasHalfStar) {
                    return (
                        <FaStarHalf key={index} className="w-3 h-3 text-secondary" />
                    );
                } else {
                    return (
                        null
                    );
                }
            })}
        </div>
    );
};

export default StarRating;
