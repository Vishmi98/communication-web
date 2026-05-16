import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

import { connectDB } from "@/lib/mongodb";
import { generateAdminToken } from "@/utils/jwt";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import UserModel from "@/models/user.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        if (!email || !password) {
            return sendErrorResponse("Email and password are required", 200);
        }

        const user = await UserModel.findOne({
            email,
            type: "Admin"
        });

        if (!user) {
            return sendErrorResponse("Admin not found", 200);
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return sendErrorResponse("Invalid credentials", 200);
        }

        const token = generateAdminToken({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
            email: user.email,
        });

        return sendSuccessResponse("Admin login successful!", { token });

    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}