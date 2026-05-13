import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import MainCategoryModel from "@/models/mainCategory.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const { categoryId } = body;

        if (!categoryId) {
            return sendErrorResponse("Category ID is required", 200);
        }

        const mainCategories = await MainCategoryModel.find({ categoryId })
            .populate("categoryInfo", "-_id")
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Main Categories fetched successfully", { mainCategories });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
