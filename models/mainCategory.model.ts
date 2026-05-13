import mongoose from "mongoose";

const MainCategorySchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        categoryId: { type: Number, required: true },
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

MainCategorySchema.virtual("categoryInfo", {
    ref: "Category",
    localField: "categoryId",
    foreignField: "id",
    justOne: true,
});

MainCategorySchema.set('toObject', { virtuals: true });
MainCategorySchema.set('toJSON', { virtuals: true });

const MainCategoryModel = mongoose.models.MainCategory || mongoose.model("MainCategory", MainCategorySchema);

export default MainCategoryModel;
