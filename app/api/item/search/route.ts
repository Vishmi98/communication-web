import { connectDB } from "@/lib/mongodb";
import "@/models/category.model";
import "@/models/mainCategory.model";
import "@/models/subCategory.model";
import ItemModel from "@/models/item.model";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/services/apiResponse";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const query = body?.q || "";

        if (!query.trim()) {
            return sendSuccessResponse("No search query provided", {
                items: [],
            });
        }

        const regex = new RegExp(query, "i");

        const items = await ItemModel.find({
            $or: [
                { name: regex },
                { description: regex },
                { brand: regex },
                { model: regex },
            ],
            isPublished: true
        })
            .populate({
                path: "categoryInfo",
                match: { name: regex },
            })
            .populate({
                path: "mainCategoryInfo",
                match: { name: regex },
            })
            .populate({
                path: "subCategoryInfo",
                match: { name: regex },
            })
            .select("-_id -__v");

        // remove invalid populated results
        const filteredItems = items.filter((item: any) => {
            return (
                item.categoryInfo ||
                item.mainCategoryInfo ||
                item.subCategoryInfo ||
                regex.test(item.name) ||
                regex.test(item.description) ||
                regex.test(item.brand || "") ||
                regex.test(item.model || "")
            );
        });

        return sendSuccessResponse("Search successful", {
            items: filteredItems,
        });
    } catch (error) {
        console.error("SEARCH_ERROR:", error);
        return sendErrorResponse("Server error", 500);
    }
}