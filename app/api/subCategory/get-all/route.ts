import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import "@/models/mainCategory.model";
import SubCategoryModel from "@/models/subCategory.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function GET() {
    try {
        await connectDB();

        const subCategories = await SubCategoryModel.find()
            .populate("categoryInfo", "-_id")
            .populate("mainCategoryInfo", "-_id")
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Sub Categories fetched successfully", { subCategories });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
