import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import "@/models/mainCategory.model";
import "@/models/subCategory.model";
import ItemModel from "@/models/item.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function GET() {
    try {
        await connectDB();

        const items = await ItemModel.find()
            .populate("categoryInfo", "-_id")
            .populate("mainCategoryInfo", "-_id")
            .populate("subCategoryInfo", "-_id")
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Items fetched successfully", { items });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
