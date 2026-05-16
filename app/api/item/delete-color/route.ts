import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import { ImageKitService } from "@/services/imagekit.services";
import ItemModel from "@/models/item.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const formData = await req.formData();

        // 1. Identify Target Item
        const itemIdStr = formData.get("itemId");
        if (!itemIdStr) {
            return sendErrorResponse("Item ID is required.", 200);
        }
        const itemId = Number(itemIdStr);

        // 2. Identify Target Color Variant
        const colorIdStr = formData.get("colorId");
        if (!colorIdStr) {
            return sendErrorResponse("Color ID to delete is required.", 200);
        }
        const colorId = Number(colorIdStr);

        // 3. Find Item and Locate the Target Color Variant
        const targetItem = await ItemModel.findOne({ id: itemId });
        if (!targetItem) {
            return sendErrorResponse("Target item does not exist.", 200);
        }

        const colorToDelete = targetItem.colors?.find((col: any) => col.id === colorId);
        if (!colorToDelete) {
            return sendErrorResponse("Color variant does not exist on this item.", 200);
        }

        // 4. Remove the Color Variant Asset from ImageKit
        if (colorToDelete.imageId) {
            try {
                await ImageKitService.deleteImage(colorToDelete.imageId);
            } catch (imageKitError) {
                console.error(`Failed to delete asset ${colorToDelete.imageId} from ImageKit:`, imageKitError);
                // We log the error but still proceed to clean up the database so the user profile isn't stuck with a broken entry.
            }
        }

        // 5. Atomic Pull directly from the Document Sub-array
        const updatedItem = await ItemModel.findOneAndUpdate(
            { id: itemId },
            {
                $pull: { colors: { id: colorId } }
            },
            { new: true, runValidators: true }
        );

        return sendSuccessResponse("Item color variant and asset deleted successfully.", updatedItem);

    } catch (error: any) {
        console.error("Colors Deletion Pipeline Error Exception Route:", error);
        return sendErrorResponse("Internal Server Error processing color adjustments removal.", 200);
    }
}