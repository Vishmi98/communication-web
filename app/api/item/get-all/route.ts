import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import "@/models/mainCategory.model";
import "@/models/subCategory.model";

import ItemModel from "@/models/item.model";

import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));

        const { page, limit } = body;

        const totalItems = await ItemModel.countDocuments();

        // when page and limit are passed
        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalItems / limit);

            const items = await ItemModel.find()
                .populate("categoryInfo", "-_id")
                .populate("mainCategoryInfo", "-_id")
                .populate("subCategoryInfo", "-_id")
                .select("-_id -__v -createdAt -updatedAt")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse(
                "Items fetched successfully",
                {
                    page,
                    limit,
                    totalPages,
                    totalItems,
                    items,
                }
            );
        }

        // when page and limit are NOT passed
        const items = await ItemModel.find({ isPublished: true })
            .populate("categoryInfo", "-_id")
            .populate("mainCategoryInfo", "-_id")
            .populate("subCategoryInfo", "-_id")
            .select("-_id -__v -createdAt -updatedAt")
            .sort({ createdAt: -1 })
            .lean();

        return sendSuccessResponse(
            "Items fetched successfully",
            { items }
        );

    } catch (error) {
        console.error("Error:", error);

        return sendErrorResponse("Server error", 200);
    }
}