import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order.model";
import { sendSuccessResponse, sendErrorResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, trackingNumber } = body;

        // 1. Basic Payload Validation
        if (!id) {
            return sendErrorResponse("Order ID is required", 200);
        }

        if (trackingNumber === undefined || trackingNumber === null || trackingNumber.trim() === "") {
            return sendErrorResponse("A valid tracking number is required", 200);
        }

        // 2. Locate the existing order
        const existingOrder = await OrderModel.findOne({ id });

        if (!existingOrder) {
            return sendErrorResponse("Order not found", 200);
        }

        // 3. Business Rule Validation
        if (existingOrder.status === "Cancelled") {
            return sendErrorResponse("Cannot assign tracking numbers to a cancelled order", 200);
        }

        if (existingOrder.status === "Pending") {
            return sendErrorResponse("Accept the order first before assigning a tracking number", 200);
        }

        // 4. Update the Tracking Number info
        existingOrder.trackingNumber = trackingNumber.trim();

        // Optional: Auto-advance status to "Out for Delivery" if it was only "Accepted"
        if (existingOrder.status === "Accepted") {
            existingOrder.status = "Out for Delivery";
        }

        const updatedOrder = await existingOrder.save();

        return sendSuccessResponse("Tracking number updated successfully", updatedOrder);

    } catch (error) {
        console.error("Error updating tracking info:", error);
        return sendErrorResponse("Server Error processing tracking update", 200);
    }
}