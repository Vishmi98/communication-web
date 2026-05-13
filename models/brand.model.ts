import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const BrandModel = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

export default BrandModel;
