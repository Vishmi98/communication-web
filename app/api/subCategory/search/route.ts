import { connectDB } from "@/lib/mongodb";

import "@/models/category.model";
import "@/models/mainCategory.model";

import SubCategoryModel from "@/models/subCategory.model";

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

            const subCategories =
                await SubCategoryModel.find()
                    .populate("categoryInfo", "-_id")
                    .populate(
                        "mainCategoryInfo",
                        "-_id"
                    )
                    .select(
                        "-_id -__v -createdDate -updatedDate"
                    );

            return sendSuccessResponse(
                "All Sub Categories",
                {
                    subCategories,
                }
            );
        }

        const regex = new RegExp(query, "i");

        // ✅ SEARCH
        const subCategories =
            await SubCategoryModel.find({
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
                })
                .populate({
                    path: "mainCategoryInfo",
                    match: {
                        name: regex,
                    },
                })
                .select(
                    "-_id -__v -createdDate -updatedDate"
                );

        // ✅ FILTER RESULTS
        const filtered =
            subCategories.filter((item: any) => {
                return (
                    item.categoryInfo ||
                    item.mainCategoryInfo ||
                    regex.test(item.name) ||
                    regex.test(
                        item.description || ""
                    )
                );
            });

        return sendSuccessResponse(
            "Sub Category search successful",
            {
                subCategories: filtered,
            }
        );

    } catch (error) {

        console.error(
            "SUBCATEGORY_SEARCH_ERROR:",
            error
        );

        return sendErrorResponse(
            "Server error",
            500
        );
    }
}