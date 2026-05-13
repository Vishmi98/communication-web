import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

import { connectDB } from "@/lib/mongodb";
import { EmailService } from "@/services/email.services";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import UserModel from "@/models/user.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const { email, firstName } = body;

        if (!email || !firstName) {
            return sendErrorResponse("Email and firstName are required", 200);
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await UserModel.findOne({ email: normalizedEmail });

        if (!existingUser) {
            return sendErrorResponse("User not found", 200);
        }

        // 🔎 Find user by email
        const user = await UserModel.findOne({ email, firstName });
        if (!user) {
            return sendErrorResponse("User not found", 200);
        }

        // 🔑 Generate a new password
        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 💾 Update DB
        await UserModel.updateOne({ _id: user._id }, { password: hashedPassword });

        // 📧 Send reset password email
        await EmailService.sendPasswordResetEmail(email, newPassword);

        return sendSuccessResponse("Password has been reset. Check your email for the new password.", 200);
    } catch (error) {
        console.log("Error:", error);
        return sendErrorResponse("Server error", 200);
    }
}
