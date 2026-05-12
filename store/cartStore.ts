import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: string | number;
    image?: string;
    title: string;
    price: number;
    rate: number;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    cartCount: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string | number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            cartCount: 0,

            addToCart: (item) =>
                set((state) => {
                    const existingItem = state.cart.find(
                        (i) => i.id === item.id
                    );

                    let newCart: CartItem[];

                    if (existingItem) {
                        newCart = state.cart.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        );
                    } else {
                        newCart = [
                            ...state.cart,
                            { ...item, quantity: 1 },
                        ];
                    }

                    return {
                        cart: newCart,
                        cartCount: newCart.reduce(
                            (total, i) => total + i.quantity,
                            0
                        ),
                    };
                }),

            removeFromCart: (id) =>
                set((state) => {
                    const existingItem = state.cart.find(
                        (i) => i.id === id
                    );

                    if (!existingItem) return state;

                    let newCart: CartItem[];

                    if (existingItem.quantity > 1) {
                        newCart = state.cart.map((i) =>
                            i.id === id
                                ? { ...i, quantity: i.quantity - 1 }
                                : i
                        );
                    } else {
                        newCart = state.cart.filter((i) => i.id !== id);
                    }

                    return {
                        cart: newCart,
                        cartCount: newCart.reduce(
                            (total, i) => total + i.quantity,
                            0
                        ),
                    };
                }),

            clearCart: () =>
                set({
                    cart: [],
                    cartCount: 0,
                }),
        }),
        {
            name: "cart-storage",
        }
    )
);

export default useCartStore;