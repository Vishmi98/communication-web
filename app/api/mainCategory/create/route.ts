import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import MainCategoryModel from "@/models/mainCategory.model";
import { ImageKitService } from "@/services/imagekit.services";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        // Extract Text Fields
        const name = formData.get("name") as string;
        const categoryId = formData.get("categoryId");
        const mainImage = formData.get("image") as File | null;

        if (!name || !categoryId || !mainImage) {
            return sendErrorResponse("Name, categoryId and image is required", 200);
        }

        // Check duplicate name
        const existingMainCategory = await MainCategoryModel.findOne({ name, categoryId });
        if (existingMainCategory) {
            return sendErrorResponse("Main category already exists", 200);
        }

        let imagePath = "";
        let imageId = "";

        try {
            const buffer = Buffer.from(await mainImage.arrayBuffer());

            const filename = `${Date.now()}-${mainImage.name}`;

            const uploaded = await ImageKitService.uploadImage(
                buffer,
                filename,
                "communication/mainCategory"
            );

            imagePath = uploaded.url;
            imageId = uploaded.fileId;

        } catch (uploadError) {
            console.error("Main image upload failed:", uploadError);

            return sendErrorResponse(
                "Failed to upload main image.",
                200
            );
        }

        const lastMainCategory = await MainCategoryModel.findOne().sort({ id: -1 });
        const nextId = lastMainCategory ? lastMainCategory.id + 1 : 1;

        const category = await MainCategoryModel.create({
            id: nextId,
            name,
            categoryId,
            imagePath,
            imageId,
        });

        return sendSuccessResponse("Main Category created successfully", { category });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
