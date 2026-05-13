import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const CategoryModel = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default CategoryModel;
