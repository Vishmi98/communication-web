import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import { ImageKitService } from "@/services/imagekit.services";
import ItemModel from "@/models/item.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        // 1. Validate Identification Inputs
        const itemIdStr = formData.get("itemId");
        const imagePath = formData.get("imagePath") as string;

        if (!itemIdStr || !imagePath) {
            return sendErrorResponse("Both Item ID and Image Path are required parameters.", 200);
        }

        const itemId = Number(itemIdStr);

        // 2. Locate the Target Item
        const targetItem = await ItemModel.findOne({ id: itemId });
        if (!targetItem) {
            return sendErrorResponse("Target item does not exist.", 200);
        }

        // 3. Match Array Index to extract the corresponding ImageKit File ID
        const imageIndex = targetItem.imagePaths?.indexOf(imagePath);

        if (imageIndex === undefined || imageIndex === -1) {
            return sendErrorResponse("The specified image path does not exist on this item.", 200);
        }

        // Fetch corresponding imageId if the array exists and matches indexes
        const imageKitFileId = targetItem.imageIds?.[imageIndex];

        // 4. Remote Cloud Housekeeping (ImageKit Asset Deletion)
        if (imageKitFileId) {
            try {
                await ImageKitService.deleteImage(imageKitFileId);
            } catch (imageKitError) {
                console.error(`Failed to wipe asset file ${imageKitFileId} from ImageKit:`, imageKitError);
                // Non-blocking fallback: Continue with database cleanup even if cloud file was missing or pre-deleted
            }
        }

        // 5. Atomic Update to pull elements from MongoDB arrays
        // Pulls the imagePath and the imageId out of their respective arrays by matching values
        const updatePayload: any = {
            $pull: { imagePaths: imagePath }
        };

        if (imageKitFileId) {
            updatePayload.$pull.imageIds = imageKitFileId;
        }

        const updatedItem = await ItemModel.findOneAndUpdate(
            { id: itemId },
            updatePayload,
            { new: true, runValidators: true }
        );

        return sendSuccessResponse("Gallery image removed successfully.", updatedItem);

    } catch (error: any) {
        console.error("Gallery Delete Route Error:", error);
        return sendErrorResponse("Internal Server Error processing gallery image removal.", 200);
    }
}