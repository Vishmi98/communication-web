import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import { ImageKitService } from "@/services/imagekit.services";
import ItemModel from "@/models/item.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        // Extract Text Fields
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price");
        const newPrice = formData.get("newPrice");
        const category = formData.get("category");
        const mainCategory = formData.get("mainCategory");
        const subCategory = formData.get("subCategory");
        const brand = formData.get("brand") as string;
        const model = formData.get("model") as string;
        const rating = formData.get("rating");
        const reviews = formData.get("reviews");

        // Extract Image
        const mainImage = formData.get("image") as File | null;
        const additionalImages = formData.getAll("images") as File[];

        const colorsRaw = formData.get("colors") as string;

        let colors: any[] = [];

        if (colorsRaw) {
            try {
                colors = JSON.parse(colorsRaw);
            } catch (error) {
                return sendErrorResponse("Invalid colors format.", 200);
            }
        }

        if (
            !name?.trim() ||
            !description?.trim() ||
            !price ||
            !category ||
            !mainImage
        ) {
            return sendErrorResponse(
                "Required fields are missing.",
                200
            );
        }

        //  MAIN IMAGE UPLOAD
        let mainImagePath = "";
        let mainImageId = "";

        try {
            const buffer = Buffer.from(await mainImage.arrayBuffer());

            const filename = `${Date.now()}-${mainImage.name}`;

            const uploaded = await ImageKitService.uploadImage(
                buffer,
                filename,
                "communication/items/main"
            );

            mainImagePath = uploaded.url;
            mainImageId = uploaded.fileId;

        } catch (uploadError) {
            console.error("Main image upload failed:", uploadError);

            return sendErrorResponse(
                "Failed to upload main image.",
                200
            );
        }

        const imagePaths: string[] = [];
        const imageIds: string[] = [];

        if (additionalImages?.length > 0) {
            for (const image of additionalImages) {
                try {
                    const buffer = Buffer.from(await image.arrayBuffer());

                    const filename = `${Date.now()}-${image.name}`;

                    const uploaded = await ImageKitService.uploadImage(
                        buffer,
                        filename,
                        "communication/items/gallery"
                    );

                    imagePaths.push(uploaded.url);
                    imageIds.push(uploaded.fileId);

                } catch (error) {
                    console.error("Gallery image upload failed:", error);
                }
            }
        }

        const updatedColors = [];

        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];

            let imagePath = "";
            let imageId = "";

            // Frontend should send:
            // colorImage_0
            // colorImage_1
            // etc.

            const colorImage = formData.get(
                `colorImage_${i}`
            ) as File | null;

            if (colorImage) {
                try {
                    const buffer = Buffer.from(
                        await colorImage.arrayBuffer()
                    );

                    const filename = `${Date.now()}-${colorImage.name}`;

                    const uploaded = await ImageKitService.uploadImage(
                        buffer,
                        filename,
                        "communication/items/colors"
                    );

                    imagePath = uploaded.url;
                    imageId = uploaded.fileId;

                } catch (error) {
                    console.error("Color image upload failed:", error);
                }
            }

            updatedColors.push({
                id: i + 1,
                name: color.name,
                hexCode: color.hexCode,
                imagePath,
                imageId,
            });
        }

        const lastItem = await ItemModel.findOne().sort({ id: -1 });
        const nextId = lastItem ? lastItem.id + 1 : 1;

        // ✅ Save to Database
        const newItem = await ItemModel.create({
            id: nextId,
            name,
            description,
            price: Number(price),
            newPrice: newPrice ? Number(newPrice) : undefined,
            category: Number(category),
            mainCategory: mainCategory
                ? Number(mainCategory)
                : undefined,
            subCategory: subCategory
                ? Number(subCategory)
                : undefined,
            brand,
            model,
            rating: Number(rating),
            reviews: Number(reviews),
            mainImagePath,
            mainImageId,
            colors: updatedColors,
            imagePaths,
            imageIds,
        });

        return sendSuccessResponse("Item created successfully.", newItem);

    } catch (error: any) {
        return sendErrorResponse("Internal Server Error", 200);
    }
}