import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import ItemModel from "@/models/item.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, isPublish } = body;

        // Validate input
        if (id === undefined || isPublish === undefined) {
            return sendErrorResponse("Missing required fields: id or isPublish", 200);
        }

        // Find and update product
        const updatedItem = await ItemModel.findOneAndUpdate(
            { id },
            {
                isPublished: isPublish,
                updatedDate: new Date(),
            },
            { new: true }
        );

        if (!updatedItem) {
            return sendErrorResponse("Item not found", 200);
        }

        return sendSuccessResponse(`Item records configuration updated successfully.`, updatedItem);

    } catch (error) {
        console.error("Error updating publish status:", error);
        return sendErrorResponse("Internal server error", 200);
    }
}
