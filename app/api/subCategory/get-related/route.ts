import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import "@/models/mainCategory.model";
import SubCategoryModel from "@/models/subCategory.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const { categoryId, mainCategoryId } = body;

        if (!categoryId || !mainCategoryId) {
            return sendErrorResponse("Category ID and Main Category ID are required", 200);
        }

        const subCategories = await SubCategoryModel.find({
            categoryId,
            mainCategoryId
        })
            .populate("categoryInfo", "-_id")
            .populate("mainCategoryInfo", "-_id")
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Sub Categories fetched successfully", { subCategories });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
