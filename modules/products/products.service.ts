import { CategoriesResponseDataType, CategoriesResponseType, CreateCategoryResponseDataType, CreateMainCategoryResponseDataType, ItemDataResponseType, ItemResponseType, ItemsResponseDataType, ItemsResponseType, MainCategoriesResponseDataType, MainCategoriesResponseType, PublishItemResponseDataType, SubCategoriesResponseDataType, SubCategoriesResponseType, TableCategoriesResponseDataType, TableCategoriesResponseType, TableItemsResponseDataType, TableItemsResponseType, TableMainCategoriesResponseDataType, TableMainCategoriesResponseType, TableSubCategoriesResponseDataType, TableSubCategoriesResponseType } from "./products.types";

import { URL } from "@/constants/config";
import apiCall from "@/services/api.services";
import axios from "axios";


export const getItems = async (): Promise<ItemsResponseDataType> => {
    const response: ItemsResponseType = await apiCall({
        url: `${URL}/item/get-all`,
        method: 'POST',
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        items: data.items || [],
    };
};

export const getItemsData = async (page?: number, limit?: number): Promise<TableItemsResponseDataType> => {
    const response: TableItemsResponseType = await apiCall({
        url: `${URL}/item/get-all`,
        method: 'POST',
        body: { page, limit: limit || 10 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        items: data.items || [],
        page: data.page ?? 1,
        limit: data.limit ?? 10,
        totalPages: data.totalPages ?? 0,
        totalItems: data.totalItems ?? 0,
    };
};

export const getRelatedItems = async (category: number, mainCategory: number, subCategory: number): Promise<ItemsResponseDataType> => {
    const response: ItemsResponseType = await apiCall({
        url: `${URL}/item/get-related`,
        method: 'POST',
        body: {
            category,
            mainCategory,
            subCategory
        }
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        items: data.items || [],
    };
};

export const getCategories = async (): Promise<CategoriesResponseDataType> => {
    const response: CategoriesResponseType = await apiCall({
        url: `${URL}/category/get-all`,
        method: 'POST',
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        categories: data.categories || [],
    };
};

export const getCategoriesData = async (page?: number, limit?: number): Promise<TableCategoriesResponseDataType> => {
    const response: TableCategoriesResponseType = await apiCall({
        url: `${URL}/category/get-all`,
        method: 'POST',
        body: { page, limit: limit || 10 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        categories: data.categories || [],
        page: data.page ?? 1,
        limit: data.limit ?? 10,
        totalPages: data.totalPages ?? 0,
        totalCategories: data.totalCategories ?? 0,
    };
};

export const getMainCategories = async (categoryId: number): Promise<MainCategoriesResponseDataType> => {
    const response: MainCategoriesResponseType = await apiCall({
        url: `${URL}/mainCategory/get-by-categoryId`,
        method: 'POST',
        body: {
            categoryId,
        },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        mainCategories: data.mainCategories || [],
    };
};

export const getAllMainCategories = async (): Promise<MainCategoriesResponseDataType> => {
    const response: MainCategoriesResponseType = await apiCall({
        url: `${URL}/mainCategory/get-all`,
        method: 'POST',
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        mainCategories: data.mainCategories || [],
    };
};

export const getMainCategoriesData = async (page?: number, limit?: number): Promise<TableMainCategoriesResponseDataType> => {
    const response: TableMainCategoriesResponseType = await apiCall({
        url: `${URL}/mainCategory/get-all`,
        method: 'POST',
        body: { page, limit: limit || 10 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        mainCategories: data.mainCategories || [],
        page: data.page ?? 1,
        limit: data.limit ?? 10,
        totalPages: data.totalPages ?? 0,
        totalMainCategories: data.totalMainCategories ?? 0,
    };
};

export const getSubCategories = async (categoryId: number, mainCategoryId: number): Promise<SubCategoriesResponseDataType> => {
    const response: SubCategoriesResponseType = await apiCall({
        url: `${URL}/subCategory/get-related`,
        method: 'POST',
        body: {
            categoryId,
            mainCategoryId,
        },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        subCategories: data.subCategories || [],
    };
};

export const getSubCategoriesData = async (page?: number, limit?: number): Promise<TableSubCategoriesResponseDataType> => {
    const response: TableSubCategoriesResponseType = await apiCall({
        url: `${URL}/subCategory/get-all`,
        method: 'POST',
        body: { page, limit: limit || 10 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        subCategories: data.subCategories || [],
        page: data.page ?? 1,
        limit: data.limit ?? 10,
        totalPages: data.totalPages ?? 0,
        totalSubCategories: data.totalSubCategories ?? 0,
    };
};

export const getItemById = async (props: {
    id: number;
}): Promise<ItemDataResponseType> => {
    const { id } = props;

    const response: ItemResponseType = await apiCall({
        url: `${URL}/item/by-id`,
        method: "POST",
        body: { id },
    });

    return {
        success: response.success,
        message: response.message,
        item: response.data?.item || null,
    };
};

export const createItem = async (data: FormData) => {
    const res = await axios.post(`${URL}/item/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            newItem: response.data,
        },
    };
};

export const createCategory = async (name: string): Promise<CreateCategoryResponseDataType> => {
    const response: CreateCategoryResponseDataType = await apiCall({
        url: `${URL}/category/create`,
        method: "POST",
        body: { name },
    });

    return {
        success: response.success,
        message: response.message,
        data: {
            category: response.data.category,
        },
    };
};

export const createMainCategory = async (data: FormData) => {
    const res = await axios.post(`${URL}/mainCategory/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            mainCategory: response.data,
        },
    };
}

export const createSubCategory = async (data: FormData) => {
    const res = await axios.post(`${URL}/subCategory/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            subCategory: response.data,
        },
    };
}

export const addImages = async (data: FormData) => {
    const res = await axios.post(`${URL}/item/add-images`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            updatedItem: response.data,
        },
    };
};

export const addColors = async (data: FormData) => {
    const res = await axios.post(`${URL}/item/add-colors`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            updatedItem: response.data,
        },
    };
};

export const updateItem = async (data: FormData) => {
    const res = await axios.post(`${URL}/item/update`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            updatedItem: response.data,
        },
    };
};

export const deleteColor = async (data: FormData) => {
    const res = await axios.post(`${URL}/item/delete-color`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            updatedItem: response.data,
        },
    };
};

export const deleteImage = async (data: FormData) => {
    const res = await axios.post(`${URL}/item/delete-image`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            updatedItem: response.data,
        },
    };
};

export const publishItem = async (id: number, isPublish: boolean): Promise<PublishItemResponseDataType> => {
    const response: PublishItemResponseDataType = await apiCall({
        url: `${URL}/item/publish`,
        method: 'POST',
        body: { id, isPublish },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};