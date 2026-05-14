export type ColorDataType = {
    id: Number,
    name: String,
    hexCode: String,
    imagePath: String,
    imageId: String,
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