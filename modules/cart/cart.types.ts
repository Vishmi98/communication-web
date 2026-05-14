export interface CartItemDataType {
    id: string | number;
    image?: string;
    title: string;
    price: number;
    rate: number;
    quantity: number;
    color?: string; // ✅ ADD COLOR

}

export type OrderItemType = {
    id: number;
    name: string;
    quantity: number;
    color: string;
    mainImagePath: string;
    price: number;
};

export type OrderDataType = {
    id: number;
    customer: CustomerType;
    items: OrderItemType[];
    totalAmount: number;
    deliveryFee: number;
    paymentMethod: string;
    isPaid: boolean;
    status: string;
    note: string;
    estimatedDeliveryTime: string;
    createdAt: string;
    updatedAt: string;
};

export type CustomerType = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
};

export type OrderType = {
    customer: CustomerType;
    items: OrderItemType[];
    paymentMethod: string;
    note: string;
    totalAmount: number;
    deliveryFee: number;
};

export type CreateOrderResponseDataType = {
    success: boolean;
    message: string;
    order: {
        id: number;
    };
};

export type CreateOrderResponseType = {
    success: boolean;
    message: string;
    data: OrderDataType;
};

export type OrderResponseType = {
    success: boolean;
    message: string;
    data: OrderDataType;
};

export type OrderDataResponseType = {
    success: boolean;
    message: string;
    order: OrderDataType;
};

export type OrdersResponseType = {
    success: boolean;
    message: string;
    data: OrderDataType[];
};

export type OrdersDataResponseType = {
    success: boolean;
    message: string;
    orders: OrderDataType[];
};
