import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import MainCategoryModel from "@/models/mainCategory.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));

        const { page, limit } = body;

        const totalMainCategories = await MainCategoryModel.countDocuments();
        // when page and limit are passed
        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalMainCategories / limit);

            const mainCategories = await MainCategoryModel.find()
                .select("-_id -__v -createdDate -updatedDate")
                .populate("categoryInfo", "-_id")
                .sort({ id: 1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse(
                "Main categories fetched successfully",
                {
                    page,
                    limit,
                    totalPages,
                    totalMainCategories,
                    mainCategories,
                }
            );
        }

        const mainCategories = await MainCategoryModel.find()
            .populate("categoryInfo", "-_id")
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Main Categories fetched successfully", { mainCategories });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
