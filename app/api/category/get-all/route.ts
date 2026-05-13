import { connectDB } from "@/lib/mongodb";
import CategoryModel from "@/models/category.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function GET() {
    try {
        await connectDB();

        const categories = await CategoryModel.find()
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Categories fetched successfully", { categories });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
