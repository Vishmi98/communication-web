import * as Yup from 'yup';

import { CategoryDataType, ItemType, MainCategoryType, SingleColorFormValues, SubCategoryType } from "./products.types";


export const itemInitialValues: ItemType = {
    id: 0,
    name: '',
    description: '',
    price: "",
    newPrice: "",
    mainImagePath: '',
    mainImageId: '',
    category: 0,
    mainCategory: 0,
    subCategory: 0,
    brand: '',
    model: '',
    rating: 0,
    reviews: 0,
    colors: [
        {
            id: 0,
            name: '',
            hexCode: '',
            imagePath: '',
            imageId: '',
        }
    ],
    imagePaths: [],
    imageIds: [],
    isPublished: false,
}

export const itemValidationSchema = Yup.object({
    name: Yup.string().required('Name is required').max(200, 'Name must be less than 200 characters').min(3, 'Name must be at least 3 characters'),
    description: Yup.string().required('Description is required').max(400, 'Description must be less than 400 characters').min(10, 'Description must be at least 10 characters'),
    price: Yup.number().required('Price is required').min(0, 'Price must be greater than 0'),
    mainImagePath: Yup.string(),
    mainImageId: Yup.string(),
    category: Yup.number().required('Category is required'),
    mainCategory: Yup.number().required('Main category is required'),
    subCategory: Yup.number().required('Sub category is required'),
    brand: Yup.string(),
    model: Yup.string(),
    rating: Yup.number(),
    reviews: Yup.number(),
    colors: Yup.array().of(
        Yup.object({
            name: Yup.string(),
            hexCode: Yup.string(),
            imagePath: Yup.string(),
            imageId: Yup.string(),
        })
    ),
})


export const categoryInitialValues: CategoryDataType = {
    id: 0,
    name: "",
};

export const categoryValidationSchema = Yup.object({
    name: Yup.string()
        .required("Category name is required")
        .min(3, "Category name must be at least 3 characters")
        .max(50, "Category name cannot exceed 50 characters"),
});

export const mainCategoryInitialValues: MainCategoryType = {
    id: 0,
    name: "",
    categoryId: 0,
    imagePath: "",
    imageId: "",
}

export const mainCategoryValidationSchema = Yup.object({
    name: Yup.string()
        .required("Main category name is required")
        .min(3, "Main category name must be at least 3 characters")
        .max(50, "Main category name cannot exceed 50 characters"),
    categoryId: Yup.number().required("Category is required"),
    imagePath: Yup.string(),
    imageId: Yup.string(),
})

export const subCategoryInitialValues: SubCategoryType = {
    id: 0,
    name: "",
    categoryId: 0,
    mainCategoryId: 0,
    imagePath: "",
    imageId: "",
}

export const subCategoryValidationSchema = Yup.object({
    name: Yup.string()
        .required("Sub category name is required")
        .min(3, "Sub category name must be at least 3 characters")
        .max(50, "Sub category name cannot exceed 50 characters"),
    categoryId: Yup.number().required("Category is required"),
    mainCategoryId: Yup.number().required("Main category is required"),
    imagePath: Yup.string(),
    imageId: Yup.string(),
})

export const colorInitialValues: SingleColorFormValues = {
    name: "",
    hexCode: "#000000",
    file: null,
    previewUrl: "",
}

export const colorValidationSchema = Yup.object().shape({
    name: Yup.string().required("Color title string required"),
    hexCode: Yup.string()
        .required("Hex code required")
        .matches(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be valid CSS hex format"),
    file: Yup.mixed().required("Variant reference file attachment image required"),
});