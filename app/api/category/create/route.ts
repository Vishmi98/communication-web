import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import CategoryModel from "@/models/category.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { name } = body;

        if (!name) {
            return sendErrorResponse("Name is required", 200);
        }

        // Check duplicate name
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return sendErrorResponse("Category already exists", 200);
        }

        // Auto-increment ID
        let id = 1;
        const lastData = await CategoryModel
            .findOne({}, { id: 1 })
            .sort({ id: -1 })
            .limit(1);

        if (lastData) {
            id = lastData.id + 1;
        }

        const category = await CategoryModel.create({
            id,
            name,
            createdDate: new Date(),
            updatedDate: new Date(),
        });

        return sendSuccessResponse("Category created successfully", {
            category,
        });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
