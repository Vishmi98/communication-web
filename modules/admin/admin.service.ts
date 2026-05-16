import { TableOrdersResponseDataType, TableOrdersResponseType, UpdateOrderStatusResponseDataType } from "./admin.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";


export const getOrders = async (page?: number, limit?: number): Promise<TableOrdersResponseDataType> => {
    const response: TableOrdersResponseType = await apiCall({
        url: `${URL}/order/get-all`,
        method: 'POST',
        body: { page, limit: limit || 10 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        orders: data.orders || [],
        page: data.page ?? 1,
        limit: data.limit ?? 10,
        totalPages: data.totalPages ?? 0,
        totalOrders: data.totalOrders ?? 0,
    };
};

export const updateOrderStatus = async (
    id: number,
    status?: string,
    isPaid?: boolean
): Promise<UpdateOrderStatusResponseDataType> => {
    const response: UpdateOrderStatusResponseDataType = await apiCall({
        url: `${URL}/order/update-status`,
        method: 'POST',
        body: { id, status, isPaid },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const addTrackingNumber = async (
    id: number,
    trackingNumber: string,
): Promise<UpdateOrderStatusResponseDataType> => {
    const response: UpdateOrderStatusResponseDataType = await apiCall({
        url: `${URL}/order/add-trackingNumber`,
        method: 'POST',
        body: { id, trackingNumber },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};