import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import MainCategoryModel from "@/models/mainCategory.model";

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

        // ✅ EMPTY QUERY → RETURN ALL
        if (!query.trim()) {

            const mainCategories =
                await MainCategoryModel.find()
                    .populate("categoryInfo", "-_id")
                    .select(
                        "-_id -__v -createdDate -updatedDate"
                    );

            return sendSuccessResponse(
                "Main Categories fetched successfully",
                { mainCategories }
            );
        }

        const regex = new RegExp(query, "i");

        // ✅ SEARCH
        const mainCategories =
            await MainCategoryModel.find({
                $or: [
                    { name: regex },
                    { description: regex },
                ],
            })
                .populate({
                    path: "categoryInfo",
                    match: {
                        name: regex,
                    },
                    select: "-_id",
                })
                .select(
                    "-_id -__v -createdDate -updatedDate"
                );

        // ✅ FILTER RESULTS
        const filteredMainCategories =
            mainCategories.filter((item: any) => {
                return (
                    item.categoryInfo ||
                    regex.test(item.name) ||
                    regex.test(item.description || "")
                );
            });

        return sendSuccessResponse(
            "Main Category search successful",
            {
                mainCategories:
                    filteredMainCategories,
            }
        );

    } catch (error) {

        console.error(
            "MAIN_CATEGORY_SEARCH_ERROR:",
            error
        );

        return sendErrorResponse(
            "Server error",
            500
        );
    }
}