import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import MainCategoryModel from "@/models/mainCategory.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function GET() {
    try {
        await connectDB();

        const mainCategories = await MainCategoryModel.find()
            .populate("categoryInfo", "-_id")
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Main Categories fetched successfully", { mainCategories });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
