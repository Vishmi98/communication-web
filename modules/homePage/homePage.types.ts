import { CategoryDataType, ItemDataType, MainCategoryDataType, SubCategoryDataType } from "../products/products.types";

export interface SubMenuSectionItemType {
    name: string;
    image: string;
}

export interface SubMenuSectionType {
    heading: string;
    image: string;
    items: SubMenuSectionItemType[];
}

export interface SubMenuType {
    title: string;
    sections: SubMenuSectionType[];
}

export interface MenuItemType {
    id: number;
    name: string;
    icon: string;
    image: string;
    subMenu: SubMenuType;
}

export type DealCardType = {
    id: number;
    image: string;
    title: string;
    price: number;
    rate: number;
}

export type CategoryCardType = {
    id: number;
    image: string;
    title: string;
}

export type ProductType = {
    id: number;
    image: string;
    itemName: string;
    price: number;
    ratings: number;
    category: string;
    itemType: string;
    description: string;
    reviews: number;
    soldQuantity: number;
}

export interface ItemProps {
    card: ProductType;
}

export type SearchItemsResponseType = {
    success: boolean;
    message: string;
    items: ItemDataType[]
}

export type SearchItemsDataResponseType = {
    success: boolean;
    message: string;
    data: {
        items: ItemDataType[]
    };
}

export type SearchSubCategoryResponseType = {
    success: boolean;
    message: string;
    subCategories: SubCategoryDataType[]
}

export type SearchSubCategoryDataResponseType = {
    success: boolean;
    message: string;
    data: {
        subCategories: SubCategoryDataType[]
    };
}

export type SearchMainCategoryResponseType = {
    success: boolean;
    message: string;
    mainCategories: MainCategoryDataType[]
}

export type SearchMainCategoryDataResponseType = {
    success: boolean;
    message: string;
    data: {
        mainCategories: MainCategoryDataType[]
    };
}

export type SearchCategoryResponseType = {
    success: boolean;
    message: string;
    categories: CategoryDataType[]
}

export type SearchCategoryDataResponseType = {
    success: boolean;
    message: string;
    data: {
        categories: CategoryDataType[]
    };
}