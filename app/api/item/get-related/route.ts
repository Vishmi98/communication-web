import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import "@/models/mainCategory.model";
import "@/models/subCategory.model";
import ItemModel from "@/models/item.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const { category, mainCategory, subCategory } = body;

        if (!category || !mainCategory || !subCategory) {
            return sendErrorResponse("Category, Main Category and Sub Category are required", 200);
        }

        const items = await ItemModel.find({
            category,
            mainCategory,
            subCategory,
            isPublished: true
        })
            .populate("categoryInfo", "-_id")
            .populate("mainCategoryInfo", "-_id")
            .populate("subCategoryInfo", "-_id")
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Items fetched successfully", { items });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
