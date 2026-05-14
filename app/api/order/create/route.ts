import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order.model";
import ItemModel from "@/models/item.model";

import {
    sendSuccessResponse,
    sendErrorResponse
} from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const {
            customer,
            items,
            paymentMethod,
            note,
            totalAmount,
            deliveryFee,
        } = body;

        // Validate required fields
        if (
            !customer ||
            !items ||
            !Array.isArray(items) ||
            items.length === 0 ||
            !paymentMethod
        ) {
            return sendErrorResponse("Missing required fields", 400);
        }

        let subtotal = 0;

        const orderItems = [];

        // Build order items
        for (const item of items) {

            // Find item from database
            const foundItem = await ItemModel.findOne({
                id: item.id
            });

            if (!foundItem) {
                return sendErrorResponse(
                    `Item not found: ${item.item}`,
                    404
                );
            }

            const quantity = Number(item.quantity) || 1;

            const itemPrice =
                foundItem.newPrice || foundItem.price;

            subtotal += itemPrice * quantity;

            orderItems.push({
                id: foundItem.id,
                name: foundItem.name,
                quantity,
                price: itemPrice,
                color: item.color || "",
                mainImagePath: foundItem.mainImagePath
            });
        }

        // Generate next order ID
        const lastOrder = await OrderModel
            .findOne()
            .sort({ id: -1 });

        const nextId = lastOrder
            ? lastOrder.id + 1
            : 1;

        // Create order
        const order = await OrderModel.create({
            id: nextId,
            customer,
            items: orderItems,
            totalAmount,
            deliveryFee,
            paymentMethod,
            note,
            estimatedDeliveryTime: new Date(
                Date.now() + 45 * 60 * 1000
            )
        });

        return sendSuccessResponse(
            "Order placed successfully",
            order
        );

    } catch (error) {
        console.error("ORDER_CREATE_ERROR:", error);

        return sendErrorResponse(
            "Internal Server Error",
            200
        );
    }
}