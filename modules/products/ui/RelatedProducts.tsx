"use client"

import React, { useState } from 'react'

import { DealCardType } from '@/modules/homePage/homePage.types';
import useCartStore from '@/store/cartStore';
import { BEST_SELLERS } from '@/constants/data';
import BestSellerCard from '@/modules/homePage/ui/bestSellers/BestSellerCard';
import CartToast from '@/modules/cart/ui/CartToast';


const RelatedProducts = () => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [toastConfig, setToastConfig] = useState({
        show: false,
        itemName: "",
        quantity: 1,
    });

    const handleAddToCart = (card: DealCardType) => {
        addToCart({
            id: card.id,
            title: card.title,
            price: card.price,
            image: card.image,
            rate: card.rate,
            quantity: 1,
        });

        setToastConfig({
            show: true,
            itemName: card.title,
            quantity: 1,
        });

        setTimeout(() => {
            setToastConfig((prev) => ({
                ...prev,
                show: false,
            }));
        }, 2500);
    };

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {BEST_SELLERS.map((item) => (
                    <BestSellerCard
                        key={item.id}
                        card={item}
                        onAdd={() => handleAddToCart(item)}
                    />
                ))}
            </div>
            <div className='flex items-end'>
                <CartToast
                    show={toastConfig.show}
                    itemName={toastConfig.itemName}
                    quantity={toastConfig.quantity}
                />
            </div>
        </>
    )
}

export default RelatedProducts