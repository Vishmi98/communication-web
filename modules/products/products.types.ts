export type ColorDataType = {
    id: number,
    name: string,
    hexCode: string,
    imagePath: string,
    imageId: string,
}

export type ItemType = {
    id: number;
    name: string;
    description: string;
    price: number | string;
    newPrice: number | string;
    mainImagePath: string;
    mainImageId: string;
    category: number;
    mainCategory: number;
    subCategory: number;
    brand: string;
    model: string;
    rating: number;
    reviews: number;
    colors: ColorDataType[];
    imagePaths: string[];
    imageIds: string[];
    isPublished: boolean;
}

export type ItemDataType = {
    id: number;
    name: string;
    description: string;
    price: number;
    newPrice: number;
    mainImagePath: string;
    mainImageId: string;
    category: number;
    mainCategory: number;
    subCategory: number;
    brand: string;
    model: string;
    rating: number;
    reviews: number;
    colors: ColorDataType[];
    imagePaths: string[];
    imageIds: string[];
    categoryInfo: CategoryDataType;
    mainCategoryInfo: MainCategoryDataType;
    subCategoryInfo: SubCategoryDataType;
    isPublished: boolean;
}

export type CategoryDataType = {
    id: number;
    name: string;
}

export type MainCategoryDataType = {
    id: number;
    categoryId: number;
    categoryInfo: CategoryDataType;
    name: string;
    imagePath: string;
    imageId: string;
}

export type SubCategoryDataType = {
    id: number;
    categoryId: number;
    mainCategoryId: number;
    categoryInfo: CategoryDataType;
    mainCategoryInfo: MainCategoryDataType;
    name: string;
    imagePath: string;
    imageId: string;
}

export type MainCategoryType = {
    id: number;
    categoryId: number;
    name: string;
    imagePath: string;
    imageId: string;
}

export type SubCategoryType = {
    id: number;
    categoryId: number;
    mainCategoryId: number;
    name: string;
    imagePath: string;
    imageId: string;
}

export type ItemsResponseDataType = {
    success: boolean;
    message: string;
    items: ItemDataType[];
}

export type ItemsResponseType = {
    success: boolean;
    message: string;
    data: {
        items: ItemDataType[];
    }
}

export type CategoriesResponseDataType = {
    success: boolean;
    message: string;
    categories: CategoryDataType[];
}

export type CategoriesResponseType = {
    success: boolean;
    message: string;
    data: {
        categories: CategoryDataType[];
    }
}

export type MainCategoriesResponseDataType = {
    success: boolean;
    message: string;
    mainCategories: MainCategoryDataType[];
}

export type MainCategoriesResponseType = {
    success: boolean;
    message: string;
    data: {
        mainCategories: MainCategoryDataType[];
    }
}

export type SubCategoriesResponseDataType = {
    success: boolean;
    message: string;
    subCategories: SubCategoryDataType[];
}

export type SubCategoriesResponseType = {
    success: boolean;
    message: string;
    data: {
        subCategories: SubCategoryDataType[];
    }
}

export type ItemResponseType = {
    success: boolean;
    message: string;
    data: {
        item: ItemDataType | null;
    }
};

export type ItemDataResponseType = {
    success: boolean;
    message: string;
    item: ItemDataType | null;
};

export type TableItemsResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
    items: ItemDataType[];
}

export type TableItemsResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalItems: number;
        items: ItemDataType[];
    }
}

export type TableCategoriesResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalCategories: number;
    categories: CategoryDataType[];
}

export type TableCategoriesResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalCategories: number;
        categories: CategoryDataType[];
    }
}

export interface CreateCategoryResponseDataType {
    success: boolean;
    message: string;
    data: {
        category: CategoryDataType;
    };
}

export type TableMainCategoriesResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalMainCategories: number;
    mainCategories: MainCategoryDataType[];
}

export type TableMainCategoriesResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalMainCategories: number;
        mainCategories: MainCategoryDataType[];
    }
}

export interface CreateMainCategoryResponseDataType {
    success: boolean;
    message: string;
    data: {
        mainCategory: MainCategoryType;
    };
}

export type TableSubCategoriesResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalSubCategories: number;
    subCategories: SubCategoryDataType[];
}

export type TableSubCategoriesResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalSubCategories: number;
        subCategories: SubCategoryDataType[];
    }
}

export interface SingleColorFormValues {
    name: string;
    hexCode: string;
    file: File | null;
    previewUrl: string;
}

export interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ItemDataType;
    handleReload: () => void;
}

export interface EditItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialValues: ItemType | null;
    handleReload: () => void;
}

export type PublishItemResponseDataType = {
    success: boolean;
    message: string;
    data: ItemType;
}
