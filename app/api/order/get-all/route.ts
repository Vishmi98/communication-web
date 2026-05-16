import { NextRequest } from "next/server";

import "@/models/user.model";
import "@/models/item.model";
import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order.model";
import { sendSuccessResponse, sendErrorResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));
        const { page, limit } = body;

        const totalOrders = await OrderModel.countDocuments();

        // FIXED: Kept createdAt in .select() so your table can display timestamps
        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalOrders / limit);

            const orders = await OrderModel.find()
                .populate("customerInfo", "-_id")
                .populate("itemsInfo", "-_id")
                .select("-_id -__v -updatedAt")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean({ virtuals: true }); // Crucial for virtuals to run alongside .lean()

            return sendSuccessResponse(
                "Orders fetched successfully",
                {
                    page: Number(page),
                    limit: Number(limit),
                    totalPages,
                    totalOrders,
                    orders,
                }
            );
        }

        const orders = await OrderModel.find()
            .populate("customerInfo", "-_id")
            .populate("itemsInfo", "-_id")
            .select("-_id -__v -updatedAt")
            .sort({ createdAt: -1 })
            .lean({ virtuals: true });

        return sendSuccessResponse("Orders fetched", { orders });

    } catch (error) {
        console.error("API Error:", error);
        // FIXED: Send 500 status on server crash instead of 200
        return sendErrorResponse("Server Error", 500);
    }
}