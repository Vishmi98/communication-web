import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import { ImageKitService } from "@/services/imagekit.services";
import ItemModel from "@/models/item.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        // 1. Identify Target Resource
        const itemIdStr = formData.get("itemId") || formData.get("id");
        if (!itemIdStr) {
            return sendErrorResponse("Valid item Identification (itemId/id) is required.", 200);
        }
        const itemId = Number(itemIdStr);

        const targetItem = await ItemModel.findOne({ id: itemId });
        if (!targetItem) {
            return sendErrorResponse("The matching inventory structural record target item does not exist.", 200);
        }

        // 2. Prepare Structured Object Payload Definitions
        const updatePayload: Record<string, any> = {};

        // Helper mapper to reduce dry code checking
        const assignTextIfPresent = (formKey: string, dbKey: string = formKey) => {
            const val = formData.get(formKey);
            if (val !== null) updatePayload[dbKey] = String(val).trim();
        };

        const assignNumberIfPresent = (formKey: string, dbKey: string = formKey) => {
            const val = formData.get(formKey);
            if (val !== null && val !== "") updatePayload[dbKey] = Number(val);
        };

        // Map base field records safely
        assignTextIfPresent("name");
        assignTextIfPresent("description");
        assignTextIfPresent("brand");
        assignTextIfPresent("model");

        assignNumberIfPresent("price");
        assignNumberIfPresent("newPrice");
        assignNumberIfPresent("category");
        assignNumberIfPresent("mainCategory");
        assignNumberIfPresent("subCategory");
        assignNumberIfPresent("rating");
        assignNumberIfPresent("reviews");

        // Handle published boolean state flag validation structures explicitly
        const isPublishedRaw = formData.get("isPublished");
        if (isPublishedRaw !== null) {
            updatePayload.isPublished = isPublishedRaw === "true" || isPublishedRaw === "1";
        }

        // Validate basic parameters constraints if text fields are being modified
        if (updatePayload.name !== undefined && !updatePayload.name) {
            return sendErrorResponse("Product entity naming structure property cannot be updated to an empty value.", 200);
        }
        if (updatePayload.description !== undefined && !updatePayload.description) {
            return sendErrorResponse("Product descriptive documentation property blocks cannot be empty strings.", 200);
        }

        // 3. Handle Conditional Modification substitution for Main Cover Core Assets
        const incomingNewMainImage = formData.get("image") as File | null;
        let originalMainImageIdToDelete: string | null = null;

        if (incomingNewMainImage && incomingNewMainImage instanceof File && incomingNewMainImage.size > 0) {
            try {
                const buffer = Buffer.from(await incomingNewMainImage.arrayBuffer());
                const filename = `${Date.now()}-updated-main-${incomingNewMainImage.name.replace(/\s+/g, "_")}`;

                const uploadedAsset = await ImageKitService.uploadImage(
                    buffer,
                    filename,
                    "communication/items/main"
                );

                // Note reference of target asset ID requiring replacement drop execution following DB transaction success
                if (targetItem.mainImageId) {
                    originalMainImageIdToDelete = targetItem.mainImageId;
                }

                updatePayload.mainImagePath = uploadedAsset.url;
                updatePayload.mainImageId = uploadedAsset.fileId;
            } catch (uploadError) {
                console.error("Replacement engine processing failed running ImageKit updates:", uploadError);
                return sendErrorResponse("Cloud execution network error handling updated main asset upload processing.", 200);
            }
        }

        // 4. Commit Structured Data Update atomically straight to MongoDB Document
        const updatedItem = await ItemModel.findOneAndUpdate(
            { id: itemId },
            { $set: updatePayload },
            { new: true, runValidators: true }
        );

        // 5. Clean up stale asset copies out of storage bucket following successful persistence commits
        if (originalMainImageIdToDelete) {
            try {
                await ImageKitService.deleteImage(originalMainImageIdToDelete);
            } catch (cleanupError) {
                console.error(`Post-Update Cleanup warning: Stale main target cloud image asset identifier reference (${originalMainImageIdToDelete}) could not be dropped:`, cleanupError);
            }
        }

        return sendSuccessResponse("Item records configuration updated successfully.", updatedItem);

    } catch (error: any) {
        console.error("Primary item mutation controller routing engine failure:", error);
        return sendErrorResponse("Internal Server Error executing primary item structural updating operations logic processing.", 200);
    }
}