import { connectDB } from "@/lib/mongodb";

import CategoryModel from "@/models/category.model";

import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/services/apiResponse";

export async function POST(req: Request) {
    try {
        await connectDB();

        // ✅ GET BODY
        const body = await req.json();

        const query = body.q || "";

        // ✅ IF EMPTY → RETURN ALL
        if (!query.trim()) {

            const categories =
                await CategoryModel.find()
                    .select(
                        "-_id -__v -createdDate -updatedDate"
                    );

            return sendSuccessResponse(
                "Categories fetched successfully",
                { categories }
            );
        }

        // ✅ REGEX SEARCH
        const regex = new RegExp(query, "i");

        // ✅ SEARCH
        const categories =
            await CategoryModel.find({
                $or: [
                    { name: regex },
                    { description: regex },
                ],
            })
                .select(
                    "-_id -__v -createdDate -updatedDate"
                );

        return sendSuccessResponse(
            "Category search successful",
            {
                categories,
            }
        );

    } catch (error) {

        console.error(
            "CATEGORY_SEARCH_ERROR:",
            error
        );

        return sendErrorResponse(
            "Server error",
            500
        );
    }
}