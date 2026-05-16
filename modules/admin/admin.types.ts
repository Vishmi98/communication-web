import { OrderDataType } from "../cart/cart.types";

export type TableOrdersResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalOrders: number;
    orders: OrderDataType[];
}

export type TableOrdersResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalOrders: number;
        orders: OrderDataType[];
    }
}

export type UpdateOrderStatusResponseDataType = {
    success: boolean;
    message: string;
    data: OrderDataType
}


