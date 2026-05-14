import { SearchCategoryDataResponseType, SearchCategoryResponseType, SearchItemsDataResponseType, SearchItemsResponseType, SearchMainCategoryDataResponseType, SearchMainCategoryResponseType, SearchSubCategoryDataResponseType, SearchSubCategoryResponseType } from "./homePage.types";

import { URL } from "@/constants/config";
import apiCall from "@/services/api.services";


export const searchItems = async (query: string): Promise<SearchItemsResponseType> => {
    const response: SearchItemsDataResponseType = await apiCall({
        url: `${URL}/item/search`,
        method: 'POST',
        body: { q: query },
    })

    return {
        success: response.success,
        message: response.message,
        items: response.data?.items || [],
    };
};

export const searchSubCategories = async (query: string): Promise<SearchSubCategoryResponseType> => {
    const response: SearchSubCategoryDataResponseType = await apiCall({
        url: `${URL}/subCategory/search`,
        method: 'POST',
        body: { q: query },
    })

    return {
        success: response.success,
        message: response.message,
        subCategories: response.data?.subCategories || [],
    };
};

export const searchMainCategories = async (query: string): Promise<SearchMainCategoryResponseType> => {
    const response: SearchMainCategoryDataResponseType = await apiCall({
        url: `${URL}/mainCategory/search`,
        method: 'POST',
        body: { q: query },
    })

    return {
        success: response.success,
        message: response.message,
        mainCategories: response.data?.mainCategories || [],
    };
};

export const searchCategories = async (query: string): Promise<SearchCategoryResponseType> => {
    const response: SearchCategoryDataResponseType = await apiCall({
        url: `${URL}/category/search`,
        method: 'POST',
        body: { q: query },
    })

    return {
        success: response.success,
        message: response.message,
        categories: response.data?.categories || [],
    };
};