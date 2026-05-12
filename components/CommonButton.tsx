import React from 'react';

import { CommonButtonProps } from '@/constants/types';


const CommonButton: React.FC<CommonButtonProps> = ({
    title,
    onPress,
    backgroundColor = 'bg-primary',
    textColor = 'text-white',
    shadowColor = '#ccc', // ✅ default soft shadow
    className = '',
    textClassName = '',
    disabled = false,
    loading = false,
    type = "button"
}) => {
    return (
        <button
            type={type}
            onClick={onPress}
            disabled={disabled || loading}
            style={{
                boxShadow: shadowColor
                    ? `0 2px 5px ${shadowColor}, 0 1px 2px ${shadowColor}`
                    : 'none',
            }}
            className={`
                ${backgroundColor}
                ${textColor}
                px-4 py-2
                rounded-[8px]
                flex items-center justify-center
                transition-all duration-200
                active:scale-95 cursor-pointer hover:brightness-95
                disabled:opacity-50 disabled:cursor-not-allowed w-full
                ${className}
            `}
        >
            {loading ? (
                <svg
                    className="animate-spin h-5 w-5 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 
                        0 0 5.373 0 12h4zm2 
                        5.291A7.962 7.962 0 
                        014 12H0c0 3.042 
                        1.135 5.824 3 
                        7.938l3-2.647z"
                    />
                </svg>
            ) : (
                <span className={`text-base font-semibold ${textClassName}`}>
                    {title}
                </span>
            )}
        </button>
    );
};

export default CommonButton;