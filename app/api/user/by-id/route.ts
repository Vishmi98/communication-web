import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import UserModel from "@/models/user.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const { id } = body;

        const user = await UserModel.findOne({ id })
            .select("-_id -__v -facebookId -facebookId -googleId -password -authProvider -updateFirstName -updateLastName")
            .exec();

        return sendSuccessResponse("User retrieved successfully", { user });
    } catch (error) {
        console.log("Error retrieving the user:", error);
        return sendErrorResponse("Server error", 200);
    }
}
