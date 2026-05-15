import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import { ImageKitService } from "@/services/imagekit.services";
import ItemModel from "@/models/item.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        // 1. Validate Item Identification
        const itemIdStr = formData.get("itemId");
        if (!itemIdStr) {
            return sendErrorResponse("Item ID is required.", 200);
        }
        const itemId = Number(itemIdStr);

        // Find the target document
        const targetItem = await ItemModel.findOne({ id: itemId });
        if (!targetItem) {
            return sendErrorResponse("Target item does not exist.", 200);
        }

        // 2. Extract and Filter Inbound Images
        // Enforces pulling files regardless of whether frontend appended via repeated standard keys or individual keys
        const incomingFiles = formData.getAll("images") as File[];
        const validFiles = incomingFiles.filter(
            (file) => file instanceof File && file.size > 0
        );

        if (validFiles.length === 0) {
            return sendErrorResponse("Please select at least one image to upload.", 200);
        }

        // 3. Enforce Strict Maximum Cap Rule (Max 3 Total)
        const existingCount = targetItem.imagePaths?.length || 0;
        const potentialTotalCount = existingCount + validFiles.length;

        if (potentialTotalCount > 3) {
            return sendErrorResponse(
                `Upload rejected. An item can have a maximum of 3 gallery images. This item already has ${existingCount} image(s), meaning you can only add ${3 - existingCount} more.`,
                200
            );
        }

        const uploadedPaths: string[] = [];
        const uploadedIds: string[] = [];

        // 4. Sequence Process Uploads to ImageKit Buffer Stream
        for (const file of validFiles) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

                const uploadedAsset = await ImageKitService.uploadImage(
                    buffer,
                    filename,
                    "communication/items/gallery"
                );

                uploadedPaths.push(uploadedAsset.url);
                uploadedIds.push(uploadedAsset.fileId);
            } catch (uploadError) {
                console.error(`Failed to push asset file ${file.name} to ImageKit:`, uploadError);

                // Rollback strategy: Clean up already uploaded assets during this partial failure block
                if (uploadedIds.length > 0) {
                    for (const id of uploadedIds) {
                        try {
                            await ImageKitService.deleteImage(id); // Assumes delete method exists in your service
                        } catch (delErr) {
                            console.error(`Rollback failed to delete asset ID: ${id}`, delErr);
                        }
                    }
                }
                return sendErrorResponse(`Image upload pipeline failed during processing of: ${file.name}`, 200);
            }
        }

        // 5. Atomic Safe Push Array Values straight into MongoDB Document
        const updatedItem = await ItemModel.findOneAndUpdate(
            { id: itemId },
            {
                $push: {
                    imagePaths: { $each: uploadedPaths },
                    imageIds: { $each: uploadedIds }
                }
            },
            { new: true, runValidators: true }
        );

        return sendSuccessResponse("Gallery images added successfully.", updatedItem);

    } catch (error: any) {
        console.error("Gallery Upload Route Error:", error);
        return sendErrorResponse("Internal Server Error processing gallery upload.", 200);
    }
}