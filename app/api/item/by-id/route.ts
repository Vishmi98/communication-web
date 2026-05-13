import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import "@/models/mainCategory.model";
import "@/models/subCategory.model";
import ItemModel from "@/models/item.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id } = body;

        if (!id) {
            return sendErrorResponse("Item ID is required", 200);
        }

        const item = await ItemModel.findOne({ id })
            .populate("categoryInfo", "-_id -__v -createdAt -updatedAt")
            .populate("mainCategoryInfo", "-_id -__v -createdAt -updatedAt")
            .populate("subCategoryInfo", "-_id -__v -createdAt -updatedAt")
            .select("-_id -__v -createdAt -updatedAt")

        if (!item) {
            return sendErrorResponse("Item not found", 200);
        }

        return sendSuccessResponse("Item fetched successfully", { item });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
