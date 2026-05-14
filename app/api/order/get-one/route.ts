import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order.model";
import { sendSuccessResponse, sendErrorResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id } = body;

        const order = await OrderModel.findOne({ id })

        if (!order) {
            return sendErrorResponse("Order not found", 200);
        }

        return sendSuccessResponse("Order fetched", order);

    } catch (error) {
        return sendErrorResponse("Server Error", 200);
    }
}