import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        categoryId: { type: Number, required: true },
        mainCategoryId: { type: Number, required: true },
        name: { type: String, required: true },
        imagePath: {
            type: String,
            required: true
        },
        imageId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

SubCategorySchema.virtual("categoryInfo", {
    ref: "Category",
    localField: "categoryId",
    foreignField: "id",
    justOne: true,
});

SubCategorySchema.virtual("mainCategoryInfo", {
    ref: "MainCategory",
    localField: "mainCategoryId",
    foreignField: "id",
    justOne: true,
});

SubCategorySchema.set('toObject', { virtuals: true });
SubCategorySchema.set('toJSON', { virtuals: true });

const SubCategoryModel = mongoose.models.SubCategory || mongoose.model("SubCategory", SubCategorySchema);

export default SubCategoryModel;
