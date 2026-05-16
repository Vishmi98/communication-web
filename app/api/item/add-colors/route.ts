import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import { ImageKitService } from "@/services/imagekit.services";
import ItemModel from "@/models/item.model";

export async function POST(req: NextRequest) {
    let uploadedImageId = "";

    try {
        await connectDB();
        const formData = await req.formData();

        // 1. Identify Target Item
        const itemIdStr = formData.get("itemId");
        if (!itemIdStr) {
            return sendErrorResponse("Item ID is required.", 200);
        }
        const itemId = Number(itemIdStr);

        const targetItem = await ItemModel.findOne({ id: itemId });
        if (!targetItem) {
            return sendErrorResponse("Target item does not exist.", 200);
        }

        // 2. Extract Single Color Text Fields
        const name = formData.get("name") as string;
        const hexCode = formData.get("hexCode") as string;

        if (!name?.trim() || !hexCode?.trim()) {
            return sendErrorResponse("Color name and hex code are required.", 200);
        }

        // 3. Process and Upload Binary Variant Image
        const colorImageFile = formData.get("colorImage") as File | null;
        let imagePath = "";
        let imageId = "";

        if (colorImageFile && colorImageFile instanceof File && colorImageFile.size > 0) {
            try {
                const arrayBuffer = await colorImageFile.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const filename = `${Date.now()}-color_${name.trim().replace(/\s+/g, "_")}-${colorImageFile.name}`;

                const uploadedAsset = await ImageKitService.uploadImage(
                    buffer,
                    filename,
                    "communication/items/colors"
                );

                imagePath = uploadedAsset.url;
                imageId = uploadedAsset.fileId;
                uploadedImageId = imageId; // Tracked for rollback if database save fails
            } catch (uploadError) {
                console.error("Asset upload failed:", uploadError);
                return sendErrorResponse(`Asset pipeline failed processing image upload for: ${name}`, 200);
            }
        } else {
            return sendErrorResponse("Variant reference image file is required.", 200);
        }

        // 4. Calculate Sequential Local Unique ID
        const currentColors = targetItem.colors || [];
        const highestId = currentColors.reduce((max: number, col: any) => (col.id > max ? col.id : max), 0);
        const newColorId = highestId + 1;

        const newColorObject = {
            id: newColorId,
            name: name.trim(),
            hexCode: hexCode.trim(),
            imagePath,
            imageId,
        };

        // 5. Atomic Push directly into Document Sub-array
        const updatedItem = await ItemModel.findOneAndUpdate(
            { id: itemId },
            {
                $push: { colors: newColorObject }
            },
            { new: true, runValidators: true }
        );

        return sendSuccessResponse("Item variant configuration updated successfully.", updatedItem);

    } catch (error: any) {
        console.error("Colors Mutator Pipeline Error Exception Route:", error);
        // Rollback image asset if uploaded but database execution crashed
        if (uploadedImageId) {
            try {
                await ImageKitService.deleteImage(uploadedImageId);
            } catch (delErr) {
                console.error(`Rollback failed for asset ${uploadedImageId}:`, delErr);
            }
        }
        return sendErrorResponse("Internal Server Error processing color adjustments.", 200);
    }
}