import mongoose from "mongoose";


const ColorSchema = new mongoose.Schema({
    id: Number,
    name: String,
    hexCode: String,
    imagePath: String,
    imageId: String,
});

const ItemSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        newPrice: {
            type: Number
        },
        mainImagePath: {
            type: String,
            required: true
        },
        mainImageId: {
            type: String,
            required: true
        },
        category: {
            type: Number,
            required: true,
        },
        mainCategory: {
            type: Number,
        },
        subCategory: {
            type: Number,
        },
        brand: {
            type: String,
        },
        model: {
            type: String,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        reviews: {
            type: Number,
            default: 0
        },
        colors: {
            type: [ColorSchema]
        },
        imagePaths: {
            type: [String],
        },
        imageIds: {
            type: [String],
        }
    },
    {
        timestamps: true
    }
);

ItemSchema.virtual("categoryInfo", {
    ref: "Category",
    localField: "category",
    foreignField: "id",
    justOne: true,
});

ItemSchema.virtual("mainCategoryInfo", {
    ref: "MainCategory",
    localField: "mainCategory",
    foreignField: "id",
    justOne: true,
});

ItemSchema.virtual("subCategoryInfo", {
    ref: "SubCategory",
    localField: "subCategory",
    foreignField: "id",
    justOne: true,
});

ItemSchema.set('toObject', { virtuals: true });
ItemSchema.set('toJSON', { virtuals: true });

const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export default ItemModel;