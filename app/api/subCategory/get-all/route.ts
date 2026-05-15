import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import "@/models/mainCategory.model";
import SubCategoryModel from "@/models/subCategory.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));

        const { page, limit } = body;

        const totalSubCategories = await SubCategoryModel.countDocuments();
        // when page and limit are passed
        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalSubCategories / limit);

            const subCategories = await SubCategoryModel.find()
                .select("-_id -__v -createdDate -updatedDate")
                .populate("categoryInfo", "-_id")
                .populate("mainCategoryInfo", "-_id")
                .sort({ id: 1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse(
                "Sub categories fetched successfully",
                {
                    page,
                    limit,
                    totalPages,
                    totalSubCategories,
                    subCategories,
                }
            );
        }

        const subCategories = await SubCategoryModel.find()
            .populate("categoryInfo", "-_id")
            .populate("mainCategoryInfo", "-_id")
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Sub Categories fetched successfully", { subCategories });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
