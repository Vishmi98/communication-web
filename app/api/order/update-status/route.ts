import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return sendErrorResponse("Order id and status required", 200);
        }

        const allowedStatus = [
            "Pending",
            "Accepted",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ];

        if (!allowedStatus.includes(status)) {
            return sendErrorResponse("Invalid status", 200);
        }

        // get current order first
        const existingOrder = await OrderModel.findOne({ id });

        if (!existingOrder) {
            return sendErrorResponse("Order not found", 200);
        }

        // prepare update object
        const updateData: any = {
            status
        };

        // ✅ AUTO HANDLE PAYMENT WHEN DELIVERED
        if (status === "Delivered") {
            updateData.isPaid = true;
        }

        const order = await OrderModel.findOneAndUpdate(
            { id },
            updateData,
            { new: true }
        );

        return sendSuccessResponse("Status updated", order);

    } catch (error) {
        console.error(error);
        return sendErrorResponse("Server Error", 200);
    }
}