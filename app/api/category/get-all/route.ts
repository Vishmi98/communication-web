import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import CategoryModel from "@/models/category.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));

        const { page, limit } = body;

        const totalCategories = await CategoryModel.countDocuments();
        // when page and limit are passed
        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalCategories / limit);

            const categories = await CategoryModel.find()
                .select("-_id -__v -createdDate -updatedDate")
                .sort({ id: 1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse(
                "Categories fetched successfully",
                {
                    page,
                    limit,
                    totalPages,
                    totalCategories,
                    categories,
                }
            );
        }

        const categories = await CategoryModel.find()
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Categories fetched successfully", { categories });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
