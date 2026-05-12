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