import { CategoriesResponseDataType, CategoriesResponseType, ItemDataResponseType, ItemResponseType, ItemsResponseDataType, ItemsResponseType, MainCategoriesResponseDataType, MainCategoriesResponseType, SubCategoriesResponseDataType, SubCategoriesResponseType } from "./products.types";

import { URL } from "@/constants/config";
import apiCall from "@/services/api.services";


export const getItems = async (): Promise<ItemsResponseDataType> => {
    const response: ItemsResponseType = await apiCall({
        url: `${URL}/item/get-all`,
        method: 'GET',
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        items: data.items || [],
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
        method: 'GET',
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        categories: data.categories || [],
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
        method: 'GET',
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        mainCategories: data.mainCategories || [],
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