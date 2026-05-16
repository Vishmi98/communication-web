import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, status, isPaid } = body;

        if (!id) {
            return sendErrorResponse("Order id is required", 400);
        }

        const existingOrder = await OrderModel.findOne({ id });
        if (!existingOrder) {
            return sendErrorResponse("Order not found", 404);
        }

        const updateData: any = {};

        // 1. Handle Status Update Validation if provided
        if (status) {
            const allowedStatus = ["Pending", "Accepted", "Out for Delivery", "Delivered", "Cancelled"];
            if (!allowedStatus.includes(status)) {
                return sendErrorResponse("Invalid status value", 400);
            }

            // Order progression rule index array
            const statusPriority = ["Pending", "Accepted", "Out for Delivery", "Delivered"];
            const currentIdx = statusPriority.indexOf(existingOrder.status);
            const nextIdx = statusPriority.indexOf(status);

            // Lock modifications if already terminal state
            if (existingOrder.status === "Delivered" || existingOrder.status === "Cancelled") {
                return sendErrorResponse("Completed or cancelled orders cannot be modified", 400);
            }

            // Prevent downward updates unless setting to Cancelled
            if (status !== "Cancelled" && nextIdx < currentIdx) {
                return sendErrorResponse("Cannot revert order status to a previous stage", 400);
            }

            updateData.status = status;

            // Auto-pay rule when delivered
            if (status === "Delivered") {
                updateData.isPaid = true;
            }
        }

        // 2. Handle Independent Payment State Updates if provided
        if (typeof isPaid === "boolean") {
            updateData.isPaid = isPaid;
        }

        // Drop out early if no operations match
        if (Object.keys(updateData).length === 0) {
            return sendErrorResponse("No valid update parameters provided", 400);
        }

        const order = await OrderModel.findOneAndUpdate({ id }, updateData, { new: true });
        return sendSuccessResponse("Order successfully updated", order);

    } catch (error) {
        console.error(error);
        return sendErrorResponse("Internal Server Error", 500);
    }
}