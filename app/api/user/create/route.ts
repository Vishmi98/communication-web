import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

import UserModel from "@/models/user.model";
import { VerificationService } from "@/services/verification.services";
import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


async function registerUser(
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phone: string
) {
    try {
        // Handle numeric ID safely
        const lastUser = await UserModel.findOne().sort({ id: -1 });
        const newId = lastUser ? lastUser.id + 1 : 1;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            id: newId,
            firstName,
            lastName,
            password: hashedPassword,
            email: email.toLowerCase().trim(),
            phone,
        });

        await user.save();

        // Optional: Trigger verification but don't let it crash the registration if it fails
        try {
            await VerificationService.handleEmailVerification(email);
        } catch (emailError) {
            console.error("Verification email failed to send:", emailError);
        }

        return {
            success: true,
            message: "User registered successfully",
            email,
        };
    } catch (error: any) {
        return { success: false, message: "Error registering user" };
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        const { firstName, lastName, password, email, phone } = body;

        // 1. Basic Validation
        if (!firstName || !lastName || !password || !email || !phone) {
            return sendErrorResponse("All fields are required", 200);
        }

        // 2. Normalize and check existence
        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await UserModel.findOne({ email: normalizedEmail });

        if (existingUser) {
            return sendErrorResponse("An account with this email already exists", 200);
        }

        const result = await registerUser(firstName, lastName, password, normalizedEmail, phone);

        return sendSuccessResponse(result.message, { email: result.email });
    } catch (error: any) {
        console.error("Error registering user:", error);
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}