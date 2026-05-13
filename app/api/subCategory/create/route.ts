import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import SubCategoryModel from "@/models/subCategory.model";
import { ImageKitService } from "@/services/imagekit.services";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        // Extract Text Fields
        const name = formData.get("name") as string;
        const categoryId = formData.get("categoryId");
        const mainCategoryId = formData.get("mainCategoryId");
        const mainImage = formData.get("image") as File | null;

        if (!name || !categoryId || !mainCategoryId || !mainImage) {
            return sendErrorResponse("Name, categoryId, mainCategoryId and image is required", 200);
        }

        // Check duplicate name
        const existingSubCategory = await SubCategoryModel.findOne({ name, categoryId, mainCategoryId });
        if (existingSubCategory) {
            return sendErrorResponse("Sub category already exists", 200);
        }

        let imagePath = "";
        let imageId = "";

        try {
            const buffer = Buffer.from(await mainImage.arrayBuffer());

            const filename = `${Date.now()}-${mainImage.name}`;

            const uploaded = await ImageKitService.uploadImage(
                buffer,
                filename,
                "communication/subCategory"
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

        const lastSubCategory = await SubCategoryModel.findOne().sort({ id: -1 });
        const nextId = lastSubCategory ? lastSubCategory.id + 1 : 1;

        const subCategory = await SubCategoryModel.create({
            id: nextId,
            name,
            categoryId,
            mainCategoryId,
            imagePath,
            imageId,
        });

        return sendSuccessResponse("Sub Category created successfully", { subCategory });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
