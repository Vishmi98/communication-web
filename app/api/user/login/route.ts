import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/user.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import { VerificationService } from "@/services/verification.services";
import { generateToken } from "@/utils/jwt";


export async function POST(req: NextRequest) {
    try {
        await connectDB(); // Ensure DB is connected
        const { email, password } = await req.json();

        if (!email || !password) {
            return sendErrorResponse("Email and password are required", 400);
        }

        const normalizedEmail = email.toLowerCase().trim();

        // 1. Single query to get the user
        const user = await UserModel.findOne({ email: normalizedEmail });

        // 2. Generic error for security
        if (!user) {
            return sendErrorResponse("Invalid email or password", 200);
        }

        // 3. Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return sendErrorResponse("Invalid email or password", 200);
        }

        // 4. Handle Verification
        if (!user.isVerify) {
            await VerificationService.handleEmailVerification(normalizedEmail);
            return sendSuccessResponse("Please verify your account", {
                isVerify: false,
                token: ""
            });
        }

        // 5. Generate Token
        const token = generateToken({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isVerify: user.isVerify,
            email: user.email,
            phone: user?.phone,
            type: user.type,
        });

        return sendSuccessResponse("Login successful", {
            token,
            isVerify: true,
        });

    } catch (err: any) {
        console.error("Login Error:", err);
        return sendErrorResponse("An unknown error occurred", 200);
    }
}