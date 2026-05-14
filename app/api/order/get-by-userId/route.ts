import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order.model";
import { sendSuccessResponse, sendErrorResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { customerId } = body;

        if (!customerId) {
            return sendErrorResponse("Customer ID is required", 200);
        }

        // Use dot notation to query nested fields in Mongoose
        // .sort({ createdAt: -1 }) ensures latest orders appear first
        const orders = await OrderModel.find({ "customer.id": customerId })
            .sort({ createdAt: -1 })

        if (!orders || orders.length === 0) {
            return sendSuccessResponse("No orders found for this customer", []);
        }

        return sendSuccessResponse("Orders fetched successfully", orders);

    } catch (error: any) {
        console.error("Fetch Orders Error:", error);
        return sendErrorResponse(error.message || "Server Error", 200);
    }
}