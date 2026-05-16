import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import UserModel from "@/models/user.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { firstName, lastName, password, email, phone, type } = body;

        // Validate required fields
        if (!firstName || !lastName || !password || !email || !phone || !type) {
            return sendErrorResponse("All fields are required", 200);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return sendErrorResponse("An account with this email already exists", 200);
        }

        const lastUser = await UserModel.findOne().sort({ id: -1 });
        const newId = lastUser ? lastUser.id + 1 : 1;

        const user = new UserModel({
            id: newId,
            firstName,
            lastName,
            password: hashedPassword,
            email: email.toLowerCase().trim(),
            phone,
            type
        });

        await user.save();

        return sendSuccessResponse("User Created Successfully", { user });

    } catch (error: any) {
        console.error("Error creating user:", error);
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}
